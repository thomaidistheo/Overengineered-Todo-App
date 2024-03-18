import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { Firestore, collection, query, onSnapshot, getFirestore, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../AuthContext'
import TaskList from '../../components/TaskList/TaskList'
import Task from '../../components/Task/Task'
import InputTask from '../../components/InputTask/InputTask'
import ListButtons from '../../components/ListButtons/ListButtons'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'
import Loader from '../../components/Loader/Loader'

import { addTask, deleteTask, toggleComplete, toggleFlag, changeUrgency } from '../../dbOperations'

import styles from './homepage.module.scss'

const db: Firestore = getFirestore()

interface Task {
    id: string
    description: string
    completed: boolean
    flag: boolean
    urgency: string
    timestamp: Timestamp
}

interface HomepageProps {
    handleThemeChange: (themeSelect: string) => void
}

const Homepage: React.FC<HomepageProps> = ({ handleThemeChange }) => {
    const { user } = useAuth()
    const [tasks, setTasks] = useState<Task[]>([])
    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
    const [modalTitle, setModalTitle] = useState<string>("")
    const [modalDescription, setModalDescription] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [activeList, setActiveList] = useState<'TODO' | 'DONE'>('TODO')

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "Users", user.uid, "Tasks"))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tasksArray: Task[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        description: data.description,
                        completed: data.completed,
                        flag: data.flag,
                        urgency: data.urgency,
                        timestamp: data.timestamp,
                        } as Task
                    })
                setTasks(tasksArray)
                setIsLoading(false)
            })

            return () => unsubscribe()
        }
    }, [user])

    const handleActiveListChange = (button: 'TODO' | 'DONE') => {
        setActiveList(button)
    }

    const handleAddTask = async () => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        }

        if (description.trim() === '') {
            setDescriptionError("Task can't be empty")
            return
        } else {
            setDescriptionError('')
        }

        try {
            const userDocRef = doc(db, "Users", user.uid)
            const docSnap = await getDoc(userDocRef)
            if (docSnap.exists()) {
                if (!docSnap.data().taskCount) {
                    await updateDoc(userDocRef, {
                        taskCount: 1
                    })
                    await addTask(db, user, description)
                } else if (docSnap.data().taskCount >= 256) {
                    console.log('maximum tasks reached')
                    setDescriptionError("Maximum number of tasks reached. Delete some to add new.")
                } else {
                    await updateDoc(userDocRef, {
                        taskCount: docSnap.data().taskCount + 1
                    })
                    await addTask(db, user, description)
                }
            }

            setDescription('')
        } catch (error) {
            console.log('Error adding new task: ', error)
        }
    }

    const handleDeleteTaskFunc = async (taskToDelete: string) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        }

        try {
            const userDocRef = doc(db, "Users", user.uid)
            const docSnap = await getDoc(userDocRef)
            if (docSnap.exists()) {
                await updateDoc(userDocRef, {
                    taskCount: docSnap.data().taskCount - 1
                })
                await deleteTask(db, user, taskToDelete)
            }
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const confirmDeleteTask = async () => {
        if (taskToDelete) {
            handleDeleteTaskFunc(taskToDelete)
        }
        setIsModalOpen(false);
    }

    const handleDeleteTask = (taskId: string) => {
        setTaskToDelete(taskId)
        setModalTitle('Delete')
        setModalDescription('Are you sure you want to delete this item?')
        setIsModalOpen(true)
    }
    
    const cancelDeleteTask = () => {
        setIsModalOpen(false)
    }

    const handleComplete = async (taskId: string, completed: boolean) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        } 
        
        try {
            await toggleComplete(db, user, taskId, completed)
        } catch (error) {
            console.error('Error modifying completion state of task:', error)
        }
    }

    const handleFlag = async (taskId: string, flag: boolean) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        }

        try { 
            await toggleFlag(db, user, taskId, flag)
        } catch (error) {
            console.log('Error modifying flag state of task: ', error)
        }
    }

    const handleChangeUrgency = async (taskId: string, newUrgency: string) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        }

        try { 
            await changeUrgency(db, user, taskId, newUrgency)
        } catch (error) {
            console.log('Error modifying flag state of task: ', error)
        }
    }

    // Sort tasks based on date added
    const compare = (a: Task, b: Task) => {
        if (a.timestamp.toDate().toLocaleString() < b.timestamp.toDate().toLocaleString()) {
            return 1
        }         
        if (a.timestamp.toDate().toLocaleString() > b.timestamp.toDate().toLocaleString()) {
            return -1
        }
        return 0
    }
    tasks.sort(compare)

    return (
        <>
        {isLoading 
        ? <Loader />
        : <div className={styles.homepage}>
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmDeleteTask}
                onCancel={cancelDeleteTask}
                modalTitle={modalTitle}
                modalDescription={modalDescription}
            />
            <ListButtons
                activeList={activeList}
                onActiveListChange={handleActiveListChange}
            />
            <TaskList
                tasks={tasks}
                onToggleComplete={handleComplete}
                onToggleFlag={handleFlag}
                onUrgencyChange={handleChangeUrgency}
                onDeleteTask={handleDeleteTask}
                activeList={activeList}
            />
            <InputTask 
                description={description}
                setDescription={setDescription}
                descriptionError={descriptionError}
                setDescriptionError={setDescriptionError}
                handleAddTask={handleAddTask}
                handleThemeChange={handleThemeChange}
            />
        </div>
            }
        </>
        
    )
}

export default Homepage

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { Firestore, collection, query, onSnapshot, getFirestore, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../AuthContext'
import SignOut from '../../components/SignoutBtn/SignoutBtn'
import TaskList from '../../components/TaskList/TaskList'
import Task from '../../components/Task/Task'
import InputTask from '../../components/InputTask/InputTask'

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

const Homepage = () => {
    const { user } = useAuth()
    const [tasks, setTasks] = useState<Task[]>([])
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState('')


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
            })

            return () => unsubscribe()
        }
    }, [user])

    const handleAddTask = async () => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        }

        if (description.trim() === '') {
            setDescriptionError('Description cannot be empty')
            return
        } else {
            setDescriptionError('')
        }

        try {
            await addTask(db, user, description)
            setDescription('')
        } catch (error) {
            console.log('Error adding new task: ', error)
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        }

        try {
            await deleteTask(db, user, taskId)
        } catch (error) {
            console.error('Error deleting task:', error)
        }
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
        <div className={styles.homepage}>
            <SignOut />
            <TaskList
                tasks={tasks}
                onToggleComplete={handleComplete}
                onToggleFlag={handleFlag}
                onUrgencyChange={handleChangeUrgency}
                onDeleteTask={handleDeleteTask}
            />
            <InputTask 
                description={description}
                setDescription={setDescription}
                descriptionError={descriptionError}
                setDescriptionError={setDescriptionError}
                handleAddTask={handleAddTask}
            />
        </div>
    )
}

export default Homepage

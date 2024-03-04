import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { Firestore, collection, query, onSnapshot, getFirestore, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../AuthContext'
import SignOut from '../../components/SignoutBtn/SignoutBtn'
import TaskList from '../../components/TaskList/TaskList'
import Task from '../../components/Task/Task'

import { addTask, deleteTask, toggleComplete, toggleFlag, changeUrgency } from '../../dbOperations';

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
    const [urgency, setUrgency] = useState('Low')
    const [flag, setFlag] = useState(false)
    const [descriptionError, setDescriptionError] = useState('');

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
            return;
        } else {
            setDescriptionError('')
        }

        try {
            await addTask(db, user, description, flag, urgency)
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
            await deleteTask(db, user, taskId);
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
        <>
            <input
                type="text"
                value={description}
                onChange={(e) => {
                    (descriptionError) ? setDescriptionError('') : ''
                    setDescription(e.target.value)
                }}
                placeholder="Add a new task"
            />
            {(descriptionError && <span style={{ color: 'red' }}>{descriptionError}</span>)}
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <label>
                <input
                    type="checkbox"
                    checked={flag}
                    onChange={(e) => setFlag(e.target.checked)}
                /> Flag
            </label>
            <button onClick={handleAddTask}>Add Task</button>
            <TaskList
                tasks={tasks}
                onToggleComplete={handleComplete}
                onToggleFlag={handleFlag}
                onUrgencyChange={handleChangeUrgency}
                onDeleteTask={handleDeleteTask}
            />
            <SignOut />
        </>
    )
}

export default Homepage

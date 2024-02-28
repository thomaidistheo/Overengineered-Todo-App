import React, { useState, useEffect } from 'react'
import { db } from '../../firebase' // Ensure this points to your Firebase config file
import { collection, addDoc, query, onSnapshot, doc, updateDoc, getFirestore, deleteDoc } from 'firebase/firestore'
import { useAuth } from '../../AuthContext'
import SignOut from '../../components/SignoutBtn/SignoutBtn'

const Homepage = () => {
    const { user } = useAuth()
    const [tasks, setTasks] = useState<any[]>([])
    const [description, setDescription] = useState('')
    const [urgency, setUrgency] = useState('Low')
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "Users", user.uid, "Tasks"))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tasksArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setTasks(tasksArray)
            })

            return () => unsubscribe()
        }
    }, [user])

    const addTask = async () => {
        if (!description) return
        await addDoc(collection(db, "Users", user?.uid, "Tasks"), {
            description,
            completed: false,
            flag,
            timestamp: new Date(),
            urgency
        })
        setDescription('')
        setFlag(false)
        setUrgency('Low')
    }

    const deleteTask = async (taskId) => {
        const db = getFirestore()

        try {
            await deleteDoc(doc(db, "Users", user?.uid, "Tasks", taskId))
            console.log('task deleted')
        } catch (error) {
            console.log('Error deleting task: ', error)
        }
    }

    const toggleComplete = async (taskId: string, completed: boolean) => {
        const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
        await updateDoc(taskDocRef, {
            completed: !completed
        })
    }

    const toggleFlag = async (taskId: string, flag: boolean) => {
        const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
        await updateDoc(taskDocRef, {
            flag: !flag
        })
    }

    // Sort tasks based on date added
    let compare = (a, b) => {
        if (a.timestamp.toDate().toLocaleString() < b.timestamp.toDate().toLocaleString()) {
            return 1;
        }         
        if (a.timestamp.toDate().toLocaleString() > b.timestamp.toDate().toLocaleString()) {
            return -1;
        }
        return 0
    }
    tasks.sort(compare)

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a new task"
            />
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
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.description} - {task.urgency} - {task.completed ? 'Completed' : 'Pending'} - {task.flag ? 'Flagged' : 'Not Flagged'}
                        <button onClick={() => toggleComplete(task.id, task.completed)}>Toggle Complete</button>
                        <button onClick={() => toggleFlag(task.id, task.flag)}>Toggle Flag</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        {task.timestamp.toDate().toLocaleString()}
                    </li>
                ))}
            </ul>
            <SignOut />
        </div>
    )
}

export default Homepage

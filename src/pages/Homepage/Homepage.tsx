import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { Firestore, collection, addDoc, query, onSnapshot, doc, updateDoc, getFirestore, deleteDoc, Timestamp } from 'firebase/firestore'
import { useAuth } from '../../AuthContext'
import SignOut from '../../components/SignoutBtn/SignoutBtn'

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

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "Users", user.uid, "Tasks"))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tasksArray: Task[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    // Assume data has the structure you expect and cast types as necessary
                    return {
                        id: doc.id,
                        description: data.description,
                        completed: data.completed,
                        flag: data.flag,
                        urgency: data.urgency,
                        timestamp: data.timestamp,
                        } as Task;
                    });
                setTasks(tasksArray)
            })

            return () => unsubscribe()
        }
    }, [user])

    const addTask = async () => {

        if (!description) {
            console.log('Add a description')
            return
        }

        try {
            if (!user) {
                console.log('User is not authenticated')
                navigate('/login')
                return
            } 

            const taskCollectionRef = collection(db, "Users", user?.uid, "Tasks")
            await addDoc(taskCollectionRef, {
                description,
                completed: false,
                flag,
                timestamp: new Date(),
                urgency
            })

            setDescription('')
            setFlag(false)
            setUrgency('Low')
        } catch (error: unknown) {
            if (typeof error == "object" && error !== null && "message" in error) {
                const errorMessage = (error as { message: string }).message
                console.log(errorMessage)
            } else {
                console.log("An unexpected error occured - Google Signup - 001")
            }
        }
    }

    const deleteTask = async (taskId: string) => {

        try {
            if (!user) {
                console.log('User is not authenticated')
                navigate('/login')
                return
            }

            const taskDocRef =  doc(db, "Users", user?.uid, "Tasks", taskId)
            await deleteDoc(taskDocRef)
            console.log('task deleted')
        } catch (error) {
            console.log('Error deleting task: ', error)
        }
    }

    const toggleComplete = async (taskId: string, completed: boolean) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        } 
        const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
        await updateDoc(taskDocRef, {
            completed: !completed
        })
    }

    const toggleFlag = async (taskId: string, flag: boolean) => {
        if (!user) {
            console.log('User is not authenticated')
            navigate('/login')
            return
        } 
        const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
        await updateDoc(taskDocRef, {
            flag: !flag
        })
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

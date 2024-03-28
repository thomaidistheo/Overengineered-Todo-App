import { Firestore, collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

// -----------------------
// Change Theme Function
// -----------------------
export const changeTheme = async (db: Firestore, user: { uid: string }, themeSelect: string) => {
    const userDocRef = doc(db, "Users", user.uid)
    
    await updateDoc(userDocRef, {
        theme: themeSelect
    })
}

// -----------------------
// Add Task Function
// -----------------------
export const addTask = async (db: Firestore, user: { uid: string }, description: string) => {
    const taskCollectionRef = collection(db, "Users", user.uid, "Tasks")
    await addDoc(taskCollectionRef, {
        description,
        completed: false,
        flag: false,
        timestamp: new Date(),
        urgency: 'Low'
    })
}

// -----------------------
// Delete Task Function
// -----------------------
export const deleteTask = async(db: Firestore, user: { uid: string }, taskId: string) => {
    const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
    await deleteDoc(taskDocRef)
}

// -----------------------
// Toggle Completion State
// -----------------------
export const toggleComplete = async(db: Firestore, user: { uid: string }, taskId:string, completed: boolean ) => {
    const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
    await updateDoc(taskDocRef, {
        completed: !completed
    })
}

// -----------------------
// Toggle Flag State
// -----------------------
export const toggleFlag = async (db: Firestore, user: { uid: string }, taskId:string, flag: boolean ) => {
    const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
    await updateDoc(taskDocRef, {
        flag: !flag
    })
}

// -----------------------
// Toggle Flag State
// -----------------------
export const changeUrgency = async(db: Firestore, user: { uid: string }, taskId: string, newUrgency: string ) => {
    const taskDocRef = doc(db, "Users", user.uid, "Tasks", taskId)
    await updateDoc(taskDocRef, {
        urgency: newUrgency
    })
}

// -----------------------
// SubTasks
// -----------------------

// Add SubTask
export const addSubTask = async (db: Firestore, user: { uid: string }, taskId: string, description: string) => {
    console.log('addSubTask run: ', taskId, description)
    const subTaskCollectionRef = collection(db, "Users", user.uid, "Tasks", taskId, "Subtasks")
    await addDoc(subTaskCollectionRef, {
        description,
        completed: false,
        timestamp: new Date(),
    })
}

// Delete SubTask
export const deleteSubTask = async (db: Firestore, user: { uid: string }, taskId: string, subTaskId: string) => {
    const subTaskDocRef = doc(db, "Users", user.uid, "Tasks", taskId, "Subtasks", subTaskId)
    await deleteDoc(subTaskDocRef)
}

// Toggle SubTask Completion
export const toggleSubTaskComplete = async (db: Firestore, user: { uid: string }, taskId: string, subTaskId: string, completed: boolean) => {
    const subTaskDocRef = doc(db, "Users", user.uid, "Tasks", taskId, "Subtasks", subTaskId)
    await updateDoc(subTaskDocRef, {
        completed: !completed
    })
}
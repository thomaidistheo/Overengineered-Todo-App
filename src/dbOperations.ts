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
    console.log('lol')
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
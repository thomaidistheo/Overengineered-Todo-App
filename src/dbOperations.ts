import { Firestore, collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

// -----------------------
// Add Task Function
// -----------------------
export const addTask = async (db: Firestore, user: { uid: string }, description: string, flag: boolean, urgency: string) => {
    if (!description) {
        console.log('Add a description')
        return
    }

    const taskCollectionRef = collection(db, "Users", user.uid, "Tasks")
    await addDoc(taskCollectionRef, {
        description,
        completed: false,
        flag,
        timestamp: new Date(),
        urgency
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
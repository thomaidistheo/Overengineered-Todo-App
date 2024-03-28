import { Timestamp } from 'firebase/firestore';

export interface Task {
    id: string
    description: string
    completed: boolean
    flag: boolean
    urgency: string
    timestamp: Timestamp
}

export interface SubTask {
    id: string
    description: string 
    completed: boolean
    timestamp: Timestamp
}
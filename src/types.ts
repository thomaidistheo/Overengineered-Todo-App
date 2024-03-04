import { Timestamp } from 'firebase/firestore';

export interface Task {
    id: string;
    description: string;
    completed: boolean;
    flag: boolean;
    urgency: string;
    timestamp: Timestamp;
}
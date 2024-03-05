import { Task as TaskType } from '../../types'

import styles from './task.module.scss';

interface TaskProps {
    task: TaskType
    onToggleComplete: () => void
    onToggleFlag: () => void
    onUrgencyChange: (taskId: string, newUrgency: string) => void
    onDelete: () => void
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete, onToggleFlag, onUrgencyChange, onDelete }) => {
    const handleUrgencyOption = (option: string) => {
        if (option == 'Low') {
            option = 'Medium'
        } else if (option == 'Medium') {
            option = 'High'
        } else {
            option = 'Low'
        }
        handleUrgencyChange(option)
    }

    const handleUrgencyChange = (option: string) => {
        onUrgencyChange(task.id, option); 
    }

    return (
        <li className={styles.taskItem}>
            <div className={styles.taskTime}>{task.timestamp.toDate().toLocaleString()}</div>
            <div className={styles.task}>
                <div className={`${styles.completionState} ${task.completed ? styles.completed : ''}`} onClick={onToggleComplete}>
                    {task.completed 
                        ? <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M11.7763 0.501654C12.0515 0.746267 12.0762 1.16765 11.8316 1.44283L4.72054 9.44285C4.594 9.58519 4.41266 9.66659 4.22223 9.66659C4.03181 9.66659 3.85047 9.58519 3.72396 9.44285L0.168402 5.44285C-0.0762116 5.16765 -0.0514249 4.74625 0.223768 4.50165C0.498955 4.25705 0.920335 4.28185 1.16495 4.55699L4.22223 7.99645L10.8351 0.55702C11.0797 0.281827 11.5011 0.25704 11.7763 0.501654Z" 
                                fill="white" 
                                fillOpacity="0.3"
                            />
                        </svg>
                        : ''
                    }
                </div>
                <div className={`${styles.taskDescription} ${task.completed ? styles.completed : ''}`} lang='en'>{task.description}</div>
                <div className={styles.taskOptions}>
                    <span className={`${styles.flagIcon} ${task.flag ? styles.flagged : ''}`} onClick={onToggleFlag}>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" 
                                fillRule="evenodd" 
                                clipRule="evenodd" 
                                d="M5.00004 4.79723C6.51711 4.48549 7.67038 4.46656 8.62603 4.58602C9.74502 4.72589 10.6438 5.05939 11.6489 5.43632L11.6789 5.44757C12.6659 5.81773 13.7589 6.22763 15.126 6.39852C16.23 6.53651 17.4813 6.51633 19.0001 6.23986V15.2028C17.483 15.5145 16.3297 15.5334 15.3741 15.414C14.2551 15.2741 13.3563 14.9406 12.3512 14.5637L12.3212 14.5524C11.3342 14.1823 10.2412 13.7724 8.8741 13.6015C7.77014 13.4635 6.51884 13.4837 5.00006 13.7601L5.00004 4.79723ZM19.7575 4.02985C17.8574 4.50488 16.4828 4.55255 15.3741 4.41396C14.2551 4.27409 13.3563 3.94059 12.3512 3.56366L12.3212 3.55241C11.3342 3.18225 10.2412 2.77236 8.8741 2.60146C7.48735 2.42812 5.86811 2.50437 3.77823 3.02468C3.33267 3.12557 3 3.52394 3 4.00001V21C3 21.5523 3.44772 22 4 22C4.55228 22 5 21.5523 5 21V15.7972C6.5171 15.4855 7.67037 15.4666 8.62603 15.586C9.74502 15.7259 10.6438 16.0594 11.6489 16.4363L11.6789 16.4476C12.6659 16.8177 13.7589 17.2276 15.126 17.3985C16.5174 17.5724 18.1427 17.4951 20.2426 16.9701C20.6878 16.8588 21.0001 16.4589 21.0001 16V4.99999C21.0001 4.69206 20.8582 4.40129 20.6155 4.21179C20.3728 4.02228 20.0563 3.95516 19.7575 4.02985Z" 
                                fill="currentColor"
                            >
                            </path>
                        </svg>
                    </span>
                    <span className={`${styles.urgencyIcon} ${task.urgency == 'High' ? styles.highUrgency : task.urgency == 'Medium' ? styles.mediumUrgency : ''}`} onClick={() => handleUrgencyOption(task.urgency)}>
                        {task.urgency === 'Low' && '!'}
                        {task.urgency === 'Medium' && '!!'}
                        {task.urgency === 'High' && '!!!'}
                    </span>
                    <span className={styles.deleteIcon} onClick={onDelete}>
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M7 4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6H18.9897C18.9959 5.99994 19.0021 5.99994 19.0083 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H19.9311L19.0638 20.1425C18.989 21.1891 18.1182 22 17.0689 22H6.93112C5.88184 22 5.01096 21.1891 4.9362 20.1425L4.06888 8H3C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6H4.99174C4.99795 5.99994 5.00414 5.99994 5.01032 6H7V4ZM9 6H15V4H9V6ZM6.07398 8L6.93112 20H17.0689L17.926 8H6.07398Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </li>
    )
}

export default Task
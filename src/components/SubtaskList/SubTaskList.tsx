import { SubTask as SubTaskType } from '../../types'
import styles from './SubTaskList.module.scss'

interface SubTaskListProps {
    subTasks: SubTaskType[]
    onToggleSubTaskComplete: (subTaskId: string, completed: boolean) => void
    onDeleteSubTask: (subTaskId: string) => void
    showSubTaskInput: boolean
}

const SubTaskList: React.FC<SubTaskListProps> = ({ subTasks, onToggleSubTaskComplete, onDeleteSubTask, showSubTaskInput }) => {

    const sortedSubTasks = subTasks.slice().sort((a, b) => b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime());

    return (
        <ul className={styles.subTaskList}>
            {sortedSubTasks.map(subTask => (
                <li key={subTask.id}>
                    <div className={styles.info}>
                        <div className={`${styles.completionState} ${subTask.completed ? styles.completed : ''}`} onClick={() => onToggleSubTaskComplete(subTask.id, !subTask.completed)}>
                            {subTask.completed 
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
                        <div className={`${styles.taskDescription} ${subTask.completed ? styles.completed : ''}`} lang='en' >
                            {subTask.description}
                        </div>
                    </div>
                    {
                        showSubTaskInput
                            ? <span className={styles.deleteIcon} onClick={() => onDeleteSubTask(subTask.id)}>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path xmlns="http://www.w3.org/2000/svg" d="M7 4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6H18.9897C18.9959 5.99994 19.0021 5.99994 19.0083 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H19.9311L19.0638 20.1425C18.989 21.1891 18.1182 22 17.0689 22H6.93112C5.88184 22 5.01096 21.1891 4.9362 20.1425L4.06888 8H3C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6H4.99174C4.99795 5.99994 5.00414 5.99994 5.01032 6H7V4ZM9 6H15V4H9V6ZM6.07398 8L6.93112 20H17.0689L17.926 8H6.07398Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            : ''
                    }
                    
                </li>
            ))}
        </ul>
    )
}

export default SubTaskList
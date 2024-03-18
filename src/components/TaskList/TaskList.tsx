import Task from '../Task/Task'
import { Task as TaskType } from '../../types'
import styles from './taskList.module.scss'

interface TaskListProps {
    tasks: TaskType[]
    onToggleComplete: (taskId: string, completed: boolean) => void
    onToggleFlag: (taskId: string, flag: boolean) => void
    onUrgencyChange: (taskId: string, newUrgency: string) => void
    onDeleteTask: (taskId: string) => void
    activeList: 'TODO' | 'DONE'
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onToggleFlag, onUrgencyChange, onDeleteTask, activeList }) => {
    
    const incompleteTasks = tasks.filter(task => !task.completed )
    const completedTasks = tasks.filter(task => task.completed )

    return (
        <div className={styles.taskList}>
            <ul className={styles.tasks}>
                {
                    (activeList == 'TODO') 
                    ? incompleteTasks.map(task => (
                        <Task 
                            key={task.id}
                            task={task}
                            onToggleComplete={() => onToggleComplete(task.id, task.completed)}
                            onToggleFlag={() => onToggleFlag(task.id, task.flag)}
                            onUrgencyChange={(taskId, newUrgency)=> onUrgencyChange(taskId, newUrgency)}
                            onDelete={() => onDeleteTask(task.id)}
                        />
                    ))
                    : (activeList == 'DONE')
                    ? completedTasks.map(task => (
                        <Task 
                            key={task.id}
                            task={task}
                            onToggleComplete={() => onToggleComplete(task.id, task.completed)}
                            onToggleFlag={() => onToggleFlag(task.id, task.flag)}
                            onUrgencyChange={(taskId, newUrgency)=> onUrgencyChange(taskId, newUrgency)}
                            onDelete={() => onDeleteTask(task.id)}
                        />
                    ))
                    : ''
                        
                }
            </ul>
        </div>
    )
}

export default TaskList
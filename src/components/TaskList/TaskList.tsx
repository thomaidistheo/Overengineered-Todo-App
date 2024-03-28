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
    handleAddSubTask: (taskId: string) => void
    subTaskDescription: string
    setSubTaskDescription: (description: string) => void
    onToggleSubTaskComplete: (taskId: string, subTaskId: string, completed: boolean) => void
    onDeleteSubTask: (taskId: string, subTaskId: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ 
    tasks, 
    onToggleComplete, 
    onToggleFlag, 
    onUrgencyChange, 
    onDeleteTask, 
    activeList, 
    handleAddSubTask, 
    subTaskDescription, 
    setSubTaskDescription, 
    onToggleSubTaskComplete,
    onDeleteSubTask
}) => {
    
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
                            handleAddSubTask={() => handleAddSubTask(task.id)}
                            subTaskDescription={subTaskDescription}
                            setSubTaskDescription={setSubTaskDescription}
                            onToggleSubTaskComplete={(subTaskId, completed) => onToggleSubTaskComplete(task.id, subTaskId, completed)}
                            onDeleteSubTask={(subTaskId) => onDeleteSubTask(task.id, subTaskId)}
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
                            handleAddSubTask={() => handleAddSubTask(task.id)}
                            subTaskDescription={subTaskDescription}
                            setSubTaskDescription={setSubTaskDescription}
                            onToggleSubTaskComplete={(subTaskId, completed) => onToggleSubTaskComplete(task.id, subTaskId, completed)}
                            onDeleteSubTask={(subTaskId) => onDeleteSubTask(task.id, subTaskId)}
                        />
                    ))
                    : ''
                }
            </ul>
        </div>
    )
}

export default TaskList
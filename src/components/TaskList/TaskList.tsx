import Task from '../Task/Task'
import { Task as TaskType } from '../../types'

interface TaskListProps {
    tasks: TaskType[];
    onToggleComplete: (taskId: string, completed: boolean) => void;
    onToggleFlag: (taskId: string, flag: boolean) => void;
    onUrgencyChange: (taskId: string, newUrgency: string) => void;
    onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onToggleFlag, onUrgencyChange, onDeleteTask }) => {
    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <Task 
                        key={task.id}
                        task={task}
                        onToggleComplete={() => onToggleComplete(task.id, task.completed)}
                        onToggleFlag={() => onToggleFlag(task.id, task.flag)}
                        onUrgencyChange={(taskId, newUrgency)=> onUrgencyChange(taskId, newUrgency)}
                        onDelete={() => onDeleteTask(task.id)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TaskList
import { Task as TaskType } from '../../types'

interface TaskProps {
    task: TaskType
    onToggleComplete: () => void
    onToggleFlag: () => void
    onUrgencyChange: (taskId: string, newUrgency: string) => void
    onDelete: () => void
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete, onToggleFlag, onUrgencyChange, onDelete }) => {
    const handleUrgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUrgencyChange(task.id, e.target.value); 
    };

    return (
        <li>
            <div>{task.timestamp.toDate().toLocaleString()}</div>
            <div>
                <button onClick={onToggleComplete}>{task.completed ? 'Completed' : 'Pending'}</button>
                <div>{task.description}</div>
                <div>
                    <button onClick={onToggleFlag}>{task.flag ? 'Flagged' : 'Not Flagged'}</button>
                    <button onClick={onDelete}>Delete</button>
                    <select value={task.urgency} onChange={handleUrgencyChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>
        </li>
    )
}

export default Task
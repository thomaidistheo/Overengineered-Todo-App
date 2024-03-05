
interface InputTaskProps {
    description: string;
    setDescription: (description: string) => void;
    descriptionError: string;
    setDescriptionError: (error: string) => void;
    handleAddTask: () => void;
}

const InputTask: FC<InputTaskProps> = ({ description, setDescription, descriptionError, setDescriptionError, handleAddTask }) => {
    
    const handleChange = (e) => {
        if (descriptionError) {
            setDescriptionError('')
        }
        setDescription(e.target.value)
    }
    
    return (
        <div>
            {(descriptionError && <span>{descriptionError}</span>)}
            <input
                type="text"
                value={description}
                onChange={handleChange}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    )
}

export default InputTask
import styles from './InputTask.module.scss'
interface InputTaskProps {
    description: string;
    setDescription: (description: string) => void;
    descriptionError: string;
    setDescriptionError: (error: string) => void;
    handleAddTask: () => void;
}

const InputTask: React.FC<InputTaskProps> = ({ description, setDescription, descriptionError, setDescriptionError, handleAddTask }) => {
    
    const handleChange = (e:any) => {
        if (descriptionError) {
            setDescriptionError('')
        }
        setDescription(e.target.value)
    }
    
    return (
        <div className={styles.inputComponent}>
            {(descriptionError && <div className={styles.inputError}>{descriptionError}</div>)}
            <div className={styles.inputTaskCont}>
                <input
                    className={styles.inputTask}
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Add a new task"
                />
                <button className={styles.inputBtn} onClick={handleAddTask}></button>
            </div>
        </div>

    )
}

export default InputTask
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
                <button className={styles.inputBtn} onClick={handleAddTask}>
                    <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 14C3 13.4477 3.44772 13 4 13L16 13C17.6569 13 19 11.6569 19 10L19 6C19 5.44771 19.4477 5 20 5C20.5523 5 21 5.44771 21 6L21 10C21 12.7614 18.7614 15 16 15L4 15C3.44772 15 3 14.5523 3 14Z" fill="currentColor"></path>
                        <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3.29289 14.7071C2.90237 14.3166 2.90237 13.6834 3.29289 13.2929L7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289C9.09763 9.68342 9.09763 10.3166 8.70711 10.7071L5.41421 14L8.70711 17.2929C9.09763 17.6834 9.09763 18.3166 8.70711 18.7071C8.31658 19.0976 7.68342 19.0976 7.29289 18.7071L3.29289 14.7071Z" fill="currentColor"></path>
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default InputTask
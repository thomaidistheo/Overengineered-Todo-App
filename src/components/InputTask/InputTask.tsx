import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import styles from './InputTask.module.scss'
import { ThinBtn } from '../Buttons/Button';
import { IconArrowDown, IconArrowUp, IconReturnArrow } from '../Icons';
interface InputTaskProps {
    description: string;
    setDescription: (description: string) => void;
    descriptionError: string;
    setDescriptionError: (error: string) => void;
    handleAddTask: () => void;
}

const InputTask: React.FC<InputTaskProps> = ({ description, setDescription, descriptionError, setDescriptionError, handleAddTask }) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const handleLocationChange = () => {
        console.log('location change to be implemented')
    }

    const handleSignOut = async () => {
        const auth = getAuth()
        try {
            await signOut(auth)
            console.log('User signed out')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const handleDeleteAccount = () => {
        console.log('delete account to be implemented')
    }

    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        if (descriptionError) {
            setDescriptionError('')
        }
        setDescription(e.currentTarget.value)
    }
    
    return (
        <div className={`${styles.inputComponent} ${openMenu ? styles.openMenu : styles.closeMenu}`}>
            {(descriptionError && <div className={styles.inputError}>{descriptionError}</div>)}
            <div className={styles.inputTaskCont}>
                <button className={styles.inputBtn} onClick={() => setOpenMenu(!openMenu)}>
                    {openMenu 
                        ? <IconArrowDown 
                            height="24"
                            width="24"
                            color="#FFFFFF4D"
                        />
                        : <IconArrowUp 
                            height="24"
                            width="24"
                            color="#FFFFFF4D"
                        />
                    }
                </button>
                <input
                    className={styles.inputTask}
                    type="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Add a new task"
                />
                <button className={styles.inputBtn} onClick={handleAddTask}>
                    <IconReturnArrow
                        height="24"
                        width="24"
                        color="#FFFFFF4D"
                    />
                </button>
            </div>
            {<div className={`${styles.menuCont} ${openMenu ? styles.openMenu : styles.closeMenu}`}>
                <div className={styles.themeSelectCont}>
                    <div className={styles.title}>Theme</div>
                    <div className={styles.themeOptions}>
                        <div className={`${styles.themeOption} ${styles.darkMode}`}></div>
                        <div className={`${styles.themeOption} ${styles.lightMode}`}></div>
                    </div>
                </div>
                <div className={styles.accountSettingsCont}>
                    <div className={styles.title}>Account Settings</div>
                    <ThinBtn 
                        buttonType=''
                        buttonText='Change Location'
                        onClick={handleLocationChange}
                    />
                    <ThinBtn 
                        buttonType=''
                        buttonText='Sign Out'
                        onClick={handleSignOut}
                    />
                    <ThinBtn 
                        buttonType='delete'
                        buttonText='Delete Account'
                        onClick={handleDeleteAccount}
                    />
                </div>
            </div>}
        </div>
    )
}

export default InputTask
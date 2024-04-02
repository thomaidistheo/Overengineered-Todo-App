import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import styles from './InputTask.module.scss'
import { BaseBtn } from '../Buttons/Button'
import { IconArrowDown, IconArrowUp, IconReturnArrow } from '../Icons'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'

interface InputTaskProps {
    description: string
    setDescription: (description: string) => void
    descriptionError: string
    setDescriptionError: (error: string) => void
    handleAddTask: () => void
    handleThemeChange: (themeSelect: string) => void
}

const InputTask: React.FC<InputTaskProps> = ({ description, setDescription, descriptionError, setDescriptionError, handleAddTask, handleThemeChange }) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState<string>("")
    const [modalDescription, setModalDescription] = useState<string>("")

    const handleSignOut = () => {
        setIsModalOpen(true)
        setModalTitle('Sign Out')
        setModalDescription('Are you sure you want to sign out?')
    }

    const cancelSignout = () => {
        setIsModalOpen(false)
    }

    const handleSignOutFunc = async () => {
        const auth = getAuth()
        try {
            await signOut(auth)
            console.log('User signed out')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const handleInput = (e:React.FormEvent<HTMLInputElement>) => {
        if (descriptionError) {
            setDescriptionError('')
        }
        setDescription(e.currentTarget.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleAddTask()
    }

    
    return (
        <>
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleSignOutFunc}
                onCancel={cancelSignout}
                modalTitle={modalTitle}
                modalDescription={modalDescription}
            />
            <div className={`${styles.inputComponent} ${openMenu ? styles.openMenu : styles.closeMenu}`}>
                {(descriptionError && <div className={styles.inputError}>{descriptionError}</div>)}
                <form className={styles.inputTaskCont} onSubmit={handleSubmit}>
                    <button type="button" className={styles.inputBtn} onClick={() => setOpenMenu(!openMenu)}>
                        {openMenu 
                            ? <IconArrowDown 
                                height="24"
                                width="24"
                                // color="#000"
                            />
                            : <IconArrowUp 
                                height="24"
                                width="24"
                                // color="#000"
                            />
                        }
                    </button>
                    <input
                        className={styles.inputTask}
                        type="text"
                        value={description}
                        onChange={handleInput}
                        placeholder="Add a new task"
                    />
                    <button type="button" className={styles.inputBtn} onClick={handleAddTask}>
                        <IconReturnArrow
                            height="24"
                            width="24"
                            // color="#000"
                        />
                    </button>
                </form>
                {openMenu && <div className={`${styles.menuCont} ${openMenu ? styles.openMenu : styles.closeMenu}`}>
                    <div className={styles.themeSelectCont}>
                        <div className={styles.title}>Theme</div>
                        <div className={styles.themeOptions}>
                            <div className={`${styles.themeOption} ${styles.igMode}`} onClick={() => handleThemeChange('themeIG')}></div>
                            <div className={`${styles.themeOption} ${styles.darkMode}`} onClick={() => handleThemeChange('themeDark')}></div>
                            <div className={`${styles.themeOption} ${styles.lightMode}`} onClick={() => handleThemeChange('themeLight')}></div>
                            <div className={`${styles.themeOption} ${styles.pinkMode}`} onClick={() => handleThemeChange('themePink')}></div>
                            <div className={`${styles.themeOption} ${styles.clayMode}`} onClick={() => handleThemeChange('themeClay')}></div>
                            <div className={`${styles.themeOption} ${styles.sweetCreamMode}`} onClick={() => handleThemeChange('themeSweetCream')}></div>
                        </div>
                    </div>
                    <div className={styles.accountSettingsCont}>
                        <div className={styles.title}>Account Settings</div>
                        {/* <BaseBtn 
                            buttonType=''
                            buttonText='Change Location'
                            onClick={handleLocationChange}
                            disabled={true}
                        /> */}
                        <BaseBtn 
                            buttonType='delete'
                            buttonText='Sign Out'
                            onClick={handleSignOut}
                            disabled={false}
                        />
                        {/* <BaseBtn 
                            buttonType='delete'
                            buttonText='Delete Account'
                            onClick={handleDeleteAccount}
                            disabled={true}
                        /> */}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default InputTask
import styles from './BaseBtn.module.scss'

interface BaseBtnProps {
    buttonType: string
    buttonText: string
    onClick: () => void
}

const BaseBtn: React.FC<BaseBtnProps> = ({ buttonType, buttonText, onClick }) => {
    return (
        <button className={`${styles.baseBtn} ${buttonType == 'delete' ? styles.deleteBtn : ''}`} onClick={onClick}>
            {buttonText}
        </button>
    )
}

export default BaseBtn
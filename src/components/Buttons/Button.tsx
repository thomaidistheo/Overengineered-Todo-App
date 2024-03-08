import styles from './button.module.scss'

interface BtnProps {
    buttonType: string
    buttonText: string
    onClick: () => void
    disabled?: boolean
}

export const BaseBtn: React.FC<BtnProps> = ({ buttonType, buttonText, onClick, disabled }) => {
    return (
        <button className={`${styles.baseBtn} ${buttonType == 'delete' ? styles.deleteBtn : ''}`} onClick={onClick} disabled={disabled}>
            {buttonText}
        </button>
    )
}

export const ThinBtn: React.FC<BtnProps> = ({ buttonType, buttonText, onClick }) => {
    return (
        <button className={`${styles.thinBtn} ${buttonType == 'delete' ? styles.deleteBtn : ''}`} onClick={onClick}>
            {buttonText}
        </button>
    )
}

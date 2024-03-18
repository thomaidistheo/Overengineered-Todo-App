import styles from './listButtons.module.scss'

interface ListButtonsProps {
    activeList: 'TODO' | 'DONE'
    onActiveListChange: (button: 'TODO' | 'DONE') => void
}

const  ListButtons: React.FC<ListButtonsProps> = ({ activeList, onActiveListChange }) => {
    return (
        <div className={styles.listButtonsCont}>
            <button
                className={`${styles.listButton} ${activeList === 'TODO' ? styles.active : ''}`}
                onClick={() => onActiveListChange('TODO')}
            >
                TODO
            </button>
            <button
                className={`${styles.listButton} ${activeList === 'DONE' ? styles.active : ''}`}
                onClick={() => onActiveListChange('DONE')}
            >
                DONE
            </button>
        </div>
    )
}

export default ListButtons
import { BaseBtn } from '../Buttons/Button'
import styles from './confirmationModal.module.scss'

interface ConfirmationModalProps {
	isOpen: boolean
	onConfirm: () => void
	onCancel: () => void
	modalTitle: string
	modalDescription: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, modalTitle, modalDescription }) => {
	if (!isOpen) return null;
	
	return (
		<div className={styles.confirmationModalCont} onClick={onCancel}>
			<div className={styles.confirmationModal}>
				<div className={styles.modalText}>
					<div className={styles.modalTitle}>{modalTitle}</div>
					<div className={styles.modalDescription}>{modalDescription}</div>
				</div>
				<div className={styles.options}>
					<BaseBtn 
						buttonType='delete'
						buttonText='Confirm'
						onClick={onConfirm}
					/>
					<BaseBtn 
						buttonType=''
						buttonText='Cancel'
						onClick={onCancel}
					/>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationModal
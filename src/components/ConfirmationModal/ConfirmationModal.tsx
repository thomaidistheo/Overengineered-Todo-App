import BaseBtn from '../Buttons/BaseBtn'
import styles from './confirmationModal.module.scss'

interface ConfirmationModalProps {
	isOpen: boolean
	onConfirm: () => void
	onCancel: () => void
	modalTitle: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, modalTitle }) => {
	if (!isOpen) return null;

	return (
		<div className={styles.confirmationModalCont}>
			<div className={styles.confirmationModal}>
				<div className={styles.modalTitle}>{modalTitle}</div>
				<div className={styles.options}>
					<BaseBtn 
						buttonType='delete'
						buttonText='Yes, Delete'
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
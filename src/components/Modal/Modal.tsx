import { KeyboardEvent, ReactNode, useCallback, useEffect } from 'react';
import './Modal.css';

interface IModalProps {
	isOpen: boolean;
	children: ReactNode;
	onClose: (event: KeyboardEvent) => void;
	title?: string;
	footer?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModalProps): JSX.Element | null => {
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			onClose(e);
		},
		[onClose]
	);

	useEffect(() => {
		const handleOnKeyDown = (e: Event) => {
			handleKeyDown(e as unknown as KeyboardEvent);
		};

		window.addEventListener('keydown', handleOnKeyDown);
		return () => {
			window.removeEventListener('keydown', handleOnKeyDown);
		};
	}, [handleKeyDown]);

	return isOpen ? (
		<div id="modal" className="modal-overlay">
			<div id="modal-content" className="modal-content">
				<div className="modal-body">{children}</div>
			</div>
			<div className="modal-hint">
				Press <code>ESC</code> button to close modal
			</div>
		</div>
	) : null;
};

export default Modal;

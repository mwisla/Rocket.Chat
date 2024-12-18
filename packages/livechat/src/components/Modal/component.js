import { Component } from 'preact';
import { withTranslation } from 'react-i18next';

import { createClassName } from '../../helpers/createClassName';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import styles from './styles.scss';
import { createRef } from 'preact';
import { trapFocusRef } from '../../helpers/trapFocus';

export class Modal extends Component {
	static defaultProps = {
		dismissByOverlay: true,
	};

	modalref = createRef();

	handleKeyDown = (e) => {
		if (e.key === 'Escape') {
			this.triggerDismiss();
			return false;
		}		
		return trapFocusRef(e, this.modalref?.current, 0);
	};

	handleTouchStart = () => {
		const { dismissByOverlay } = this.props;
		dismissByOverlay && this.triggerDismiss();
	};

	handleMouseDown = () => {
		const { dismissByOverlay } = this.props;
		dismissByOverlay && this.triggerDismiss();
	};

	triggerDismiss = () => {
		const { onDismiss } = this.props;
		this.mounted && onDismiss && onDismiss();
	};

	componentDidMount() {
		this.mounted = true;
		window.addEventListener('keydown', this.handleKeyDown, false);
		const { timeout } = this.props;
		if (Number.isFinite(timeout) && timeout > 0) {
			setTimeout(() => this.triggerDismiss(), timeout);
		}
	}

	componentWillUnmount() {
		this.mounted = false;
		window.removeEventListener('keydown', this.handleKeyDown, false);
	}

	render = ({ children, animated, open, ...props }) =>
		open ? (
			<div
				ref={this.modalref}
				data-qa-type='modal-overlay'
				onTouchStart={this.handleTouchStart}
				onMouseDown={this.handleMouseDown}
				className={createClassName(styles, 'modal__overlay')}
			>
				<div role="dialog" aria-describedby="dialog-msg" aria-labelledby="dialog-title" className={createClassName(styles, 'modal', { animated })} {...props}>
					{children}
				</div>
			</div>
		) : null;
}

export const ModalMessage = ({ children }) => <div id="dialog-title" className={createClassName(styles, 'modal__message')}>{children}</div>;

export const ConfirmationModal = withTranslation()(({ text, confirmButtonText, cancelButtonText, onConfirm, onCancel, t, ...props }) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<div id="dialog-msg">
      		<div role="document">
				<ButtonGroup>
					<Button outline secondary onClick={onCancel}>
						{cancelButtonText || t('no')}
					</Button>
					<Button secondaryDanger onClick={onConfirm}>
						{confirmButtonText || t('yes')}
					</Button>
				</ButtonGroup>
			</div>
		</div>
	</Modal>
));

export const AlertModal = withTranslation()(({ text, buttonText, onConfirm, t, ...props }) => (
	<Modal open animated dismissByOverlay={false} {...props}>
		<Modal.Message>{text}</Modal.Message>
		<div id="dialog-msg">
      		<div role="document">
				<ButtonGroup>
					<Button secondary onClick={onConfirm}>
						{buttonText || t('ok')}
					</Button>
				</ButtonGroup>
			</div>
		</div>
	</Modal>
));

Modal.Message = ModalMessage;
Modal.Confirm = ConfirmationModal;
Modal.Alert = AlertModal;

export default Modal;

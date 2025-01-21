import { createRef, type ComponentChildren } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { useTranslation } from 'react-i18next';

import { createClassName } from '../../helpers/createClassName';
import CloseIcon from '../../icons/close.svg';
import styles from './styles.scss';
import Tooltip from '../Tooltip';

type AlertProps = {
	id?: string;
	onDismiss?: (id?: string) => void;
	success?: boolean;
	warning?: boolean;
	error?: boolean;
	color?: string;
	hideCloseButton?: boolean;
	className?: string;
	style?: JSXInternal.CSSProperties;
	children?: ComponentChildren;
	timeout?: number;
	sessionExtension?: boolean;
	sendMessage?: (msg: string) => void;
};

const Alert = ({
	id,
	onDismiss,
	success,
	warning,
	error,
	color,
	hideCloseButton = false,
	className,
	style = {},
	children,
	timeout = 3000,
	sessionExtension,
	sendMessage
}: AlertProps) => {
	const { t } = useTranslation();
	const handleDismiss = useCallback(() => {
		onDismiss?.(id);
	}, [id, onDismiss]);

	const handleSendMessage = useCallback(() => {
		sendMessage?.(t('session_extend'));
	}, [sendMessage]);

	useEffect(() => {
		let dismissTimeout: ReturnType<typeof setTimeout> | undefined;
		if (Number.isFinite(timeout) && timeout > 0) {
			dismissTimeout = setTimeout(handleDismiss, timeout);
		}
		return () => clearTimeout(dismissTimeout);
	}, [handleDismiss, timeout]);

	const sessionExtensionRef = createRef();

	useEffect(() => {
		if (sessionExtension === true && sessionExtensionRef != null) {
			sessionExtensionRef?.current?.focus();
		}
	}, [id, sessionExtension]);

	return (
		<div
			role='alert'
			className={createClassName(styles, 'alert', { success, warning, error }, [className])}
			style={{
				...style,
				...(color && { backgroundColor: color }),
			}}
		>
			<div className={createClassName(styles, 'alert__content')}>{children}</div>
			{!hideCloseButton && (
				<Tooltip.Container>
					<Tooltip.Trigger content={t('dismiss_this_alert')} placement='bottom-left' ariaHidden={true}>
						<button onClick={handleDismiss} className={createClassName(styles, 'alert__close')} aria-label={t('dismiss_this_alert')}>
							<CloseIcon width={20} height={20} />
						</button>
					</Tooltip.Trigger></Tooltip.Container>
			)}
			{sessionExtension && (<button ref={sessionExtensionRef} onClick={handleSendMessage} className={createClassName(styles, 'alert__close')}>
				{t('session_extend')}
			</button>)}
		</div>
	);
};

export default Alert;

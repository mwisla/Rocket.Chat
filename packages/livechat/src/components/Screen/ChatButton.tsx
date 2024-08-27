import ChatIcon from '../../icons/chat.svg';
import CloseIcon from '../../icons/close.svg';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

type ChatButtonProps = {
	text: string;
	minimized: boolean;
	badge: number;
	onClick: () => void;
	triggered?: boolean;
	className?: string;
	logoUrl?: string;
};

export const ChatButton = ({ text, minimized, badge, onClick, triggered = false, className, logoUrl }: ChatButtonProps) => {

	const { t } = useTranslation();

	const chatIcon = <>
		<ChatIcon  />
		<span className={createClassName(styles, 'screen__chat-button__message')}>{t("chat_live")}</span>
	</>;

	const openIcon = logoUrl ? <img src={logoUrl} width={30} height={30} alt='Livechat' /> : chatIcon;

	return (
		<Button
			icon={minimized || triggered ? openIcon : <CloseIcon />}
			badge={badge}
			onClick={onClick}
			className={`${(minimized || triggered ? createClassName(styles,'screen__chat-button__svg') : createClassName(styles,'screen__chat-close_button__svg'))} ${className}`}
			data-qa-id='chat-button'
			label={t("chat_live")}
		>
			{text}
		</Button>
	);
};

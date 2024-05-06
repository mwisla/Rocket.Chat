import { createClassName } from '../../../helpers/createClassName';
import styles from './styles.scss';
import { useTranslation } from 'react-i18next';

export const TypingDots = ({ text, className, style = {} }) => {
	
	const { t } = useTranslation();
		
	return (<div aria-live="polite" aria-label={text ?? t("agent_typing")} className={createClassName(styles, 'typing-dots', {}, [className])} style={style}>
		<span class={createClassName(styles, 'typing-dots__dot')} />
		<span class={createClassName(styles, 'typing-dots__dot')} />
		<span class={createClassName(styles, 'typing-dots__dot')} />
	</div>
)};

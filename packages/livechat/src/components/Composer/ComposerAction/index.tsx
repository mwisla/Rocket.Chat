import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';
import { memo } from 'preact/compat';

import { createClassName } from '../../../helpers/createClassName';
import styles from './styles.scss';
import Tooltip from '../../Tooltip';

type ComposerActionProps = {
	text: string;
	onClick: () => void;
	className?: string;
	style?: CSSProperties;
	children?: ComponentChildren;
	title?: string;
};

export const ComposerAction = memo(({ text, onClick, className, style = {}, children, title }: ComposerActionProps) => (

	<Tooltip.Trigger content={title}>
		<button
			type='button'
			aria-label={text}
			onClick={onClick}
			className={createClassName(styles, 'composer__action', {}, [className])}
			style={style}
			title={title}
		>
			{children}
		</button>
	</Tooltip.Trigger>
));

import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';
import type { JSXInternal } from 'preact/src/jsx';
import { useTranslation } from 'react-i18next';

import { createClassName } from '../../helpers/createClassName';
import styles from './styles.scss';
import Tooltip from '../Tooltip';

const handleMouseUp: JSXInternal.EventHandler<JSXInternal.TargetedMouseEvent<HTMLButtonElement>> = ({ target }) =>
	(target as HTMLButtonElement)?.blur();

type ButtonProps = {
	children?: ComponentChildren;
	submit?: boolean;
	form?: string;
	disabled?: boolean;
	outline?: boolean;
	nude?: boolean;
	danger?: boolean;
	secondary?: boolean;
	stack?: boolean;
	small?: boolean;
	loading?: boolean;
	badge?: number;
	icon?: ComponentChildren;
	className?: string;
	style?: CSSProperties;
	img?: string;
	onClick?: JSXInternal.MouseEventHandler<HTMLButtonElement>;
	onMouseUp?: JSXInternal.MouseEventHandler<HTMLButtonElement>;
	full?: boolean;
	label?: string;
};

export const Button = ({
	submit,
	form,
	disabled,
	outline,
	nude,
	danger,
	secondary,
	stack,
	small,
	loading,
	badge,
	icon,
	onClick,
	className,
	style = {},
	children,
	img,
	full,
	label,
	...props
}: ButtonProps) => {
	const { t } = useTranslation();
	return (
		<button
			type={submit ? 'submit' : 'button'}
			form={form}
			disabled={disabled}
			onClick={onClick}
			onMouseUp={handleMouseUp}
			aria-label={label || (icon && Array.isArray(children) ? children[0] : children)}
			className={createClassName(
				styles,
				'button',
				{
					disabled,
					outline,
					nude,
					danger,
					secondary,
					stack,
					small,
					loading,
					icon: !!icon,
					img,
					full,
				},
				[className],
			)}
			style={Object.assign(
				{},
				style,
				img && {
					backgroundImage: `url(${img})`,
				},
			)}
			{...props}
		>
			{badge ? (
				<Tooltip.Container>
					<Tooltip.Trigger content={t('messages_count' + (badge == 1 ? '_one' : '_other'), { count: badge })} placement='bottom-left'>
						<span role='status' aria-label={t('messages_count' + (badge == 1 ? '_one' : '_other'), { count: badge })} className={createClassName(styles, 'button__badge')}>
							{badge}
						</span>
					</Tooltip.Trigger>
				</Tooltip.Container>
			) : null}
			{!img && (icon || children)}
		</button>
	);
};

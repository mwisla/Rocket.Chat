import { Component } from 'preact';
import type { CSSProperties } from 'preact/compat';

import { createClassName } from '../../helpers/createClassName';
import styles from './styles.scss';
import { useTranslation } from 'react-i18next';

type AvatarProps = {
	small?: boolean;
	large?: boolean;
	src?: string;
	description?: string;
	status?: string;
	className?: string;
	style?: CSSProperties;
	t: any;
};

type AvatarState = {
	errored: boolean;
};

export class Avatar extends Component<AvatarProps, AvatarState> {
	static getDerivedStateFromProps(props: AvatarProps) {
		if (props.src) {
			return { errored: false };
		}

		return null;
	}

	state = {
		errored: false,
	};

	handleError = () => {
		this.setState({ errored: true });
	};

	render = ({ small, large, src, description, status, className, style, t }: AvatarProps, { errored }: AvatarState) => (
		<div
			aria-label={t('user_picture')}
			className={createClassName(styles, 'avatar', { small, large, nobg: src && !errored }, [className])}
			style={style}
		>
			{src && !errored && (
				<img src={src} alt={t('avatar_description', { name: description })} className={createClassName(styles, 'avatar__image')} onError={this.handleError} />
			)}

			{status && <span role="status" aria-label={status ? t('status_' + status) : null} aria-live="polite" className={createClassName(styles, 'avatar__status', { small, large, status })} >
				{status == 'away' && <svg width="8" height="8" fill="#A79600" viewBox="1 1 8 8" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M5.13337 9.93325C7.78434 9.93325 9.93338 7.78422 9.93338 5.13325C9.93338 2.48229 7.78434 0.333252 5.13337 0.333252C2.48241 0.333252 0.333374 2.48229 0.333374 5.13325C0.333374 7.78422 2.48241 9.93325 5.13337 9.93325ZM5.80004 2.33325C5.80004 1.96506 5.50156 1.66659 5.13337 1.66659C4.76518 1.66659 4.46671 1.96506 4.46671 2.33325V5.13325V5.45367L4.71691 5.65383L6.71691 7.25383C7.00442 7.48384 7.42395 7.43722 7.65395 7.14972C7.88396 6.86221 7.83735 6.44268 7.54984 6.21267L5.80004 4.81284V2.33325Z"></path>
				</svg>}
				{status == 'busy' && <svg width="8" height="8" fill="#c43749" viewBox="1 1 8 8" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M5.13337 9.93325C7.78434 9.93325 9.93338 7.78422 9.93338 5.13325C9.93338 2.48229 7.78434 0.333252 5.13337 0.333252C2.48241 0.333252 0.333374 2.48229 0.333374 5.13325C0.333374 7.78422 2.48241 9.93325 5.13337 9.93325ZM3.53338 4.46655C3.16519 4.46655 2.86671 4.76503 2.86671 5.13322C2.86671 5.50141 3.16519 5.79989 3.53338 5.79989H6.73338C7.10157 5.79989 7.40004 5.50141 7.40004 5.13322C7.40004 4.76503 7.10157 4.46655 6.73338 4.46655H3.53338Z"></path>
				</svg>}
				{status == 'online' && <svg width="8" height="8" fill="#fff" viewBox="-45 -55 200 200" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M4.67,67.27c-14.45-15.53,7.77-38.7,23.81-24C34.13,48.4,42.32,55.9,48,61L93.69,5.3c15.33-15.86,39.53,7.42,24.4,23.36L61.14,96.29a17,17,0,0,1-12.31,5.31h-.2a16.24,16.24,0,0,1-11-4.26c-9.49-8.8-23.09-21.71-32.91-30v0Z"></path>
				</svg>}
			</span>}
		</div>
	);
}

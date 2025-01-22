import { memo } from 'preact/compat';

import { createClassName } from '../../../helpers/createClassName';
import { Avatar } from '../../Avatar';
import styles from './styles.scss';
import { useTranslation } from 'react-i18next';

export const MessageAvatars = memo(({ avatarResolver = () => null, usernames = [], names = [], className, style = {} }) => {
	const avatars = usernames.filter(Boolean);

	const { t } = useTranslation();

	if (!avatars.length) {
		return null;
	}

	return (
		<div className={createClassName(styles, 'message-avatars', {}, [className])} style={style}>
			{avatars.map((username, i) => (
				<Avatar src={avatarResolver(username)} description={names[i] ?? username} className={createClassName(styles, 'message-avatars__avatar')} t={t} />
			))}
		</div>
	);
});

import { parse } from 'query-string';
import { useContext, useEffect } from 'preact/hooks';

import ConnectionStatusProvider from '../../providers/ConnectionStatusProvider';
import SDKProvider from '../../providers/SDKProvider';
import ServerProvider from '../../providers/ServerProvider';
import { Provider as StoreProvider, Consumer as StoreConsumer, StoreContext } from '../../store';
import App from './App';
import { trapFocus } from '../../helpers/trapFocus';
import { createRef } from 'preact';
import { parentCall } from '../../lib/parentCall';

export const host =
	window.SERVER_URL ?? parse(window.location.search).serverUrl ?? (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null);

export const useSsl = Boolean((Array.isArray(host) ? host[0] : host)?.match(/^https:/));

const AppConnector = () => {

	const {
		dispatch
	} = useContext(StoreContext);

	useEffect(() => {
		(appref.current as HTMLElement)?.addEventListener("keydown", initTrapFocus, false);

		// componentWillUnmount
		return () => {
			(appref.current as HTMLElement)?.removeEventListener("keydown", initTrapFocus, false);
		}
	}, []);

	const appref = createRef<HTMLDivElement>();

	const initTrapFocus = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			parentCall('minimizeWindow');
			dispatch({ minimized: true });
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		return trapFocus(e, appref.current as HTMLElement);
	};

	return (
		<div id='app' ref={appref}>
			<StoreProvider>
				<SDKProvider serverURL={host}>
					<ConnectionStatusProvider>
						<ServerProvider>
							<StoreConsumer>
								{({
									config,
									user,
									triggered,
									gdpr,
									sound,
									undocked,
									minimized = true,
									expanded = false,
									alerts,
									modal,
									dispatch,
									iframe,
								}) => (
									<App
										config={config}
										gdpr={gdpr}
										triggered={triggered}
										user={user}
										sound={sound}
										undocked={undocked}
										minimized={minimized}
										expanded={expanded}
										alerts={alerts}
										modal={modal}
										dispatch={dispatch}
										iframe={iframe}
									/>
								)}
							</StoreConsumer>
						</ServerProvider>
					</ConnectionStatusProvider>
				</SDKProvider>
			</StoreProvider>
		</div>
	);
};
export default AppConnector;

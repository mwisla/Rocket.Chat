import { parse } from 'query-string';
import { useEffect } from 'preact/hooks';

import ConnectionStatusProvider from '../../providers/ConnectionStatusProvider';
import SDKProvider from '../../providers/SDKProvider';
import ServerProvider from '../../providers/ServerProvider';
import { Provider as StoreProvider, Consumer as StoreConsumer } from '../../store';
import App from './App';
import { trapFocusRef } from '../../helpers/trapFocus';
import { createRef } from 'preact';

export const host =
	window.SERVER_URL ?? parse(window.location.search).serverUrl ?? (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null);

export const useSsl = Boolean((Array.isArray(host) ? host[0] : host)?.match(/^https:/));

const AppConnector = () => {

	useEffect(() => {
		window.addEventListener("keydown", initTrapFocus, false);

		// componentWillUnmount
		return () => {
			window.removeEventListener("keydown", initTrapFocus, false);
		}
	}, []);

	const appref = createRef<HTMLDivElement>();

	const initTrapFocus = (e: KeyboardEvent) => {
		return trapFocusRef(e, appref.current as HTMLElement);
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

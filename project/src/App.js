import React from 'react';
import rtl from 'jss-rtl';
import { create } from 'jss';
import MomentUtils from '@date-io/moment';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createBrowserHistory } from 'history';

import {
	jssPreset,
	StylesProvider,
	ThemeProvider
} from '@material-ui/core';

import { createTheme } from 'src/theme';
import useSettings from 'src/hooks/useSettings';
import routes, { renderRoutes } from 'src/routes';
import ScrollReset from 'src/components/ScrollReset';
import GlobalStyles from 'src/components/GlobalStyles';
import { AuthProvider } from 'src/contexts/JWTAuthContext';
import { FAProvider } from 'src/contexts/FAContext';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import Modal2FA from 'src/components/Modal2FA';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CookiesNotification from 'src/components/CookiesNotification';
import SettingsNotification from 'src/components/SettingsNotification';

/* connectIntl */
import { connectIntl } from 'src/contexts/Intl';

const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = ({ intl }) => {
	const { settings } = useSettings();

	const theme = createTheme({
		direction: settings.direction,
		responsiveFontSizes: settings.responsiveFontSizes,
		theme: settings.theme
	});

	return (
		<ThemeProvider theme={theme}>
			<StylesProvider jss={jss}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<SnackbarProvider dense maxSnack={3} >
						<Router history={history}>
							<AuthProvider>
								<FAProvider>
									<Modal2FA />
									<GlobalStyles />
									<ScrollReset />
									<GoogleAnalytics />
									<CookiesNotification />
									<SettingsNotification />
									{renderRoutes(routes, intl)}
								</FAProvider>
							</AuthProvider>
						</Router>
					</SnackbarProvider>
				</MuiPickersUtilsProvider>
			</StylesProvider>
		</ThemeProvider>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(App);


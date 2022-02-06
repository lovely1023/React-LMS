import React, {
	useEffect,
	useReducer,
	createContext,
} from 'react';

import SplashScreen from 'src/components/SplashScreen';

/* connectIntl */
import { connectIntl } from 'src/contexts/Intl';

const initial2FAState = {
	isShow: false,
	isInitialised: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'INITIALISE': {
			const { isShow } = action.payload;

			return {
				...state,
				isShow,
				isInitialised: true,
			};
		}
		case 'SHOW': {
			const { callback } = action.payload;
			return {
				...state,
				callback,
				isShow: true,
			};
		}
		case 'CLOSE': {
			return {
				...state,
				isShow: false,
			};
		}

		default: {
			return { ...state };
		}
	}
};

const FAContext = createContext({
	...initial2FAState,
	show_2fa: () => Promise.resolve(),
	close_2fa: () => Promise.resolve(),
});

export const FAProviderWrapper = ({ children, intl }) => {
	const [ state, dispatch ] = useReducer(reducer, initial2FAState);

	const show_2fa = async (callback = () => {}) => {
		dispatch({
			type: 'SHOW',
			payload: {
				callback,
			}
		});
	};

	const close_2fa = async () => {
		dispatch({
			type: 'CLOSE',
		});
	};

	useEffect(() => {
		const initialise = () => {
			dispatch({
				type: 'INITIALISE',
				payload: {
					isShow: false,
				}
			});
		};

		initialise();
	}, []);

	if (!state.isInitialised) {
		return <SplashScreen />;
	}

	return (
		<FAContext.Provider
			value={{
				...state,
				show_2fa,
				close_2fa,
			}}
		>
			{children}
		</FAContext.Provider>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
});

export const FAProvider = connectIntl(mapStateToProps)(FAProviderWrapper);

export default FAContext;

import React, { useState, useReducer, useEffect } from 'react';
import IntlContext from './IntlContext';

// components
import LoadingScreen from 'src/components/LoadingScreen';

const IntlProvider = ({ children, reducer }) => {
	const [ store, dispatch ] = useReducer(reducer);
	const [ state, setState ] = useState({ isLoaded: false });

	useEffect(() => {
		dispatch({ type: '@initIntl' });
		setState({ isLoaded: true });
	}, []);

	return (
		<IntlContext.Provider value={{ dispatch, store }}>
			{ (state.isLoaded)
				? children : (
					<div style={{
						width: '100vw',
						height: '100vh',
						position: 'fixed',

					}} >
						<LoadingScreen />
					</div>
				)
			}
		</IntlContext.Provider>
	);
};

export default IntlProvider;
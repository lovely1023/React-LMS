import React, { useCallback, useEffect } from 'react';

import qs from 'querystringify';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import httpClient from 'src/utils/httpClient';
import LoadingScreen from 'src/components/LoadingScreen';

const JWTVerification = () => {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const initalize = useCallback(async () => {
		try {
			const { email, verification_key } = qs.parse(history.location.search);

			httpClient.post('api/verification', {
				email,
				verification_key
			})
				.then(json => {
					enqueueSnackbar(
						json.msg,
						{ variant: (json.status) ? 'success' : 'warning' }
					)
					return history.push('/login');
				})
				.catch((error) => {
					console.error(error);
					enqueueSnackbar(
						'Ocurrió un error inesperado. Por favor vuelva a intentar más tarde',
						{ variant: 'error' }
					)
					return history.push('/login')
				});
		} catch (err) {
			console.error(err);
		}
	}, [history, enqueueSnackbar]);

	useEffect(() => {
		initalize();
	}, [initalize]);

	return (
		<div style={{
			width: '100vw',
			height: '100vh',
			position: 'fixed',

		}} >
			<LoadingScreen />
		</div>
	);
};

export default JWTVerification;

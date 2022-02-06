import React, {
	useState,
	useEffect,
	useCallback,
} from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import {
	Box,
	Grid,
	Card,
	Button,
	Divider,
	TextField,
	makeStyles,
	CardContent,
	FormHelperText,
} from '@material-ui/core';

import use2FA from 'src/hooks/use2FA';
import useAuth from 'src/hooks/useAuth';
import RecordWallets from './RecordWallets';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* utils */
import { printErrors } from 'src/utils';
import httpClient from 'src/utils/httpClient';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
	root: {}
}));

const WalletView = ({ intl }) => {
	const { user } = useAuth();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const { show_2fa, close_2fa } = use2FA();
	const { enqueueSnackbar } = useSnackbar();
	const [wallets, setWallets] = useState([]);

	useEffect(() => {
		getWallets();
	}, []);

	const getWallets = () => {
		httpClient.get('api/wallet')
		.then(({ data }) => {
			if (data.wallets.length) {
				setWallets(data.wallets);
			}
		})
	}

	const msgError = [
		formatMessage(intl.theFieldIsRequired),
		formatMessage(intl.maximumCharacters, { characters: 255 }),
	];

	return (
		<Formik
			initialValues={{ wallet_id: '' }}
			validationSchema={Yup.object().shape({
				wallet_id: Yup.string().max(255, msgError[1]).required(msgError[0]),
			})}
			onSubmit={async (values, {
				resetForm,
				setErrors,
				setStatus,
				setSubmitting
			}) => {
				try {
					setSubmitting(true);

					if(!user.google2fa_enabled) {
						enqueueSnackbar(formatMessage(intl.isNotEnabled2FA), {
							variant: 'danger'
						});
						return;
					}

					show_2fa((secret2FA) => {
						httpClient.post('api/wallet', { ...values, secret2FA })
						.then(({ success, data, message, isInvalid2FA }) => {
							if(success) {
								close_2fa();
								resetForm();
								
								enqueueSnackbar(formatMessage(intl.walletIsCreatedSuccessfully), {
									variant: 'success'
								});

								setWallets((prevState) => ([ ...prevState, data.wallet ]));
							} else {
								if(isInvalid2FA) {
									enqueueSnackbar(formatMessage(intl.secretNumberIsNotValid), {
										variant: 'error'
									});
								} else {
									printErrors(message, enqueueSnackbar, { ...intl, formatMessage });
								}
							}

							setSubmitting(false);
						})
					})
				} catch (err) {
					console.error(err);
					setStatus({ success: false });
					setErrors({ submit: err.message });
					setSubmitting(false);
				}
			}}
		>
			{({
				errors,
				handleBlur,
				handleChange,
				handleSubmit,
				isSubmitting,
				touched,
				values
			}) => (
				<form onSubmit={handleSubmit}>
					<Card className={clsx(classes.root)} >
						<CardContent>
							<Grid container spacing={3} >
								<Grid item xs={12} >
									<TextField
										fullWidth
										name="wallet_id"
										variant="outlined"
										label="Btc Wallet"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.wallet_id}
										helperText={touched.wallet_id && errors.wallet_id}
										error={Boolean(touched.wallet_id && errors.wallet_id)}
									/>
								</Grid>
							</Grid>

							<Box mt={3}>
								<RecordWallets wallets={wallets} />
							</Box>
						</CardContent>

						<Divider />

						<Box p={2} display="flex" justifyContent="center" >
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								disabled={isSubmitting}
							>
								Save Changes
							</Button>
						</Box>
					</Card>
				</form>
			)}
		</Formik>
	);
};

WalletView.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(WalletView);
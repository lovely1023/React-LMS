import React, {
	useState,
	Fragment,
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
	Switch,
	Button,
	Divider,
	makeStyles,
	Typography,
	CardContent,
	FormHelperText,
} from '@material-ui/core';

import use2FA from 'src/hooks/use2FA';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import ReactInputVerificationCode from 'react-input-verification-code';

/* utils */
import httpClient from 'src/utils/httpClient';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
	root: {
		marginBottom: '1rem'
	},
	media: {
		maxWidth: '250px'
	},
	textAlign: {
		textAlign: 'center'
	},
	alignSelf: {
		alignSelf: 'center'
	},
	qr: {
		width: 280,
		height: 280,
	}
}));

const Settings = ({ className, intl }) => {
	const classes = useStyles();
	const [ qr, setQr ] = useState(null);
	const isMountedRef = useIsMountedRef();
	const { show_2fa, close_2fa } = use2FA();
	const { enqueueSnackbar } = useSnackbar();
	const [ compound, setCompound ] = useState(false);
	const [ isSubmitting, setSubmitting ] = useState(false);
	const { user, disable_2fa, enable_2fa, updateUser } = useAuth();

	useEffect(() => {
		setCompound(user.compound_interest_activated);
	}, [user]);

	useEffect(() => {
		getQrcode();
	}, [getQrcode]);

	const getQrcode = useCallback(async () => {
		try {
			httpClient.get('api/auth/2fa-generate-secret')
			.then( response => {
				if(response.success)
					setQr(response.data.qr_code)
			});
		} catch (err) {
			console.error(err);
		}
	}, [isMountedRef]);
	
	const changeCompoundStatus = (e) => {
		const { target: { checked} } = e;
		if(!user.google2fa_enabled) {
			enqueueSnackbar(formatMessage(intl.isNotEnabled2FA), {
				variant: 'danger'
			});
			return;
		}

		show_2fa((secret2FA) => {
			if(!user.google2fa_enabled) {
				enqueueSnackbar(formatMessage(intl.isNotEnabled2FA), {
					variant: 'danger'
				});
			} else {
				httpClient.post('api/auth/profile/compound-interest/change-status', {
					secret2FA,
					compound_interest: checked
				})
				.then( response => {
					if(response.success) {
						updateUser(response.data.user);

						setCompound(checked);
						enqueueSnackbar((checked)
							? formatMessage(intl.compoundInterestActivated)
							: formatMessage(intl.compoundInterestDisabled),
							{ variant: 'success'}
						);
						close_2fa();
					} else {
						if(!response.isValid2FA) {
							enqueueSnackbar(formatMessage(intl.secretNumberIsNotValid), {
								variant: 'error'
							});
						} else {
							enqueueSnackbar(
								formatMessage(intl.unexpectedError),
								{ variant: 'success'}
							);
						}
					}
				});
			}
		});
	}

	return (
		<Fragment>
			<Formik
				initialValues={{ secret: '' }}
				onSubmit={async (values, { setFieldValue }) => {
					try {
						setSubmitting(true);
						const { secret } = values;

						const url = (user.google2fa_enabled)
												? 'api/auth/2fa-disable'
												: 'api/auth/2fa-enable';

						httpClient.post(url, { secret })
						.then(({ success }) => {
							setSubmitting(false);
							setFieldValue('secret', '······');

							if(success) {
								let msg = '';
								if(user.google2fa_enabled) {
									disable_2fa();
									msg = formatMessage(intl.disabled2faSuccessfully);
								} else {
									enable_2fa();
									msg = formatMessage(intl.enabled2faSuccessfully);
								}
								enqueueSnackbar(msg, { variant: 'success' });
							} else {
								enqueueSnackbar(formatMessage(intl.secretNumberIsNotValid), {
									variant: 'error'
								});
							}
						});
					} catch (err) {
						console.error(err);
						setSubmitting(false);
					}
				}}
			>
				{({
					errors,
					values,
					handleChange,
					handleSubmit,
					setFieldValue,
				}) => {
					return (
						<form onSubmit={handleSubmit}>
							<Card className={clsx(classes.root)} >
								<CardContent>
									<Grid container spacing={3} >
										<Grid item md={6} sm={12} xs={12} >
											<Box p={2} display="flex" justifyContent="center" >
												<ReactInputVerificationCode
													length={6}
													value={values.secret}
													onChange={(val)=> setFieldValue('secret', val) }
												/>
											</Box>

											<Box p={2} display="flex" justifyContent="center" >
												<Button
													type="submit"
													color="primary"
													variant="contained"
													disabled={Boolean(isSubmitting || isNaN(values.secret))}
												>
													{
														user.google2fa_enabled
															? formatMessage(intl.disable2FA)
															: formatMessage(intl.enable2FA)
													}
												</Button>
											</Box>
										</Grid>
											<Grid item md={6} sm={12} xs={12} >
												<div style={{ textAlign: 'center' }}>
													<img src={qr} className={classes.qr} alt={qr} />
												</div>
											</Grid>
									</Grid>
								</CardContent>
							</Card>
						</form>
					)
				}}
			</Formik>

			<Card className={clsx(classes.root)} >
				<CardContent> 
					<Box p={2} >
						<Typography 
							variant="h3" 
							component="h3"
							align="center"
							color="textPrimary" 
						>
							{formatMessage(intl.interestCompound)}
						</Typography>
					</Box>
					<Box p={3} justifyContent="center" >
						<Grid container spacing={3} >
							<Grid item md={6} sm={12} className={classes.textAlign} >
								<Grid component="label" container alignItems="center" spacing={1}>
									<Grid item>
										{formatMessage(intl.off).toUpperCase()}
									</Grid>

									<Grid item>
										<Switch
											name="compound"
											checked={compound}
											onChange={changeCompoundStatus}
										/>
									</Grid>

									<Grid item>
										{formatMessage(intl.on).toUpperCase()}
									</Grid>
								</Grid>
							</Grid>
							<Grid item md={6} sm={12} className={classes.alignSelf} >
								<Typography
									variant="h5"
									component="h5"
									align="center"
									color="textPrimary"
								>
									{formatMessage(intl.activateCompoundInterest)}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</Fragment>
	);
};

Settings.propTypes = {
	className: PropTypes.string
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(Settings);
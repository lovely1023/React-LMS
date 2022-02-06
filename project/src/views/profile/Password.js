import React, { useState } from 'react';

import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
	Box,
	Card,
	Grid,
	Button,
	Divider,
	TextField,
	makeStyles,
	CardContent,
	FormHelperText,
} from '@material-ui/core';
import use2FA from 'src/hooks/use2FA';
import useAuth from 'src/hooks/useAuth';

/* utils */
import httpClient from 'src/utils/httpClient';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
	root: {}
}));

const Security = ({ intl }) => {
	const { user } = useAuth();
	const classes = useStyles();
	const { show_2fa, close_2fa } = use2FA();
	const { enqueueSnackbar } = useSnackbar();
	const [ isSubmitting, setSubmitting ] = useState(false);

	return (
		<Formik
			initialValues={{
				password: '',
				password_confirmation: '',
				old_password: '',
			}}
			validationSchema={Yup.object().shape({
				old_password: Yup.string()
					.min(7, 'Must be at least 7 characters')
					.max(255)
					.required('Required'),
				password: Yup.string()
					.min(7, 'Must be at least 7 characters')
					.max(255)
					.required('Required'),
				password_confirmation: Yup.string()
					.oneOf([Yup.ref('password'), null], 'Passwords must match')
					.required('Required')
			})}
			onSubmit={async (values, { resetForm }) => {
				try {
					setSubmitting(true);
					if(!user.google2fa_enabled) {
						enqueueSnackbar(formatMessage(intl.isNotEnabled2FA), {
							variant: 'danger'
						});
						setSubmitting(false);
						return;
					}

					show_2fa((secret2FA) => {
						httpClient.put('api/auth/profile/password-reset', {
							...values,
							secret2FA,
						})
						.then(response => {
							setSubmitting(false);
							if(response.success) {
								resetForm();
								enqueueSnackbar(formatMessage(intl.passwordChanged), {
									variant: 'success'
								});
								close_2fa();
							} else {
								if(response.passwordIsIncorrect) {
									enqueueSnackbar(formatMessage(intl.passwordIsIncorrect), {
										variant: 'error'
									});
								} else if(!response.isValid2FA) {
									enqueueSnackbar(
										formatMessage(intl.secretNumberIsNotValid),
										{ variant: 'error'}
									);
								} else {
									enqueueSnackbar(
										formatMessage(intl.unexpectedError),
										{ variant: 'error'}
									);
								}
							}
						})
					})
				} catch (err) {
					console.error(err);
					setSubmitting(false);
				}
			}}
		>
			{({
				errors,
				values,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
			}) => (
				<form onSubmit={handleSubmit}>
					<Card className={clsx(classes.root)} >
						<CardContent>
							<Grid container spacing={3} >
								<Grid item xs={12} >
									<TextField
										fullWidth
										type="password"
										variant="outlined"
										onBlur={handleBlur}
										name="old_password"
										onChange={handleChange}
										value={values.old_password}
										label={formatMessage(intl.password)}
										helperText={touched.old_password && errors.old_password}
										error={Boolean(touched.old_password && errors.old_password)}
									/>
								</Grid>

								<Grid item xs={12} >
									<TextField
										fullWidth
										name="password"
										type="password"
										variant="outlined"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.password}
										label={formatMessage(intl.newPassword)}
										helperText={touched.password && errors.password}
										error={Boolean(touched.password && errors.password)}
									/>
								</Grid>

								<Grid item xs={12} >
									<TextField
										fullWidth
										type="password"
										variant="outlined"
										onBlur={handleBlur}
										onChange={handleChange}
										name="password_confirmation"
										value={values.password_confirmation}
										label={formatMessage(intl.repeadPassword)}
										helperText={touched.password_confirmation && errors.password_confirmation}
										error={Boolean(touched.password_confirmation && errors.password_confirmation)}
									/>
								</Grid>
							</Grid>
						</CardContent>

						<Divider />

						<Box p={2} display="flex" justifyContent="center" >
							<Button
								type="submit"
								color="secondary"
								variant="contained"
								disabled={isSubmitting}
							>
								{formatMessage(intl.saveChanges)}
							</Button>
						</Box>
					</Card>
				</form>
			)}
		</Formik>
	);
};

Security.propTypes = {};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(Security);
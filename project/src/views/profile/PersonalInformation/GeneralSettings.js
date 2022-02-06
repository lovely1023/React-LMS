import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import {
	Box,
	Card,
	Button,
	Divider,
	Grid,
	TextField,
	makeStyles,
	CardContent,
	FormHelperText,
} from '@material-ui/core';

import wait from 'src/utils/wait';
import countries from './countries';
import use2FA from 'src/hooks/use2FA';
import useAuth from 'src/hooks/useAuth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import {  DatePicker } from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';

/* utils */
import { printErrors } from 'src/utils';
import httpClient from 'src/utils/httpClient';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
	root: {}
}));

const GeneralSettings = ({ user, intl }) => {
	const classes = useStyles();
	const { updateUser } = useAuth();
	const { show_2fa, close_2fa } = use2FA();
	const { enqueueSnackbar } = useSnackbar();
	const [ isSubmitting, setSubmitting ] = useState(false);

	const msgError = [
		formatMessage(intl.mustBeAValidEmail),
		formatMessage(intl.maximumCharacters, { characters: 255 }),
		formatMessage(intl.maximumCharacters, { characters: 30 }),
	];
	const validationSchema = Yup.object().shape({
		postal_code: Yup.number(),
		country: Yup.string().max(255),
		doc: Yup.string().max(30, msgError[2]),
		name: Yup.string().max(255, msgError[1]),
		address: Yup.string().max(255, msgError[1]),
		doc_type: Yup.string().max(255, msgError[1]),
		province: Yup.string().max(255, msgError[1]),
		locality: Yup.string().max(255, msgError[1]),
		surnames: Yup.string().max(255, msgError[1]),
		phone_number: Yup.string().max(255, msgError[1]),
		phone_prefix: Yup.string().max(255, msgError[1]),
		email: Yup.string().email(msgError[0]).max(255, msgError[1]),
	})

	return (
		<Formik
			enableReinitialize
			initialValues={{
				doc: user.doc || '',
				name: user.name || '',
				email: user.email || '',
				address: user.address || '',
				locality: user.locality || '',
				dob: user.dob || (new Date()),
				surnames: user.surnames || '',
				province: user.province || '',
				doc_type: user.doc_type || 'DNI',
				postal_code: user.postal_code || '',
				phone_number: user.phone_number || '',
				phone_prefix: user.phone_prefix || '',
				country: countries.find((el) => el.value === user.country_code) || countries[0],
			}}
			validationSchema={validationSchema}
			onSubmit={(values, { setErrors }) => {
				try {
					setSubmitting(true);
					let data = { ...values };

					if(!user.google2fa_enabled) {
						enqueueSnackbar(formatMessage(intl.isNotEnabled2FA), {
							variant: 'danger'
						});
						return;
					}

					data.country_code = data.country.value;

					show_2fa((secret2FA) => {
						const urlAPI = `api/auth/profile/${(user.role === 'ADMIN') ? '' : user.id}`;
						httpClient.put(urlAPI, { secret2FA, ...data })
						.then( ({ success, message, data, isInvalid2FA }) => {
							if(success) {
								close_2fa();
								updateUser(data.user);

								enqueueSnackbar(formatMessage(intl.profileSuccessfullyUpdated), {
									variant: 'success'
								});

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
						});
					});
				} catch (err) {
					console.error(err);
					setSubmitting(false);
					setErrors({ submit: err.message });
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
				setFieldValue,
				setFieldTouched,
			}) => {
				const isAdmin =  user.role === 'ADMIN';

				return(
					<form onSubmit={handleSubmit}>
						<Card className={clsx(classes.root)} >
							<CardContent>
								<Grid container spacing={4} >
									<Grid item md={4} xs={12} >
										<TextField
											fullWidth
											name="name"
											variant="outlined"
											disabled={!isAdmin}
											value={values.name}
											onBlur={handleBlur}
											onChange={handleChange}
											label={formatMessage(intl.name)}
											helperText={touched.name && errors.name}
											error={Boolean(touched.name && errors.name)}
										/>
									</Grid>

									<Grid item md={4} xs={12} >
										<TextField
											fullWidth
											name="surnames"
											variant="outlined"
											disabled={!isAdmin}
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.surnames}
											label={formatMessage(intl.surname)}
											helperText={touched.surnames && errors.surnames}
											error={Boolean(touched.surnames && errors.surnames)}
										/>
									</Grid>

									<Grid item md={4} xs={12} >
										<DatePicker
											autoOk
											fullWidth
											name='dob'
											variant='inline'
											value={values.dob}
											format='DD/MM/YYYY'
											disabled={!isAdmin}
											inputVariant='outlined'
											label={formatMessage(intl.birthday)}
											onChange={(date) => setFieldValue('dob', date)}
											invalidDateMessage={formatMessage(intl.invalidDateFormat)}
										/>
									</Grid>

									<Grid item md={6} xs={12} >
										<TextField
											select
											required
											fullWidth
											name="doc_type"
											variant="outlined"
											disabled={!isAdmin}
											value={values.doc_type}
											onChange={handleChange}
											SelectProps={{ native: true }}
											label={formatMessage(intl.documentType)}
											error={Boolean(touched.doc_type && !values.doc_type)}
											helperText={
												(Boolean(touched.doc_type && !values.doc_type))
													? errors.doc_type : ''
											}
										>
												<option key='1' value='DNI' >
													{formatMessage(intl.dni)}
												</option>

												<option key='2' value='PASSPORT' >
													{formatMessage(intl.passport)}
												</option>
										</TextField>
									</Grid>

									<Grid item md={6} xs={12} >
										<TextField
											fullWidth
											name="doc"
											variant="outlined"
											value={values.doc}
											onBlur={handleBlur}
											disabled={!isAdmin}
											onChange={handleChange}
											helperText={touched.doc && errors.doc}
											label={formatMessage(intl.documentNumber)}
											error={Boolean(touched.doc && errors.doc)}
										/>
									</Grid>

									<Grid item md={6} xs={12} >
										<PhoneInput
											country={'us'}
											inputStyle={{width:"100%"}}
											value={values.phone_prefix + values.phones}
											onChange={(value, country) => {
												setFieldValue('phone_prefix', country.dialCode);
												setFieldValue('phone_number', value.replace(country.dialCode, ''));
											}} />
									</Grid>

									<Grid item md={6} xs={12} >
										<TextField
											required
											fullWidth
											name="email"
											type="email"
											variant="outlined"
											disabled={!isAdmin}
											onBlur={handleBlur}
											value={values.email}
											onChange={handleChange}
											label={formatMessage(intl.emailAddress)}
											error={Boolean(touched.email && errors.email)}
										/>
									</Grid>

									<Grid item md={12} xs={12} >
										<TextField
											fullWidth
											name="address"
											variant="outlined"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.address}
											label={formatMessage(intl.address)}
											helperText={touched.address && errors.address}
											error={Boolean(touched.address && errors.address)}
										/>
									</Grid>

									<Grid item md={6} xs={12} >
										<TextField
											fullWidth
											name="locality"
											variant="outlined"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.locality}
											label={formatMessage(intl.locality)}
											helperText={touched.locality && errors.locality}
											error={Boolean(touched.locality && errors.locality)}
										/>
									</Grid>

									<Grid item md={6} xs={12} >
										<TextField
											fullWidth
											type="number"
											variant="outlined"
											name="postal_code"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.postal_code}
											label={formatMessage(intl.postalCode)}
											helperText={touched.postal_code && errors.postal_code}
											error={Boolean(touched.postal_code && errors.postal_code)}
										/>
									</Grid>

									<Grid item md={6} xs={12} >
										<TextField
											fullWidth
											name="province"
											variant="outlined"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.province}
											label={formatMessage(intl.province)}
											helperText={touched.province && errors.province}
											error={Boolean(touched.province && errors.province)}
										/>
									</Grid>

									<Grid item md={6} xs={12} >
										<Autocomplete
											options={countries}
											value={values.country}
											getOptionLabel={(option) => option.text}
											onChange={(e, value) => setFieldValue('country', value)}
											renderInput={(params) => (
												<TextField
													fullWidth
													{...params}
													name="country"
													variant="outlined"
													label={formatMessage(intl.country)}
												/>
											)}
										/>
									</Grid>
								</Grid>
							</CardContent>

							<Divider />

							<Box
								p={2}
								display="flex"
								justifyContent="center"
							>
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
				)
			}}
		</Formik>
	);
};

GeneralSettings.propTypes = {
	className: PropTypes.string,
	user: PropTypes.object.isRequired
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(GeneralSettings);
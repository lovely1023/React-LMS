import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import Moment from 'moment';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
	Box,
	Grid,
	Button,
	Checkbox,
	FormHelperText,
	TextField,
	Typography,
	Link,
	makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import countries from '../../profile/PersonalInformation/countries';

const useStyles = makeStyles(() => ({
	root: {}
}));

const JWTRegister = () => {
	const classes = useStyles();
	const _formREf = useRef(null);
	const { register } = useAuth();
	const { enqueueSnackbar } = useSnackbar();
	const [ isSubmitting, setSubmitting ] = useState(false);

	const msgError = [
		'The field is required',
		'Check wrong fields',
	];
	const validationSchema = Yup.object().shape({
		dob: Yup.date().required(msgError[0]),
		name: Yup.string().max(191).required(msgError[0]),
		email: Yup.string().max(191).required(msgError[0]),
		address: Yup.string().max(191).required(msgError[0]),
		surnames: Yup.string().max(191).required(msgError[0]),
		locality: Yup.string().max(191).required(msgError[0]),
		password: Yup.string().max(191).required(msgError[0]),
		doc_number: Yup.string().max(191).required(msgError[0]),
		postal_code: Yup.string().max(191).required(msgError[0]),
		country_code: Yup.string().max(191).required(msgError[0]),
		phone_prefix: Yup.string().max(191).required(msgError[0]),
		phone_number: Yup.string().max(191).required(msgError[0]),
		province_code: Yup.string().max(191).required(msgError[0]),
		password_confirmation: Yup.string().max(191).required(msgError[0]),
	})

	return (
		<Formik
			initialValues={{
				name: '',
				phone_number: '',
				email: '',
				phone_prefix: '',
				address: '',
				surnames: '',
				country_code: '',
				locality: '',
				province_code: '',
				password: '',
				policy: false,
				doc_type: 1,
				postal_code: '',
				doc_number: '',
				dob: (new Date()),
				password_confirmation: '',
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { setErrors }) => {
				try {
					setSubmitting(true);

					let errors = {};
					let data = { ...values };

					data.dob = Moment(data.dob).format('DD/MM/YYYY');

					if(!data.policy) {
						errors.policy = msgError[0];
					}

					if(!data.phone_number) {
						errors.phone_number = msgError[0];
					}

					if(Object.keys(errors).length) {
						setErrors(errors);
						setSubmitting(false);
						_formREf.current.scrollIntoView({ behavior: 'smooth' });

						enqueueSnackbar(
							msgError[1],
							{ variant: 'warning' }
						);
						return;
					}
					await register(data);
					setSubmitting(false);
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
				setFieldValue,
				setFieldTouched,
			}) => {
				return(
					<form ref={_formREf} className={clsx(classes.root)} onSubmit={handleSubmit} >
						<Grid container spacing={4} >
							<Grid item md={4} xs={12} >
								<TextField
									required
									fullWidth
									name='name'
									label='Name'
									variant="outlined"
									onBlur={handleBlur}
									value={values.name}
									onChange={handleChange}
									error={Boolean(touched.name && errors.name)}
									helperText={(touched.name && errors.name) ? errors.name : ''}
								/>
							</Grid>

							<Grid item md={4} xs={12} >
								<TextField
									required
									fullWidth
									name="surnames"
									label="Surname"
									variant="outlined"
									onBlur={handleBlur}
									value={values.surnames}
									onChange={handleChange}
									error={Boolean(touched.surnames && errors.surnames)}
									helperText={(touched.surnames && errors.surnames) ? errors.surnames : ''}
								/>
							</Grid>

							<Grid item md={4} xs={12} >

							<KeyboardDatePicker
									required
									fullWidth
									name="dob"
									label="Birthdate"
									format="DD/MM/YYYY"
									inputVariant="outlined"
									value={values.dob}
									className={classes.datePicker}
									onBlur={() => setFieldTouched('dob')}
									onClose={() => setFieldTouched('dob')}
									onAccept={() => setFieldTouched('dob')}
									onChange={(date) => setFieldValue('dob', date)}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									select
									required
									fullWidth
									variant="outlined"
									name="doc_type"
									label="DNI / PASSPORT"
									onChange={handleChange}
									value={values.doc_type}
									SelectProps={{ native: true }}
									error={Boolean(touched.doc_type && errors.doc_type)}
									helperText={
										(touched.doc_type && errors.doc_type) ? errors.doc_type : ''
									}
								>
									<option value='DNI' >
										DNI
									</option>

									<option value='PASSPORT' >
										PASSPORT
									</option>
								</TextField>
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									type="number"
									variant="outlined"
									onBlur={handleBlur}
									name="doc_number"
									label="Document Number"
									onChange={handleChange}
									value={values.doc_number}
									error={Boolean(touched.doc_number && errors.doc_number)}
									helperText={
										(touched.doc_number && errors.doc_number) ? errors.doc_number : ''
									}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<PhoneInput
									required
									country={'us'}
									value={values.phone_number}
									inputStyle={{width:"100%"}}
									onChange={(phone_number, phone_prefix) => {
										setFieldValue('phone_number', phone_number)
										setFieldValue('phone_prefix', phone_prefix.dialCode)
									}}/>
									{(touched.phone_number && errors.phone_number) && (
										<Box mt={1}>
											<FormHelperText error>
												{errors.phone_number}
											</FormHelperText>
										</Box>
									)}
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									name="email"
									type="email"
									variant="outlined"
									onBlur={handleBlur}
									label="Email Address"
									value={values.email}
									onChange={handleChange}
									error={Boolean(touched.email && errors.email)}
									helperText={(touched.email && errors.email) ? errors.email : ''}
								/>
							</Grid>

							<Grid item md={12} xs={12} >
								<TextField
									required
									fullWidth
									name="address"
									label="Address"
									variant="outlined"
									onBlur={handleBlur}
									value={values.address}
									onChange={handleChange}
									error={Boolean(touched.address && errors.address)}
									helperText={(touched.address && errors.address) ? errors.address : ''}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									label="Place"
									name="locality"
									variant="outlined"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.locality}
									error={Boolean(touched.locality && errors.locality)}
									helperText={(touched.locality && errors.locality) ? errors.locality : ''}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									type="number"
									name="postal_code"
									variant="outlined"
									label="Postal Code"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.postal_code}
									error={Boolean(touched.postal_code && errors.postal_code)}
									helperText={
										(touched.postal_code && errors.postal_code) ? errors.postal_code : ''
									}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									name="province_code"
									label="Province"
									variant="outlined"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.province_code}
									error={Boolean(touched.province_code && errors.province_code)}
									helperText={(touched.province_code && errors.province_code) ? errors.province_code : ''}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<Autocomplete
									options={countries}
									getOptionLabel={(option) => option.text}
									onChange={(e,val) => {
										if(val) 
											setFieldValue('country_code', val.value)}
									}
									renderInput={(params) => (
										<TextField
											required
											fullWidth
											name="country_code"
											label="Country"
											variant="outlined"
											{...params}
										/>
									)}
								/>
								{(touched.country_code && errors.country_code) && (
									<Box mt={1}>
										<FormHelperText error>
											{errors.country_code}
										</FormHelperText>
									</Box>
								)}
							</Grid>
						</Grid>

						<Grid container spacing={4} >
							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									margin="normal"
									name="password"
									type="password"
									label="Password"
									variant="outlined"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									error={Boolean(touched.password && errors.password)}
									helperText={(touched.password && errors.password) ? errors.password : ''}
								/>
							</Grid>

							<Grid item md={6} xs={12} >
								<TextField
									required
									fullWidth
									margin="normal"
									type="password"
									variant="outlined"
									onBlur={handleBlur}
									onChange={handleChange}
									name="password_confirmation"
									label="Password confirmation"
									value={values.password_confirmation}
									error={
										Boolean(touched.password_confirmation && errors.password_confirmation)
									}
									helperText={
										(touched.password_confirmation && errors.password_confirmation)
												? errors.password_confirmation : ''
									}
								/>
							</Grid>
						</Grid>
						<Box alignItems="center" display="flex" mt={2} ml={-1} >
							<Checkbox name="policy" checked={values.policy} onChange={handleChange} />
							<Typography variant="body2" color="textSecondary" >
								I have read the
								{' '}
								<Link
									component="a"
									href="#"
									color="secondary"
								>
									Terms and Conditions
								</Link>
							</Typography>
						</Box>
						{Boolean(touched.policy && errors.policy) && (
							<FormHelperText error>
								{errors.policy}
							</FormHelperText>
						)}
						<Box mt={2}>
							<Button
								fullWidth
								size="large"
								type="submit"
								color="secondary"
								variant="contained"
								disabled={isSubmitting}
							>
								Register
							</Button>
						</Box>
					</form>
				)
			}}
		</Formik>
	);
};

JWTRegister.propTypes = {
	className: PropTypes.string
};

export default JWTRegister;

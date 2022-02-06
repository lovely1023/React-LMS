import React, { useState } from 'react';

import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	TextField,
	makeStyles,
	FormHelperText,
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
	root: {}
}));

const JWTLogin = ({ isAdmin, intl }) => {
	const { login } = useAuth();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [ isSubmitting, setSubmitting ] = useState(false);

	const msgError = [
		formatMessage(intl.mustBeAValidEmail),
		formatMessage(intl.theFieldIsRequired),
		formatMessage(intl.maximumCharacters, { characters: 255 }),
	];
	const validationSchema = Yup.object().shape({
		password: Yup.string().max(255, msgError[2]).required(msgError[1]),
		email: Yup.string().max(255, msgError[0]).required(msgError[1]),
		// email: Yup.string().email(msgError[0]).max(255, msgError[2]).required(msgError[1]),
	})

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={validationSchema}
			onSubmit={async (values) => {
				try {
						await login(values.email, values.password, isAdmin);

					if (isMountedRef.current) {
						setSubmitting(false);
					}
				} catch (err) {
					console.error(err);
					if (isMountedRef.current) {
						setSubmitting(false);
					}
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
				isSubmitting,
			}) => (
				<form noValidate onSubmit={handleSubmit} className={clsx(classes.root)} >
					<TextField
						fullWidth
						autoFocus
						name="email"
						// type="email"
						label="Name"
						margin="normal"
						variant="outlined"
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
						helperText={touched.email && errors.email}
						error={Boolean(touched.email && errors.email)}
					/>

					<TextField
						fullWidth
						margin="normal"
						name="password"
						type="password"
						label="Password"
						variant="outlined"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.password}
						helperText={touched.password && errors.password}
						error={Boolean(touched.password && errors.password)}
					/>

					<Box mt={2}>
						<Button
							fullWidth
							size="large"
							type="submit"
							color="secondary"
							variant="contained"
							disabled={isSubmitting}
						>
							{formatMessage(intl.logIn)}
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};

JWTLogin.propTypes = {
	className: PropTypes.string,
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(JWTLogin);

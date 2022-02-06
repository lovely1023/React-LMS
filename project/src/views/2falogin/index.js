import React, { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Container,
	Typography,
	makeStyles,
	Button
} from '@material-ui/core';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';
import ReactInputVerificationCode from 'react-input-verification-code';

const methodIcons = {
	'JWT': '/static/images/jwt.svg',
	'Auth0': '/static/images/auth0.svg',
	'FirebaseAuth': '/static/images/firebase.svg',
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.dark,
	},
	banner: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		backgroundColor: theme.palette.background.paper,
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	bannerChip: {
		marginRight: theme.spacing(2)
	},
	methodIcon: {
		height: 30,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	},
	cardContainer: {
		paddingTop: 80,
		paddingBottom: 80,
	},
	cardContent: {
		minHeight: 400,
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(4),
	},
	currentMethodIcon: {
		height: 40,
		'& > img': {
			width: 'auto',
			maxHeight: '100%'
		}
	}
}));

const LoginView = () => {
	const classes = useStyles();
	const { method } = useAuth();
	const { login_2fa } = useAuth();
	const [secret, setSecret] = useState('');

	const handlesubmit = async () => {
		if (isNaN(secret)) return;
		try {
			await login_2fa(secret);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Page
			className={classes.root}
			title="Login"
		>
			<Container
				className={classes.cardContainer}
				maxWidth="sm"
			>
				<Box mb={8} display="flex" justifyContent="center" ></Box>
				<Card>
					<CardContent className={classes.cardContent}>
						<Box
							mb={3}
							display="flex"
							alignItems="center"
							justifyContent="space-between"
						>
							<div>
								<Typography
									color="textPrimary"
									gutterBottom
									variant="h2"
								>
									Enter 2FA Code
								</Typography>
							</div>
							<div className={classes.currentMethodIcon}>
								<img
									alt="Auth method"
									src={methodIcons[method]}
								/>
							</div>
						</Box>
						<Box
							flexGrow={1}
							mt={3}
						>
							<Box mt={2} style={{ textAlign: 'center' }}>
								<ReactInputVerificationCode
									length={6}
									onChange={ (val)=> setSecret(val) }
								/>
							</Box>
							<Box mt={2} style={{ textAlign: 'center' }}>
								<Button
									color="secondary"
									variant="contained"
									onClick={handlesubmit}
									disabled={isNaN(secret)}
									style={{ width: '100%', marginTop: 100 }}
								>
									LOG IN
								</Button>
							</Box>
						</Box>
					</CardContent>
				</Card>
			</Container>
		</Page>
	);
};

export default LoginView;

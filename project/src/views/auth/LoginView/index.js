import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	Card,
	Link,
	Divider,
	Container,
	Typography,
	makeStyles,
	CardContent,
} from '@material-ui/core';
import JWTLogin from './JWTLogin';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';

/* connectIntl */
import { formatMessage } from 'src/contexts/Intl';

const methodIcons = {
	'JWT': '/static/images/jwt.svg',
	'Auth0': '/static/images/auth0.svg',
	'FirebaseAuth': '/static/images/firebase.svg',
};

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh'
	},
	banner: {
		backgroundColor: theme.palette.background.paper,
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2),
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
		paddingBottom: 80,
		paddingTop: 80,
	},
	cardContent: {
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		minHeight: 400
	},
	currentMethodIcon: {
		height: 40,
		'& > img': {
			width: 'auto',
			maxHeight: '100%'
		}
	}
}));

const LoginView = ({ intl, match, ...props }) => {
	const classes = useStyles();
	const { method } = useAuth();
	const isAdmin = match.path === formatMessage(intl.urlAdminLogin);


	return (
		<Page className={classes.root} title={formatMessage(intl.login)} >
			<Container className={classes.cardContainer} maxWidth="sm" >
				<Box mb={8} display="flex" justifyContent="center" >
					<RouterLink to="/">
						<Logo color/>
					</RouterLink>
				</Box>

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
									variant="h2"
									gutterBottom
									color="textPrimary"
								>
									{formatMessage(intl.signIn)}
								</Typography>
							</div>

							<div className={classes.currentMethodIcon}>
								<img alt="Auth method" src={methodIcons[method]} />
							</div>
						</Box>

						<Box flexGrow={1} mt={3} >
							{method === 'JWT' && <JWTLogin isAdmin={isAdmin} /> }
						</Box>

						{!isAdmin &&
							<Fragment>
								<Box my={3}> <Divider /> </Box>

								<Link
									variant="body2"
									color="textSecondary"
									component={RouterLink}
									to={formatMessage(intl.urlRegister)}
									>
									{formatMessage(intl.createNewAccount)}
								</Link>
							</Fragment>
						}
					</CardContent>
				</Card>
			</Container>
		</Page>
	);
};

export default LoginView;

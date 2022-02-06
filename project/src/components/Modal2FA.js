import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Card,
	Modal,
	Button,
	Container,
	Typography,
	CardContent,
} from '@material-ui/core';

import use2FA from 'src/hooks/use2FA';
import Page from '../../src/components/Page';
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import ReactInputVerificationCode from 'react-input-verification-code';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {},
	cardContainer: {
		margin: '24px'
	},
	paper: {
		position: 'absolute',
		border: '2px solid #fff',
		boxShadow: theme.shadows[5],
		backgroundColor: theme.palette.background.paper,
	},
}));

const Modal2FA = ({ className, intl, ...rest }) => {
	const classes = useStyles();
	const [ secret, setSecret ] = useState('');
	const [ modalStyle ] = useState(getModalStyle);
	const { close_2fa, isShow, callback } = use2FA();


	const handleClose = () => {
		close_2fa()
	};

	const handlesubmit = async () => {
		try {
			callback(secret);
			setSecret('');
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			<Modal
				open={isShow}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<Page className={classes.root} title="Verify 2FA" >
						<Container
							className={classes.cardContainer}
							maxWidth="sm"
						>
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
												gutterBottom
												variant="h2"
												color="textPrimary"
											>
												{formatMessage(intl.enter2FACode)}
											</Typography>
										</div>
									</Box>
									<Box
										flexGrow={1}
										mt={3}
									>
										<Box mt={2} style={{ textAlign: 'center' }}>
											<ReactInputVerificationCode
												length={6}
												value={secret}
												onChange={(val)=> setSecret(val)}
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
												{formatMessage(intl.verify)}
											</Button>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Container>
					</Page>
				</div>
			</Modal>
		</div>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(Modal2FA);

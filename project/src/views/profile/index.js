import React, { useState } from 'react';
import {
	Box,
	Container,
	Divider,
	Tab,
	Tabs,
	makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import PersonalInformation from './PersonalInformation';
import Settings from './Settings';
import Password from './Password';
import Wallet from './Wallet';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3)
	}
}));

const AccountView = () => {
	const { user } = useAuth();
	const classes = useStyles();
	const [ currentTab, setCurrentTab ] = useState(
		(user.role === 'ADMIN' ? 'password' : 'personal_information')
	);

	const tabs = [
		{ value: 'personal_information', label: 'PERSONAL INFORMATION' },
		{ value: 'wallet', label: 'WALLET' },
		{ value: 'password', label: 'PASSWORD' },
		{ value: 'settings', label: 'SETTINGS' }
	];

	const handleTabsChange = (event, value) => {
		setCurrentTab(value);
	};

	return (
		<Page
			className={classes.root}
			title="Profile"
		>
			<Container maxWidth="lg">
				<Header />
				<Box mt={3}>
					<Tabs
						onChange={handleTabsChange}
						scrollButtons="auto"
						value={currentTab}
						variant="scrollable"
						textColor="secondary"
					>
						{tabs.map((tab) => (
							(user.role !== 'ADMIN' || tab.value !== 'wallet') &&
							(user.role !== 'ADMIN' || tab.value !== 'personal_information') && <Tab
								key={tab.value}
								label={tab.label}
								value={tab.value}
							/>
						))}
					</Tabs>
				</Box>
				<Divider />
				<Box mt={3}>
					{currentTab === 'personal_information' && <PersonalInformation />}
					{currentTab === 'wallet' && <Wallet />}
					{currentTab === 'password' && <Password />}
					{currentTab === 'settings' && <Settings />}
				</Box>
			</Container>
		</Page>
	);
};

export default AccountView;

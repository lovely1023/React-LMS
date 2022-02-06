import React, {
	useState,
	useEffect,
	useCallback,
} from 'react';
import {
	Box,
	Container,
	makeStyles
} from '@material-ui/core';
import Results from './Results';
import Page from 'src/components/Page';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* utils */
import httpClient from 'src/utils/httpClient';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		backgroundColor: theme.palette.background.dark,
	}
}));

const UsersListView = ({ intl }) => {
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [ users, setUsers ] = useState([]);

	const deleteUsers = (selected) => {
		let temp = [];
		const eliminatedList = [];
		users.forEach((user) => {
			if(!selected.includes(user.id)) {
				temp.push(user)
			} else {
				eliminatedList.push(deleteUser(user.id));
			}
		})
		return eliminatedList;
	}

	const deleteUser = (id) => {
		httpClient.delete(`api/auth/admin/users/${id}`);
		setUsers((prevState) => prevState.filter((el) => el.id != id))
		return id;
	}

	const getUsers = useCallback(async () => {
		try {
			const { data: { users } } = await httpClient.get('api/auth/admin/users');

			if (isMountedRef.current) {
				console.log(users);
				setUsers(users);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMountedRef]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.users)}
		>
			<Container maxWidth={false}>
				<Header
					actualPage={formatMessage(intl.users)}
					buttonRight={{ to: formatMessage(intl.urlAppuserAdd) }}
				/>
				<Box mt={3}>
					<Results
						users={users}
						deleteUser={deleteUser}
						deleteUsers={deleteUsers}
					/>
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(UsersListView);
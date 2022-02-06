import React, {
	useCallback,
	useState,
	useEffect
} from 'react';
import {
	Box,
	Container,
	makeStyles
} from '@material-ui/core';
import Details from './Details';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import { Edit as EditIcon } from 'react-feather';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* utils */
import httpClient from 'src/utils/httpClient';
import axios from 'src/utils/axios';

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

const GroupDetailView = ({ intl }) => {
	const params = useParams();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [group, setGroup] = useState(null);

	const getGroup = useCallback(async () => {
		try {
			const response = await axios.get(`api/group/1`);
			if (isMountedRef.current) {
				setGroup(response.data.group);
				console.log(response.data.group)
			}
		} catch (err) {
			console.log(err)
		}
	}, [isMountedRef]);

	useEffect(() => {
		getGroup();
	}, [getGroup]);

	if (!group) {
		return null;
	}

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.groupDetail)}
		>
			<Container maxWidth={false}>
				<Header
					goBack
					actualPage={formatMessage(intl.groupDetail)}
					buttonRight={{
						icon: (<EditIcon />),
						label: formatMessage(intl.edit),
						to: formatMessage(intl.urlGroupEdit, { groupId: params.groupId }),
					}}
				/>
				<Box mt={3}>
					<Details group={group} />
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(GroupDetailView);

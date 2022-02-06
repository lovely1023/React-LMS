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
import httpClient from 'src/utils/httpClient';
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		backgroundColor: theme.palette.background.dark,
	}
}));

const TextbookDetailView = ({ intl }) => {
	const params = useParams();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [textbook, setTextbook] = useState({});
	const [students, setStudents] = useState([]);
	const [teachers, setTeachers] = useState([]);

	const getPerTextbookinfos = useCallback(async () => {
		httpClient.get(`api/textbooks/perInfo/${params.textbookId}`)
			.then(json => {
				if (json.success && isMountedRef.current) {
					setTextbook(json.textbook[0]);
					setStudents(json.students);
					setTeachers(json.teachers);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isMountedRef]);

	useEffect(() => {
		getPerTextbookinfos();
	}, [getPerTextbookinfos]);

	if (!textbook) {
		return null;
	}

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.textbookDetail)}
		>
			<Container maxWidth={"md"}>
				<Header
					goBack
					actualPage={formatMessage(intl.textbookDetail)}
					buttonRight={{
						icon: (<EditIcon />),
						label: formatMessage(intl.edit),
						to: formatMessage(intl.urlTextbookEdit, { textbookId: params.textbookId }),
					}}
				/>
				<Box mt={3}>
					<Details
						textbook={textbook}
						teachers={teachers}
						students={students}
					/>
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(TextbookDetailView);

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
import 'src/components/global';
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

const TeacherDetailView = ({ intl }) => {
	const params = useParams();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [teacher, setTeacher] = useState([]);
	const [books, setBooks] = useState([]);
	const [observers, setObservers] = useState([]);
	const [flag, setFlag] = React.useState(false);

	const getTeacher = useCallback(async () => {
		let data = { id: params.teacherId, searchVal: global.teacherSearchVal }
		const url = `api/teacher/person`
		const method = 'post';
		httpClient[method](url, data)
			.then(json => {
				if (json.success && isMountedRef.current) {
					setTeacher(json.teacher[0]);
					setBooks(json.books);
					setObservers(json.observers);
					setFlag(true)
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isMountedRef]);

	useEffect(() => {
		getTeacher();
	}, [getTeacher]);

	if (!flag) {
		return null;
	}

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.teacherDetail)}
		>
			<Container maxWidth={"md"}>
				<Header
					goBack
					actualPage={formatMessage(intl.teacherDetail)}
					buttonRight={{
						icon: (<EditIcon />),
						label: formatMessage(intl.edit),
						to: formatMessage(intl.urlTeacherEdit, { teacherId: params.teacherId }),
					}}
				/>
				<Box mt={3}>
					<Details
						teacher={teacher}
						books={books}
						observers={observers}
					/>
				</Box>
			</Container>
		</Page>
	);
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(TeacherDetailView);

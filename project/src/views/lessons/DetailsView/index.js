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

const LessonDetailView = ({ intl }) => {
	const params = useParams();
	const classes = useStyles();
	const isMountedRef = useIsMountedRef();
	const [lesson, setLesson] = useState([]);
	const [textbooks, setTextbooks] = useState([]);
	const [students, setStudents] = useState([]);

	const getLesson = useCallback(async () => {
		httpClient.get(`api/lessons/${params.lessonId}/${params.topicsName}`)
			.then(json => {
				if (json.success && isMountedRef.current) {
					setLesson(json.lesson[0]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isMountedRef]);

	const getTextbooks = useCallback(async () => {
		httpClient.get(`api/lessons/textbook/${params.lessonId}/textbook`)
			.then(json => {
				if (json.success && isMountedRef.current) {
					setTextbooks(json.textbooks);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isMountedRef]);

	const getStudents = useCallback(async () => {
		httpClient.get(`api/lessons/student/${params.lessonId}/student`)
			.then(json => {
				if (json.success && isMountedRef.current) {
					setStudents(json.students);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [isMountedRef]);

	useEffect(() => {
		getLesson();
		getTextbooks();
		getStudents();
	}, [getLesson]);

	if (!lesson) {
		return null;
	}

	return (
		<Page
			className={classes.root}
			title={formatMessage(intl.lessonDetail)}
		>
			<Container maxWidth={false}>
				<Header
					goBack
					actualPage={formatMessage(intl.lessonDetail)}
					buttonRight={{
						icon: (<EditIcon />),
						label: formatMessage(intl.edit),
						to: formatMessage(intl.urlLessonEdit, { lessonId: params.lessonId }),
					}}
				/>
				<Box mt={3}>
					<Details
						lesson={lesson}
						textbooks={textbooks}
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

export default connectIntl(mapStateToProps)(LessonDetailView);

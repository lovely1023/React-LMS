import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import LessonEditForm from '../Form/LessonAddEditForm';
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

const LessonEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [lesson, setLesson] = useState(null);
  const [textbooks, setTextbooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [topics, setTopics] = useState([]);

  const getLesson = useCallback(async () => {
    httpClient.get(`api/lessons/${params.lessonId}/${params.topicsName}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLesson(json.lesson[0]);
          // console.log('json.lesson[0]--->', json.lesson[0].startTime);
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

  const getTopics = useCallback(async () => {
    httpClient.get(`api/lessons/topics/${params.lessonId}/topics`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTopics(json.topics);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    getTextbooks();
    getStudents();
    getTopics();
    getLesson();
  }, [getLesson, getTopics, getStudents, getTextbooks]);

  if (!lesson) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editLesson)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth={false}>
          <LessonEditForm
            update
            lesson={lesson}
            textbooks={textbooks}
            students={students}
            topics={topics}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(LessonEditView);

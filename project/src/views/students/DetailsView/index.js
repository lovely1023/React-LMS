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

const StudentDetailView = ({ intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [student, setStudent] = useState([]);
  const [groupids, setGroupids] = useState([]);
  const [textbookinfo, setTextbookinfo] = useState([]);
  const [noteinfo, setNotesinfo] = useState([]);

  const getStudent = useCallback(async () => {
    httpClient.get(`api/student/${params.studentId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setStudent(json.student);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.studentId]);

  const getGroupsstudentids = useCallback(async () => {
    httpClient.get(`api/groupsstudents/${params.studentId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setGroupids(json.groupids);
        }
      })
      .catch((error) => {
        console.log('error--->', error);
      });
  }, [isMountedRef, params.studentId]);

  const getTextbookinfo = useCallback(async () => {
    // httpClient.get(`api/textbooks/8395`)
    httpClient.get(`api/textbooks/${params.studentId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTextbookinfo(json.textbook);
        }
      })
      .catch((error) => {
        console.log('error--->', error);
      });
  }, [isMountedRef, params.studentId]);

  const getNotesinfo = useCallback(async () => {
    httpClient.get(`api/notes/${params.studentId}/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setNotesinfo(json.notes);
        }
      })
      .catch((error) => {
        console.log('error--->', error);
      });
  }, [isMountedRef, params.studentId]);

  useEffect(() => {
    getNotesinfo();
    getTextbookinfo();
    getGroupsstudentids();
    getStudent();
  }, [getStudent, getGroupsstudentids, getTextbookinfo, getNotesinfo]);

  if (student.length === 0) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.studentDetail)}
    >
      <Container maxWidth={false}>
        <Header
          goBack
          actualPage={formatMessage(intl.studentDetail)}
          buttonRight={{
            icon: (<EditIcon />),
            label: formatMessage(intl.edit),
            to: formatMessage(intl.urlStudentEdit, { studentId: params.studentId }),
          }}
        />
        <Box mt={3}>
          <Details
            student={student}
            groupids={groupids}
            noteinfos={noteinfo}
            textbookinfo={textbookinfo}
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(StudentDetailView);

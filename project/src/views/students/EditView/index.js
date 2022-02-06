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
import StudentEditForm from '../Form/StudentAddEditForm';
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

const StudentEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [student, setStudent] = useState(null);

  const getStudentinfo = useCallback(async () => {
    // httpClient.get(`api/student/3416`)
    httpClient.get(`api/student/${params.studentId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setStudent(json.student[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.studentId]);

  useEffect(() => {
    getStudentinfo();
  }, [getStudentinfo]);

  if (!student) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editStudent)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <div style={{ width: '100%', padding: 20 }}>
          <StudentEditForm
            update
            student={student}
          />
        </div>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(StudentEditView);

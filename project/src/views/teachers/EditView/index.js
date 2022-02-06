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
import TeacherEditForm from '../Form/TeacherAddEditForm';
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

const TeacherEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [teacher, setTeacher] = useState([]);
  const [books, setBooks] = useState([]);
  const [flag, setFlag] = React.useState(false);

  const getTeacher = useCallback(async () => {
    httpClient.get(`api/teacher/edit/${params.teacherId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTeacher(json.datas[0]);
          setBooks(json.books);
          setFlag(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.teacherId]);

  useEffect(() => {
    getTeacher();
  }, [getTeacher]);

  if (!flag) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editTeacher)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth="md">
          <TeacherEditForm
            update
            teacher={teacher}
            books={books}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(TeacherEditView);

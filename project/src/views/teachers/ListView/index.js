import React, {
  useState,
  useEffect,
  useCallback
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
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import moment from 'moment';

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

const TeachersListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [teachers, setTeachers] = useState([]);
  const [totalcount, setTotalcount] = useState(0);

  const deleteTeachers = (selectedTeachers) => {
    let temp = [];
    const eliminatedList = [];
    teachers.forEach((n) => {
      if (!selectedTeachers.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteTeacher(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteTeacher = (id) => {
    httpClient.delete(`api/teacher/${id}`);
    setTeachers((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getTeachers = useCallback(async () => {
    let currentDate = moment(new Date()).format("YYYY-MM-DD");
    let data = { pagenum: 0, limitnum: 10, searchVal: { Date: currentDate, onlyActive: false, name: '' } }
    const url = `api/teacher/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTeachers(json.teachers);
          setTotalcount(json.total);
          console.log('json--->', json)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);


  const handleSearchData = (data) => {
    const url = `api/teacher/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTeachers(json.teachers);
          setTotalcount(json.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.teachers)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.teachers)}
          buttonRight={{ to: formatMessage(intl.urlTeacherAdd), label: 'new Teacher' }}
        />
        <Box mt={3}>
          <Results
            teachers={teachers}
            totalcount={totalcount}
            deleteTeacher={deleteTeacher}
            deleteTeachers={deleteTeachers}
            handleSearchData={handleSearchData}
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TeachersListView);

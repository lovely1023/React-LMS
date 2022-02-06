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
import "src/components/global";
import { useParams } from 'react-router-dom';
import httpClient from 'src/utils/httpClient';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LessonsListView = ({ intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [lessons, setLessons] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const params = useParams();

  const deleteLessons = (selectedLessons) => {
    let temp = [];
    const eliminatedList = [];
    lessons.forEach((n) => {
      if (!selectedLessons.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteLesson(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteLesson = (id) => {
    httpClient.delete(`api/lessons/${id}`);
    setLessons((prevState) => prevState.filter((el) => el.id !== id))
    return id;
  }

  const handleGetData = (pagenum, limitnum) => {
    httpClient.get(`api/lessons/all/${pagenum}/${limitnum}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLessons(json.lessons);
          setTotalcount(json.total)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getLessons = useCallback(async () => {
    httpClient.get(`api/lessons/all/${0}/${10}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLessons(json.lessons);
          setTotalcount(json.total);
          setOpen(false)
          setLoading(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const handleSearchData = (data) => {
    const url = `api/lessons/search`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLessons(json.lessons);
          setTotalcount(json.total)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getPersonLessons = useCallback(async () => {
    httpClient.get(`api/lessons/353`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLessons(json.lessons);
          setTotalcount(json.lessons.length)
          setOpen(false);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    setOpen(!open);
    // getLessons();
    if (params.studentId === '{studentId}')
      getLessons();
    else
      getPersonLessons();
  }, [getLessons]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.lessons)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.lessons)}
          buttonRight={{ to: formatMessage(intl.urlLessonAdd), label: 'new Lesson' }}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                lessons={lessons}
                totalcount={totalcount}
                deleteLesson={deleteLesson}
                deleteLessons={deleteLessons}
                handleGetData={handleGetData}
                handleSearchData={handleSearchData}
                params={params.studentId}
              /> :
              <div>
                <Backdrop className={classes.backdrop} open={open}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
          }
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(LessonsListView);

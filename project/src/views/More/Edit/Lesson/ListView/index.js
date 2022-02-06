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

const LessonListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [lessons, setLessons] = useState([]);

  const deleteLessons = (selectedlessons) => {
    // let temp = [];
    // const eliminatedList = [];
    // lessons.forEach((n) => {
    //   if (!selectedLessons.includes(n.id)) {
    //     temp.push(n)
    //   } else {
    //     eliminatedList.push(deleteLesson(n.id));
    //   }
    // })
    // return eliminatedList;
  }

  const deleteLesson = (id) => {
    // httpClient.delete(`api/lessons/${id}`);
    // setLessons((prevState) => prevState.filter((el) => el.id != id))
    // return id;
  }

  const getLessons = useCallback(async () => {
    try {
      const response = await axios.get(`api/more/lessons/all`);
      if (isMountedRef.current) {
        setLessons(response.data.lessons);
      }
    } catch (err) {
      console.log(err)
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLessons();
  }, [getLessons]);


  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.edit)}
    >
      <Container maxWidth={false}>
        <Header
          // actualPage={formatMessage(intl.lessons)}
          // buttonRight={{ to: formatMessage(intl.urlLessonAdd), label: 'new Lesson' }}
          checkbox={{ value: 'lesson info' }}
        />
        <Box mt={3}>
          <Results
            lessons={lessons}
            deletelesson={deleteLesson}
            deletelessons={deleteLessons}
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

export default connectIntl(mapStateToProps)(LessonListView);

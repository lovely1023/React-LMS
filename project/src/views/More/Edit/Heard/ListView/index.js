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

const HeardListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [heards, setHeards] = useState([]);

  const deleteHeards = (selectedheards) => {
    // let temp = [];
    // const eliminatedList = [];
    // textbooks.forEach((n) => {
    //   if (!selectedTextbooks.includes(n.id)) {
    //     temp.push(n)
    //   } else {
    //     eliminatedList.push(deleteTextbook(n.id));
    //   }
    // })
    // return eliminatedList;
  }

  const deleteHeard = (id) => {
    // httpClient.delete(`api/textbooks/${id}`);
    // setTextbooks((prevState) => prevState.filter((el) => el.id != id))
    // return id;
  }

  const getHeards = useCallback(async () => {
    try {
      const response = await axios.get(`api/more/heards/all`);
      if (isMountedRef.current) {
        setHeards(response.data.heards);
      }
    } catch (err) {
      console.log(err)
    }
  }, [isMountedRef]);

  useEffect(() => {
    getHeards();
  }, [getHeards]);


  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.edit)}
    >
      <Container maxWidth={false}>
        <Header
          checkbox={{ value: 'heard of us' }}
        />
        <Box mt={3}>
          <Results
            heards={heards}
            deleteheard={deleteHeard}
            deleteheards={deleteHeards}
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

export default connectIntl(mapStateToProps)(HeardListView);

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

const LogsListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [logs, setLogs] = useState([]);

  const deleteLogs = (selectedLogs) => {
    // let temp = [];
    // const eliminatedList = [];
    // logs.forEach((n) => {
    //   if (!selectedLogs.includes(n.id)) {
    //     temp.push(n)
    //   } else {
    //     eliminatedList.push(deleteLog(n.id));
    //   }
    // })
    // return eliminatedList;
  }

  const deleteLog = (id) => {
    // httpClient.delete(`api/logs/${id}`);
    // setLogs((prevState) => prevState.filter((el) => el.id != id))
    // return id;
  }

  const getLogs = useCallback(async () => {
    try {
      const response = await axios.get(`api/more/logs/all`);
      if (isMountedRef.current) {
        setLogs(response.data.logs);
      }
    } catch (err) {
      console.log(err)
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLogs();
  }, [getLogs]);


  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.logs)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.logs)}
        />
        <Box mt={3}>
          <Results
            logs={logs}
            deletelog={deleteLog}
            deletelogs={deleteLogs}
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

export default connectIntl(mapStateToProps)(LogsListView);

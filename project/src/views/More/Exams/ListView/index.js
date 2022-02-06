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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import httpClient from 'src/utils/httpClient';
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

const ExamsListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [results, setResults] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [tabvalue, setTabvalue] = React.useState(0)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [examtotalcount, setexamTotalcount] = useState(0);
  const [schemetotalcount, setschemeTotalcount] = useState(0);

  const deleteItems = (selectedItems) => {
    let temp = [];
    const eliminatedList = [];
    results.forEach((n) => {
      if (!selectedItems.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteItem(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteItem = (id) => {
    httpClient.delete(`api/more/exams/${id}`);
    setResults((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const deleteSchemeItems = (selectedItems) => {
    let temp = [];
    const eliminatedList = [];
    results.forEach((n) => {
      if (!selectedItems.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteItem(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteSchemeItem = (id) => {
    httpClient.delete(`api/more/exams/scheme/${id}`);
    setSchemes((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getResults = useCallback(async () => {
    let data = { pagenum: 0, limitnum: 10, searchVal: { name: '' } };
    const url = `api/more/exams/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setResults(json.results);
          setexamTotalcount(json.total);
          setOpen(false)
          setLoading(true)
          setTabvalue(0)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const getSchemes = useCallback(async () => {
    let data = { pagenum: 0, limitnum: 10, searchVal: { name: '' } };
    const url = `api/more/exams/scheme/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setSchemes(json.results);
          setschemeTotalcount(json.total);
          setOpen(false)
          setLoading(true)
          setTabvalue(0)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    setOpen(!open);
    getResults();
  }, [getResults]);

  const handleSearchData = (data, tabflag) => {
    let senddata;
    if (tabflag === 0) {
      senddata = { pagenum: data.pagenum, limitnum: data.limitnum, searchVal: { name: data.searchVal.result_name } };
      const url = `api/more/exams/all`
      const method = 'post';
      httpClient[method](url, senddata)
        .then(json => {
          if (json.success && isMountedRef.current) {
            setResults(json.results);
            setexamTotalcount(json.total);
            setTabvalue(tabflag)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      senddata = { pagenum: data.pagenum, limitnum: data.limitnum, searchVal: { name: data.searchVal.scheme_name } };
      const url = `api/more/exams/scheme/all`
      const method = 'post';
      httpClient[method](url, senddata)
        .then(json => {
          if (json.success && isMountedRef.current) {
            setSchemes(json.results);
            setschemeTotalcount(json.total);
            setTabvalue(tabflag)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.exams)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.exams)}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                results={results}
                schemes={schemes}
                deleteItem={deleteItem}
                deleteItems={deleteItems}
                deleteSchemeItem={deleteSchemeItem}
                deleteSchemeItems={deleteSchemeItems}
                examtotalcount={examtotalcount}
                schemetotalcount={schemetotalcount}
                tabvalue={tabvalue}
                handleSearchData={handleSearchData}
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

export default connectIntl(mapStateToProps)(ExamsListView);

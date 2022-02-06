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

const TextbooksListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [textbooks, setTextbooks] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const deleteTextbooks = (selectedTextbooks) => {
    let temp = [];
    const eliminatedList = [];
    textbooks.forEach((n) => {
      if (!selectedTextbooks.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteTextbook(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteTextbook = (id) => {
    httpClient.delete(`api/textbooks/${id}`);
    setTextbooks((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getTextbooks = useCallback(async () => {
    httpClient.get(`api/textbooks/all/${0}/${10}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTextbooks(json.textbooks);
          setTotalcount(json.total);
          setOpen(false)
          setLoading(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const handleGetData = (pagenum, limitnum) => {
    httpClient.get(`api/textbooks/all/${pagenum}/${limitnum}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTextbooks(json.textbooks);
          setTotalcount(json.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearchData = (data) => {
    const url = `api/textbooks/search`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTextbooks(json.textbooks);
          setTotalcount(json.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setOpen(!open);
    getTextbooks();
  }, [getTextbooks]);


  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.textbooks)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.textbooks)}
          buttonRight={{ to: formatMessage(intl.urlTextbookAdd), label: 'new Textbook' }}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                textbooks={textbooks}
                totalcount={totalcount}
                deleteTextbook={deleteTextbook}
                deleteTextbooks={deleteTextbooks}
                handleSearchData={handleSearchData}
                handleGetData={handleGetData}
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

export default connectIntl(mapStateToProps)(TextbooksListView);

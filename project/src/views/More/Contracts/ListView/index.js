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

const ContractsListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [contracts, setContracts] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const deletecontracts = (selectedTextbooks) => {
    let temp = [];
    const eliminatedList = [];
    contracts.forEach((n) => {
      if (!selectedTextbooks.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deletecontract(n.id));
      }
    })
    return eliminatedList;
  }

  const deletecontract = (id) => {
    httpClient.delete(`api/more/contract/${id}`);
    setContracts((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getContracts = useCallback(async () => {
    let data = { pagenum: 0, limitnum: 10, searchVal: { name: '' } };
    const url = `api/more/contract/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setContracts(json.contracts);
          setTotalcount(json.total);
          setOpen(false)
          setLoading(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    setOpen(true);
    getContracts();
  }, [getContracts]);

  const handleSearchData = (data) => {
    const url = `api/more/contract/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setContracts(json.contracts);
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
      title={formatMessage(intl.contracts)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.contracts)}
          buttonRight={{ to: formatMessage(intl.urlContractAdd), label: 'new Contract' }}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                contracts={contracts}
                totalcount={totalcount}
                deletecontract={deletecontract}
                deletecontracts={deletecontracts}
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

export default connectIntl(mapStateToProps)(ContractsListView);

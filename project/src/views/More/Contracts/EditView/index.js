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
import ContractEditForm from '../Form/ContractAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import httpClient from 'src/utils/httpClient';
import axios from 'src/utils/axios';
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

const ContractEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const getContract = useCallback(async () => {
    httpClient.get(`api/more/contract/${params.contractId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setContract(json.contract);
          setOpen(false);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // try {
    //   const response = await axios.get(`/api/more/contracts/1`);
    //   if (isMountedRef.current) {
    //     setContract(response.data.contract);
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }, [isMountedRef, params.contractId]);

  useEffect(() => {
    getContract();
  }, [getContract]);

  if (!contract) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editContract)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth="md">
          {
            loading ?
              <ContractEditForm update contract={contract} /> :
              <div>
                <Backdrop className={classes.backdrop} open={open}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
          }
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(ContractEditView);

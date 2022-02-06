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

const CertificationListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [certifications, setCertifications] = useState([]);
  const [objTotal, setOBJTotal] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const deleteCertifications = (selectedCertifications) => {
    let temp = [];
    const eliminatedList = [];
    certifications.forEach((n) => {
      if (!selectedCertifications.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteCertification(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteCertification = (id) => {
    httpClient.delete(`api/more/certification/${id}`);
    setCertifications((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getCertifications = useCallback(async () => {
    let data = { pagenum: 0, limitnum: 10, searchVal: { name: '', startdate: '', enddate: '', current: false, certificateId: 0 } }
    const url = `api/more/certification/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setCertifications(json.certifications);
          setOBJTotal(json.objTotal);
          setTotalcount(json.total);
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
    getCertifications();
  }, [getCertifications]);


  const handleSearchData = (data) => {
    const url = `api/more/certification/all`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setCertifications(json.certifications);
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
      title={formatMessage(intl.certifications)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.certifications)}
        // buttonRight={{ to: formatMessage(intl.urlCertificationAdd), label: 'new Certification' }}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                certifications={certifications}
                totalcount={totalcount}
                objTotal={objTotal}
                deleteCertification={deleteCertification}
                deleteCertifications={deleteCertifications}
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

export default connectIntl(mapStateToProps)(CertificationListView);

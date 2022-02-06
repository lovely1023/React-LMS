import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import BillAddForm from '../Form/BillAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';
import httpClient from 'src/utils/httpClient';
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  }
}));

const BillEditView = ({ intl }) => {
  const classes = useStyles();
  const params = useParams();
  const isMountedRef = useIsMountedRef();
  const [studentinfo, setStudentinfo] = useState([]);
  const [commonitems, setCommonItems] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [flag, setFlag] = React.useState(false);

  const getStudentinfo = useCallback(async () => {
    httpClient.get(`api/student/${params.studentId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          var student = json.student[0];
          const urlAPI = 'api/auth/profile';
          var accessToken = window.localStorage.getItem('accessToken');
          httpClient.post(urlAPI, {
            accessToken: accessToken
          })
            .then(json => {
              if (json.success) {
                setStudentinfo(student);
                setUserinfo(json.user[0]);
                getCommonItems();
              }
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.studentId]);

  const getCommonItems = useCallback(async () => {
    httpClient.get(`api/common/all`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setCommonItems(json.commonitems);
          setFlag(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.studentId]);

  useEffect(() => {
    getStudentinfo();
  }, [getStudentinfo]);

  if (!flag) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.addBill)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth={false}>
          <BillAddForm
            studentinfo={studentinfo}
            commonitems={commonitems}
            userinfo={userinfo}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(BillEditView);

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
import ExamEditForm from '../Form/ExamAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* utils */
import httpClient from 'src/utils/httpClient';
import axios from 'src/utils/axios';

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

const ExamEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [result, setResult] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [flag, setFlag] = React.useState(false);

  const getResult = useCallback(async () => {
    if (params.itemType === 'result') {
      httpClient.get(`api/more/exams/${params.itemId}`)
        .then(json => {
          if (json.success && isMountedRef.current) {
            setResult(json.result[0]);
            setSchedules(json.schedules);
            setFlag(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      httpClient.get(`api/more/exams/scheme/${params.itemId}`)
        .then(json => {
          if (json.success && isMountedRef.current) {
            setResult(json.result[0]);
            setFlag(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isMountedRef, params.itemId]);

  useEffect(() => {
    getResult();
  }, [getResult]);

  if (!flag) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editExam)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <ExamEditForm
            update
            result={result}
            schedules={schedules}
            itemType={params.itemType}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(ExamEditView);

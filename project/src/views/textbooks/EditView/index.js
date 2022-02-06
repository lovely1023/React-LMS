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
import TextbookEditForm from '../Form/TextbookAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import httpClient from 'src/utils/httpClient';

/* connectIntl */
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

const TextbookEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [textbook, setTextbook] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const getTextbook = useCallback(async () => {
    httpClient.get(`api/textbooks/perInfo/${params.textbookId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setTextbook(json.textbook[0]);
          setStudents(json.students);
          setOpen(false);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.textbookId]);

  useEffect(() => {
    getTextbook();
  }, [getTextbook]);

  if (!textbook) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editTextbook)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth="md">
          {
            loading ?
              <TextbookEditForm
                update
                textbook={textbook}
                students={students}
              /> :
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

export default connectIntl(mapStateToProps)(TextbookEditView);

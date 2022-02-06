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

const TextbookEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [textbook, setTextbook] = useState(null);

  const getTextbook = useCallback(async () => {
    try {
      const response = await axios.get(`api/textbook/1`);
      if (isMountedRef.current) {
        setTextbook(response.data.textbook);
      }
    } catch (err) {
      console.log(err)
    }
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
          <TextbookEditForm update textbook={textbook} />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(TextbookEditView);

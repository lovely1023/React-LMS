import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ExamAddForm from '../Form/ExamAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';
import { useParams } from 'react-router-dom';

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

const ExamEditView = ({ intl }) => {
  const classes = useStyles();
  const params = useParams();

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.addExam)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth="md">
          <ExamAddForm itemType={params.itemType} />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(ExamEditView);

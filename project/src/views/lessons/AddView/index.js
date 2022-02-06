import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import LessonAddForm from '../Form/LessonAddEditForm';
import Header from 'src/components/HeaderBreadcrumbs';

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

const LessonEditView = ({ intl }) => {
  const classes = useStyles();
  const [textbooks, setTextbooks] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [topics, setTopics] = React.useState([]);

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.addLesson)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth={false}>
          <LessonAddForm
            textbooks={textbooks}
            students={students}
            topics={topics}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(LessonEditView);

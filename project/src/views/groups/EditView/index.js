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
import GroupEditForm from '../Form/GroupAddEditForm';
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

const GroupEditView = ({ match, intl }) => {
  const params = useParams();
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [group, setGroup] = useState(null);
  const [students, setStudents] = useState([]);

  const getGroup = useCallback(async () => {
    httpClient.get(`api/group/${params.groupId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setGroup(json.group[0]);
          getStudents();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.groupId]);

  const getStudents = useCallback(async () => {
    httpClient.get(`api/pergroupsstudents/${params.groupId}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setStudents(json.students);
          console.log('json.lesson[0]--->', json.students);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef, params.groupId]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  if (!group) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.editGroup)}
    >
      <Container maxWidth={false}>
        <Header goBack />
      </Container>
      <Box mt={3}>
        <Container maxWidth={false}>
          <GroupEditForm
            update
            group={group}
            students={students}
          />
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(GroupEditView);

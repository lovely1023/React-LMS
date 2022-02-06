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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
/* utils */
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

const GroupsListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [groups, setGroups] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const deleteGroups = (selectedGroups) => {
    let temp = [];
    const eliminatedList = [];
    groups.forEach((n) => {
      if (!selectedGroups.includes(n.id)) {
        temp.push(n)
      } else {
        eliminatedList.push(deleteGroup(n.id));
      }
    })
    return eliminatedList;
  }

  const deleteGroup = (id) => {
    httpClient.delete(`api/group/${id}`);
    setGroups((prevState) => prevState.filter((el) => el.id != id))
    return id;
  }

  const getGroups = useCallback(async () => {
    httpClient.get(`api/group/all/${0}/${10}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setGroups(json.groups);
          setTotalcount(json.total)
          setOpen(false);
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isMountedRef]);

  const handleGetData = (pagenum, limitnum) => {
    httpClient.get(`api/group/all/${pagenum}/${limitnum}`)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setGroups(json.groups);
          setTotalcount(json.total)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearchData = (data) => {
    const url = `api/group/search`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setGroups(json.groups);
          setTotalcount(json.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setOpen(!open);
    getGroups();
  }, [getGroups]);


  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.groups)}
    >
      <Container maxWidth={false}>
        <Header
          actualPage={formatMessage(intl.groups)}
          buttonRight={{ to: formatMessage(intl.urlGroupAdd), label: 'new Group' }}
        />
        <Box mt={3}>
          {
            loading ?
              <Results
                groups={groups}
                totalcount={totalcount}
                deleteGroup={deleteGroup}
                deleteGroups={deleteGroups}
                handleGetData={handleGetData}
                handleSearchData={handleSearchData}
              />
              :
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

export default connectIntl(mapStateToProps)(GroupsListView);

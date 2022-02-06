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
  }
}));

const LevelListView = ({ intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [levels, setLevels] = useState([]);

  const deleteLevels = (selectedlevels) => {
    // let temp = [];
    // const eliminatedList = [];
    // levels.forEach((n) => {
    //   if (!selectedLevels.includes(n.id)) {
    //     temp.push(n)
    //   } else {
    //     eliminatedList.push(deleteLevel(n.id));
    //   }
    // })
    // return eliminatedList;
  }

  const deleteLevel = (id) => {
    // httpClient.delete(`api/levels/${id}`);
    // setLevels((prevState) => prevState.filter((el) => el.id != id))
    // return id;
  }

  const getLevels = useCallback(async () => {
    try {
      const response = await axios.get(`api/more/levels/all`);
      if (isMountedRef.current) {
        setLevels(response.data.levels);
      }
    } catch (err) {
      console.log(err)
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLevels();
  }, [getLevels]);


  return (
    <Page
      className={classes.root}
      title={formatMessage(intl.edit)}
    >
      <Container maxWidth={false}>
        <Header
          // actualPage={formatMessage(intl.levels)}
          // buttonRight={{ to: formatMessage(intl.urlLevelAdd), label: 'new Level' }}
          checkbox={{ value: 'levels' }}
        />
        <Box mt={3}>
          <Results
            levels={levels}
            deletelevel={deleteLevel}
            deletelevels={deleteLevels}
          />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(LevelListView);

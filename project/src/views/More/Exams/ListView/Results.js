import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  Button,
  SvgIcon,
  Checkbox,
  TableRow,
  useTheme,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  makeStyles,
  IconButton,
  TablePagination,
  InputAdornment,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Search as SearchIcon
} from 'react-feather';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import {
  handleDelete,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';
import { useSnackbar } from 'notistack';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  datePicker: {
    width: 230
  },
  boldLetter: {
    fontWeight: 'bold',
    marginRight: 10
  },
  rowDiv: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  rowsubDiv: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  }
}));

const Results = ({
  intl,
  results,
  schemes,
  tabvalue,
  className,
  examtotalcount,
  schemetotalcount,
  deleteItem,
  deleteItems,
  deleteSchemeItem,
  deleteSchemeItems,
  handleSearchData
}) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [result_page, setResultPage] = useState(0);
  const [result_limit, setResultLimit] = useState(10);
  const [scheme_page, setSchemePage] = useState(0);
  const [scheme_limit, setSchemeLimit] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setValue] = React.useState(0);
  const [searchVals, setSearchvals] = React.useState({
    result_name: '',
    scheme_name: ''
  })

  const handleChangeSearchVal = (name, event) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'result':
        newdata.result_name = event.target.value;
        break;
      case 'scheme':
        newdata.scheme_name = event.target.value;
        break;
    }
    setSearchvals(newdata)
  };

  useEffect(() => {
    let data = { pagenum: 0, limitnum: 10, searchVal: searchVals };
    handleSearchData(data, tabvalue);
  }, [searchVals])

  useEffect(() => {
    setValue(tabvalue);
  }, [results, tabvalue])

  const handleChange = (event, newValue) => {
    let data = {
      pagenum: 0, limitnum: 10,
      searchVal: {
        result_name: '',
        scheme_name: ''
      }
    };
    handleSearchData(data, newValue);
  };

  const handleChangeIndex = (index) => {
    let data = {
      pagenum: 0, limitnum: 10,
      searchVal: {
        result_name: '',
        scheme_name: ''
      }
    };
    handleSearchData(data, index);
  };

  const handleSelectAllItems = (event) => {
    setSelectedItems(event.target.checked
      ? results.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedItems.includes(newId)) {
      setSelectedItems((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChangeResults = (event, newPage) => {
    setResultPage(newPage);
    let data = { searchVal: searchVals, pagenum: parseInt(newPage + '0'), limitnum: result_limit }
    handleSearchData(data, tabvalue)
  };

  const handleLimitChangeResults = (event) => {
    setResultLimit(parseInt(event.target.value));
    let data = { searchVal: searchVals, pagenum: result_page, limitnum: event.target.value }
    handleSearchData(data, tabvalue)
  };

  const handlePageChangeScheme = (event, newPage) => {
    setSchemePage(newPage);
    let data = { searchVal: searchVals, pagenum: parseInt(newPage + '0'), limitnum: scheme_limit }
    handleSearchData(data, tabvalue)
  };

  const handleLimitChangeScheme = (event) => {
    setSchemeLimit(parseInt(event.target.value));
    let data = { searchVal: searchVals, pagenum: scheme_page, limitnum: event.target.value }
    handleSearchData(data, tabvalue)
  };

  const enableBulkOperations = selectedItems.length > 0;
  const selectedSomeItems = selectedItems.length > 0 && selectedItems.length < results.length;
  const selectedAllItems = selectedItems.length === results.length;

  const handleParse = (param) => {
    let str = '';
    JSON.parse(param).map((val, index) => {
      str += val.outOf;
      str += ' ';
      str += val.name;
      str += ' ';
    })
    return str;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Results" {...a11yProps(0)} style={{ fontWeight: 'bold' }} />
          <Tab label="Marking schemes" {...a11yProps(1)} style={{ fontWeight: 'bold' }} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Card className={clsx(classes.root, className)}>
            <Box p={2} alignItems="center" >
              <TextField
                className={classes.queryField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                value={searchVals.result_name}
                variant="outlined"
                onChange={(e) => handleChangeSearchVal('result', e)}
                placeholder={formatMessage(intl.search)}
              />
              <Button
                color="secondary"
                variant="contained"
                style={{ marginLeft: 10 }}
                component={RouterLink}
                to={formatMessage(intl.urlMoreExamsAdd, { itemType: 'result' })}
              >
                New
              </Button>
            </Box>
            {enableBulkOperations && (
              <div className={classes.bulkOperations}>
                <div className={classes.bulkActions}>
                  <Checkbox
                    checked={selectedAllItems}
                    onChange={handleSelectAllItems}
                    indeterminate={selectedSomeItems}
                  />
                  <Button
                    variant="outlined"
                    className={classes.bulkAction}
                    onClick={() => handleDeleteAllSelected(
                      selectedItems,
                      deleteItems,
                      setSelectedItems,
                      enqueueSnackbar,
                      { ...intl, formatMessage }
                    )}
                  >
                    {formatMessage(intl.deleteAll)}
                  </Button>
                </div>
              </div>
            )}
            <PerfectScrollbar>
              <Box minWidth={700}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllItems}
                          onChange={handleSelectAllItems}
                          indeterminate={selectedSomeItems}
                        />
                      </TableCell>

                      <TableCell align="center">
                        Date
                      </TableCell>

                      <TableCell align="center">
                        Teacher
                      </TableCell>

                      <TableCell align="center">
                        Exam
                      </TableCell>

                      <TableCell align="center">
                        Group
                      </TableCell>

                      <TableCell align="center">
                        Status
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((n, index) => {
                      const isItemselected = selectedItems.includes(n.id);

                      return (
                        <TableRow
                          hover
                          key={index}
                          selected={isItemselected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemselected}
                              onChange={(event) => handleSelectOneNew(event, n.id)}
                              value={isItemselected}
                            />
                          </TableCell>

                          <TableCell align="center">
                            {n.examDate}
                          </TableCell>

                          <TableCell align="center">
                            {n.teachername}
                          </TableCell>

                          <TableCell align="center">
                            {n.name}
                          </TableCell>

                          <TableCell align="center">
                            {n.groupname}
                          </TableCell>

                          <TableCell align="center">
                            <IconButton
                              title="Edit"
                              component={RouterLink}
                              to={formatMessage(intl.urlMoreExamsEdit, { itemId: n.id, itemType: 'result' })}
                            >
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(
                                n.id,
                                deleteItem,
                                enqueueSnackbar,
                                { ...intl, formatMessage }
                              )}
                              title="Delete"
                            >
                              <SvgIcon fontSize="small">
                                <HighlightOffIcon />
                              </SvgIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={examtotalcount}
              onChangePage={handlePageChangeResults}
              onChangeRowsPerPage={handleLimitChangeResults}
              page={result_page}
              rowsPerPage={result_limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </TabPanel>

        {/* start schema part */}

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Card className={clsx(classes.root, className)} >
            <Box p={2} alignItems="center" display="flex" >
              <TextField
                className={classes.queryField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                value={searchVals.scheme_name}
                variant="outlined"
                onChange={(e) => handleChangeSearchVal('scheme', e)}
                placeholder={formatMessage(intl.search)}
              />
              <Button
                color="secondary"
                variant="contained"
                style={{ marginLeft: 10 }}
                component={RouterLink}
                to={formatMessage(intl.urlMoreExamsAdd, { itemType: 'schemes' })}
              >
                New
              </Button>
            </Box>
            {enableBulkOperations && (
              <div className={classes.bulkOperations}>
                <div className={classes.bulkActions}>
                  <Checkbox
                    checked={selectedAllItems}
                    onChange={handleSelectAllItems}
                    indeterminate={selectedSomeItems}
                  />
                  <Button
                    variant="outlined"
                    className={classes.bulkAction}
                    onClick={() => handleDeleteAllSelected(
                      selectedItems,
                      deleteSchemeItems,
                      setSelectedItems,
                      enqueueSnackbar,
                      { ...intl, formatMessage }
                    )}
                  >
                    {formatMessage(intl.deleteAll)}
                  </Button>
                </div>
              </div>
            )}
            <PerfectScrollbar>
              <Box minWidth={700}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllItems}
                          onChange={handleSelectAllItems}
                          indeterminate={selectedSomeItems}
                        />
                      </TableCell>

                      <TableCell align="center">
                        Marking Scheme
                      </TableCell>

                      <TableCell align="center">
                        Sections
                      </TableCell>

                      <TableCell align="center">
                        Status
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schemes.map((n, index) => {
                      const isItemselected = selectedItems.includes(n.id);

                      return (
                        <TableRow
                          hover
                          key={index}
                          selected={isItemselected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemselected}
                              onChange={(event) => handleSelectOneNew(event, n.id)}
                              value={isItemselected}
                            />
                          </TableCell>

                          <TableCell align="center">
                            {n.name}
                          </TableCell>

                          <TableCell align="center">
                            {handleParse(n.scheme)}
                          </TableCell>

                          <TableCell align="center">
                            <IconButton
                              component={RouterLink}
                              to={formatMessage(intl.urlMoreExamsEdit, { itemId: n.id, itemType: 'schemes' })}
                              title="Edit"
                            >
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(
                                n.id,
                                deleteSchemeItem,
                                enqueueSnackbar,
                                { ...intl, formatMessage }
                              )}
                              title="Delete"
                            >
                              <SvgIcon fontSize="small">
                                <HighlightOffIcon />
                              </SvgIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={schemetotalcount}
              onChangePage={handlePageChangeScheme}
              onChangeRowsPerPage={handleLimitChangeScheme}
              page={scheme_page}
              rowsPerPage={scheme_limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array.isRequired,
  schemes: PropTypes.array.isRequired,
  tabvalue: PropTypes.number,
  examtotalcount: PropTypes.number,
  schemetotalcount: PropTypes.number
};

Results.defaultProps = {
  results: [],
  schemes: [],
  tabvalue: 0,
  examtotalcount: 0,
  schemetotalcount: 0
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

const mapDispatchToProps = (dispatch) => ({
  // 
})

export default connectIntl(
  mapStateToProps,
  mapDispatchToProps
)(Results);

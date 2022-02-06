import React, { useState } from 'react';
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
  TableBody,
  TableCell,
  TableHead,
  TextField,
  makeStyles,
  IconButton,
  TablePagination,
} from '@material-ui/core';
import {
  Search as SearchIcon
} from 'react-feather';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/* utils */
import {
  applySort,
  applyFilters,
  applyPagination,
  sortOptionsDefault,
} from 'src/utils/defaultTableSettings';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const users = [
  { name: 'Alfredo' },
  { name: 'AutoSender' },
  { name: 'Ben' },
  { name: 'Danni' },
  { name: 'Jaime' },
];

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
  logs,
  className,
  deletelog,
  deletelogs,
}) => {
  const classes = useStyles();
  const [filters] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectAllLogs = (event) => {
    setSelectedLogs(event.target.checked
      ? logs.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedLogs.includes(newId)) {
      setSelectedLogs((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedLogs((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredLogs = applyFilters(logs, query, filters);
  const sortedLogs = applySort(filteredLogs, sort);
  const paginatedLogs = applyPagination(sortedLogs, page, limit);
  const enableBulkOperations = selectedLogs.length > 0;
  const selectedSomeLogs = selectedLogs.length > 0 && selectedLogs.length < logs.length;
  const selectedAllLogs = selectedLogs.length === logs.length;

  return (
    <Card className={clsx(classes.root, className)} >
      <Box p={2} alignItems="center" >
        <div className={classes.rowDiv}>
          <div className={classes.rowsubDiv}>
            <div className={classes.boldLetter}>From:</div>
            <KeyboardDatePicker
              className={classes.datePicker}
              format="MM/DD/YYYY"
              name="enrolled"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className={classes.rowsubDiv}>
            <div className={classes.boldLetter}>To:</div>
            <KeyboardDatePicker
              className={classes.datePicker}
              format="MM/DD/YYYY"
              name="enrolled"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className={classes.rowsubDiv}>
            <div className={classes.boldLetter}>User:</div>
            <Autocomplete
              id="user"
              options={users}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </div>
        </div>

        <div className={classes.rowDiv}>
          <div className={classes.rowsubDiv}>
            <Button variant="contained" color="primary">
              View Selected
            </Button>
          </div>
          <div className={classes.rowsubDiv}>
            <div className={classes.boldLetter}>Teacher:</div>
            <Autocomplete
              id="teacher"
              options={users}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </div>
        </div>

        <div className={classes.rowDiv} style={{ justifyContent: 'unset' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="log_student"
                color="primary"
              />
            }
            label="Log for current student"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="log_lesson"
                color="primary"
              />
            }
            label="Log for current lesson"
          />
        </div>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllLogs}
              onChange={handleSelectAllLogs}
              indeterminate={selectedSomeLogs}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            // onClick={() => handleDeleteAllSelected(
            //   selectedLogs,
            //   deleteLogs,
            //   setSelectedLogs,
            //   enqueueSnackbar,
            //   { ...intl, formatMessage }
            // )}
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
                    checked={selectedAllLogs}
                    onChange={handleSelectAllLogs}
                    indeterminate={selectedSomeLogs}
                  />
                </TableCell>

                <TableCell align="center">
                  Date
                </TableCell>

                <TableCell align="center">
                  Time
                </TableCell>

                <TableCell align="center">
                  User
                </TableCell>

                <TableCell align="center">
                  Entry
                </TableCell>

                <TableCell align="center">
                  Status
								</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLogs.map((n, index) => {
                const isLogselected = selectedLogs.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isLogselected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isLogselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isLogselected}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {n.date}
                    </TableCell>

                    <TableCell align="center">
                      {n.time}
                    </TableCell>

                    <TableCell align="center">
                      {n.user}
                    </TableCell>

                    <TableCell align="center">
                      {n.entry}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        component={RouterLink}
                        // to={formatMessage(intl.urlLogDetail, { logId: n.id })}
                        title="Detail"
                      >
                        <SvgIcon fontSize="small">
                          <SearchIcon />
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
        count={filteredLogs.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  logs: PropTypes.array.isRequired
};

Results.defaultProps = {
  logs: []
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

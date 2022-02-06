import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
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
  InputAdornment,
  TablePagination,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Search as SearchIcon
} from 'react-feather';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'src/components/global';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker'
import moment from 'moment';
/* utils */
import {
  handleDelete,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

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
  calendar: {
    "@media (max-width: 599px)": { width: '100% !important' },
  }
}));

const Results = ({
  intl,
  teachers,
  className,
  deleteTeacher,
  deleteTeachers,
  handleSearchData,
  totalcount
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchVals, setSearchvals] = React.useState({
    Date: moment(new Date()).format("YYYY-MM-DD"),
    onlyActive: false,
    name: ''
  })

  const handleSearchChange = (name, event) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'name':
        newdata.name = event.target.value;
        break;
      case 'onlyActive':
        newdata.onlyActive = event;
        break;
      case 'Date':
        newdata.Date = moment(event).format("YYYY-MM-DD");
        break;
    }
    console.log(newdata)
    setSearchvals(newdata)
  };

  useEffect(() => {
    if (searchVals.name === '' && searchVals.onlyActive === false) {
      let data = { pagenum: 0, limitnum: 10, searchVal: { Date: searchVals.Date, onlyActive: false, name: '' } };
      handleSearchData(data)
    }
    else {
      let data = { pagenum: 0, limitnum: 10, searchVal: searchVals };
      handleSearchData(data);
    }
  }, [searchVals])

  const handleSelectAllTeachers = (event) => {
    setSelectedTeachers(event.target.checked
      ? teachers.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedTeachers.includes(newId)) {
      setSelectedTeachers((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedTeachers((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVal: searchVals, pagenum: parseInt(newPage + '0'), limitnum: limit }
    handleSearchData(data)
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVal: searchVals, pagenum: page, limitnum: event.target.value }
    handleSearchData(data)
  };

  const enableBulkOperations = selectedTeachers.length > 0;
  const selectedSomeTeachers = selectedTeachers.length > 0 && selectedTeachers.length < teachers.length;
  const selectedAllTeachers = selectedTeachers.length === teachers.length;

  const [value, setValue] = React.useState(new Date());

  const handleChangeCalender = (date) => {
    setValue(date);
  }

  const handleViewDetail = (id) => {
    global.teacherSearchVal = searchVals;
    history.push(formatMessage(intl.urlTeacherDetail, { teacherId: id }))
  }

  return (
    <Card className={clsx(classes.root, className)} >
      <Box p={2} minHeight={56} display="flex" flexWrap='wrap' alignItems="center" >
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
          variant="outlined"
          value={searchVals.name}
          onChange={(e) => handleSearchChange('name', e)}
          placeholder={formatMessage(intl.search)}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="only_active"
              color="primary"
              style={{ marginLeft: 10 }}
              onChange={() => { handleSearchChange("onlyActive", !searchVals.onlyActive) }}
              checked={searchVals.onlyActive}
            />
          }
          label="Only active"
        />
        <DatePicker
          onChange={handleChangeCalender}
          value={value}
          onClickDay={(value) => { handleSearchChange("Date", value) }}
          onClickMonth={(value) => { handleSearchChange("Date", value) }}
        />
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllTeachers}
              onChange={handleSelectAllTeachers}
              indeterminate={selectedSomeTeachers}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => handleDeleteAllSelected(
                selectedTeachers,
                deleteTeachers,
                setSelectedTeachers,
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
                    checked={selectedAllTeachers}
                    onChange={handleSelectAllTeachers}
                    indeterminate={selectedSomeTeachers}
                  />
                </TableCell>

                <TableCell align="center">
                  Name
                </TableCell>

                <TableCell align="center">
                  Total (taught and leave + scheduled)
                </TableCell>

                <TableCell align="center">
                  Projection
                </TableCell>

                <TableCell align="center">
                  Active
                </TableCell>

                <TableCell align="center">
                  Status
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((n, index) => {
                const isTeacherselected = selectedTeachers.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isTeacherselected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isTeacherselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isTeacherselected}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {n.name}
                    </TableCell>

                    <TableCell align="center">
                      {`(${n.totalhours}+0) ${n.totalhours + 0} / ${n.expected} (${Math.floor(n.hoursleft)} left)`}
                    </TableCell>

                    <TableCell align="center">
                      {n.totalhours + 0 + n.expected}
                    </TableCell>

                    <TableCell align="center">
                      {n.status & 1 ? "x" : ""}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        component={RouterLink}
                        // to={formatMessage(intl.urlTeacherDetail, { teacherId: { id: n.id, searchVal: searchVals } })}
                        title="Detail"
                        onClick={() => { handleViewDetail(n.id) }}
                      >
                        <SvgIcon fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlTeacherEdit, { teacherId: n.id })}
                        title="Edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(
                          n.id,
                          deleteTeacher,
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
        count={totalcount}
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
  teachers: PropTypes.array.isRequired
};

Results.defaultProps = {
  teachers: []
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

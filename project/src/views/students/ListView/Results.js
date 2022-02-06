import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  TablePagination,
  withStyles
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  applySort,
  handleDelete,
  applyFilters,
  applyPagination,
  sortOptionsDefault,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import FixedTextField from 'src/components/FixedTextField'
import Menu from 'src/components/Studentmenu'
import 'src/components/global';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  getLevels,
  getAllLevels,
  getHowdidyouhear,
  getAllHowdidyouhear,
  getGroups,
  getAllGroups
} from 'src/localstorage';

var { global_levels } = getLevels();
var { global_howdidyouhear } = getHowdidyouhear();
var { global_allhowdidyouhear } = getAllHowdidyouhear();
var { global_groups } = getGroups();
var { global_allgroups } = getAllGroups();
var { global_alllevels } = getAllLevels();

const CssTextField = withStyles({
  root: {
    '& label': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '150%',
      alignItems: 'center',
      textAlign: 'center',

      color: '#333',
      transform: 'translate(22px, 16px) scale(1)'
    },

    '& label.Mui-focused': {
      color: '#333',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid#333',
        borderRadius: '5px',
        height: 50
      },
      '&:hover fieldset': {
        borderColor: '#333',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#333',
      },
    },
  },
})(FixedTextField);

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
  row_container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  rowDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  boldletter: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  width150: {
    height: 50,
    width: 250,
    marginRight: 20,
    "@media (max-width: 661px)": { width: '200px !important' }
  }
}));

const Results = ({
  intl,
  students,
  totalcount,
  className,
  deleteStudent,
  deleteStudents,
  handleGetData,
  handleSearchData,
}) => {
  const classes = useStyles();
  const [filters] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const [searchVals, setSearchvals] = React.useState({
    name: '',
    postcode: '',
    level: '',
    enrolled: '',
    group: '',
    heard: '',
    active: true,
    inactive: false,
    finished: false,
    idle: false,
    pending: false
  });
  const [level, setLevel] = React.useState('')
  const [group, setGroup] = React.useState('')
  const [heard, setHeard] = React.useState('')

  const [weekVals, setWeekvals] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false
  });

  useEffect(() => {
    let data = { searchVals: searchVals, daysofweekNum: handlegetWeekdays(), pagenum: 0, limitnum: 10 }
    if (searchVals.name === '' && searchVals.postcode === '' && searchVals.level === '' && searchVals.enrolled === '' && searchVals.group === '' && searchVals.heard === '' && searchVals.pending === false && handlegetWeekdays() === 0 && searchVals.active === false && searchVals.inactive === false && searchVals.finished === false && searchVals.idle === false && weekVals.monday === false && weekVals.tuesday === false && weekVals.wednesday === false && weekVals.thursday === false && weekVals.friday === false && weekVals.saturday === false) {
      handleGetData(0, 10)
    }
    else
      handleSearchData(data);
  }, [searchVals, weekVals])

  const handleChangeWeekvals = (name, value) => {
    setWeekvals({ ...weekVals, [name]: value });
  };

  const handlegetWeekdays = () => {
    let daysofweekNum = 0;
    if (weekVals.monday) {
      daysofweekNum += 16;
    }
    if (weekVals.tuesday) {
      daysofweekNum += 8;
    }
    if (weekVals.wednesday) {
      daysofweekNum += 4;
    }
    if (weekVals.thursday) {
      daysofweekNum += 2;
    }
    if (weekVals.friday) {
      daysofweekNum += 1;
    }
    if (weekVals.saturday) {
      daysofweekNum = 32;
    }

    return daysofweekNum;
  }

  const handleChangeSearchvals = (name, value) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'name':
        newdata.name = value.target.value;
        break;
      case 'postcode':
        newdata.postcode = value.target.value;
        break;
      case 'enrolled':
        newdata.enrolled = value;
        break;
      case 'active':
        newdata.active = value;
        newdata.inactive = false;
        break;
      case 'inactive':
        newdata.active = false;
        newdata.finished = false;
        newdata.idle = false;
        newdata.inactive = value;
        break;
      case 'finished':
        newdata.active = true;
        newdata.inactive = false;
        newdata.finished = value;
        break;
      case 'idle':
        newdata.active = true;
        newdata.inactive = false;
        newdata.idle = value;
        break;
      case 'pending':
        newdata.pending = value;
        break;
      case 'level':
        let data = global.Allclassis.length !== 0 ? global.Allclassis : JSON.parse(global_alllevels);
        if (value !== null) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === value) {
              setLevel(value);
              newdata.level = data[i].id
            }
          }
        } else {
          newdata.level = '';
          setLevel(value);
        }
        break;
      case 'group':
        let groupdata = global.Allgroups.length !== 0 ? global.Allgroups : JSON.parse(global_allgroups);
        if (value !== null) {
          for (let i = 0; i < groupdata.length; i++) {
            if (groupdata[i].name === value) {
              setGroup(value);
              newdata.group = groupdata[i].id;
            }
          }
        } else {
          newdata.group = '';
          setGroup(value);
        }
        break;
      case 'heard':
        let hearddata = global.Allhowdidyouhear.length !== 0 ? global.Allhowdidyouhear : JSON.parse(global_allhowdidyouhear);
        if (value !== null) {
          for (let i = 0; i < hearddata.length; i++) {
            if (hearddata[i].name === value) {
              setHeard(value);
              newdata.heard = hearddata[i].id
            }
          }
        } else {
          newdata.heard = '';
          setGroup(value);
        }
        break;
    }
    setSearchvals(newdata)
  };

  const handleSelectAllStudents = (event) => {
    setSelectedStudents(event.target.checked
      ? students.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedStudents.includes(newId)) {
      setSelectedStudents((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedStudents((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVals: searchVals, daysofweekNum: handlegetWeekdays(), pagenum: parseInt(newPage + '0'), limitnum: limit }
    if (searchVals.name !== '' || searchVals.postcode !== '' || searchVals.level !== '' || searchVals.enrolled !== '' || searchVals.group !== '' || searchVals.heard !== '' || searchVals.pending !== false || handlegetWeekdays() !== 0)
      handleSearchData(data);
    else
      handleGetData(parseInt(newPage + '0'), limit);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVals: searchVals, daysofweekNum: handlegetWeekdays(), pagenum: page, imitnum: event.target.value }
    if (searchVals.name !== '' || searchVals.postcode !== '' || searchVals.level !== '' || searchVals.enrolled !== '' || searchVals.group !== '' || searchVals.heard !== '' || searchVals.pending !== false || handlegetWeekdays() !== 0)
      handleSearchData(data);
    else
      handleGetData(page, event.target.value);
  };

  const filteredStudents = applyFilters(students, query, filters);
  const sortedStudents = applySort(filteredStudents, sort);
  const paginatedStudents = applyPagination(sortedStudents, page, limit);
  const enableBulkOperations = selectedStudents.length > 0;
  const selectedSomeStudents = selectedStudents.length > 0 && selectedStudents.length < students.length;
  const selectedAllStudents = selectedStudents.length === students.length;

  return (
    <Card className={clsx(classes.root, className)}>
      <Box p={2} minHeight={56} display="flex" alignItems="center" justifyContent='space-between' >
        <div id="alert-dialog-description">
          <div className={classes.row_container}>
            <div className={classes.rowDiv}>
              <div className={classes.boldletter}>Search students:</div>
              <CssTextField
                name="searchVal"
                className={classes.width150}
                variant="outlined"
                value={searchVals.name}
                onChange={(e) => handleChangeSearchvals('name', e)}
              />
            </div>
            <div className={classes.rowDiv}>
              <div className={classes.boldletter}>Postcode:</div>
              <CssTextField
                name="postcode"
                className={classes.width150}
                style={{ width: 100 }}
                variant="outlined"
                value={searchVals.postcode}
                onChange={(e) => handleChangeSearchvals('postcode', e)}
              />
            </div>
          </div>

          <div className={classes.row_container}>
            <div className={classes.rowDiv}>
              <div className={classes.boldletter}>Level:</div>
              <Autocomplete
                id="level"
                options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                getOptionLabel={(option) => option}
                className={classes.width150}
                renderInput={(params) => <CssTextField {...params} variant="outlined" />}
                value={level}
                onChange={(event, value) => { handleChangeSearchvals('level', value) }}
              />
            </div>
            <div className={classes.rowDiv}>
              <div className={classes.boldletter}>enrolled since:</div>
              <KeyboardDatePicker
                format="MM/DD/YYYY"
                name="startdate"
                className={classes.width150}
                value={searchVals.enrolled}
                onChange={(date) => handleChangeSearchvals('enrolled', date)}
              />
            </div>
          </div>

          <div className={classes.row_container}>
            <div className={classes.rowDiv}>
              <div className={classes.boldletter}>Group:</div>
              <Autocomplete
                id="group"
                options={global.groups.length !== 0 ? global.groups : JSON.parse(global_groups)}
                getOptionLabel={(option) => option}
                className={classes.width150}
                renderInput={(params) => <CssTextField {...params} variant="outlined" />}
                value={group}
                onChange={(event, value) => { handleChangeSearchvals('group', value) }}
              />
            </div>
            <div className={classes.rowDiv}>
              <div className={classes.boldletter}>Heard of us:</div>
              <Autocomplete
                id="heard"
                options={global.howdidyouhear.length !== 0 ? global.howdidyouhear : JSON.parse(global_howdidyouhear)}
                getOptionLabel={(option) => option}
                className={classes.width150}
                renderInput={(params) => <CssTextField {...params} variant="outlined" />}
                value={heard}
                onChange={(event, value) => { handleChangeSearchvals('heard', value) }}
              />
            </div>
          </div>
          <div className={classes.row_container}>
            <FormControlLabel
              control={
                <Checkbox
                  name="active"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("active", !searchVals.active) }}
                  checked={searchVals.active}
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="inactive"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("inactive", !searchVals.inactive) }}
                  checked={searchVals.inactive}
                />
              }
              label="Inactive"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="finished"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("finished", !searchVals.finished) }}
                  checked={searchVals.finished}
                />
              }
              label="Finished"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="idle"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("idle", !searchVals.idle) }}
                  checked={searchVals.idle}
                />
              }
              label="Idle"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="mon"
                  color="primary"
                  onChange={() => { handleChangeWeekvals("monday", !weekVals.monday) }}
                  checked={weekVals.monday}
                />
              }
              label="Mon"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="tue"
                  color="primary"
                  onChange={() => { handleChangeWeekvals("tuesday", !weekVals.tuesday) }}
                  checked={weekVals.tuesday}
                />
              }
              label="Tue"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wed"
                  color="primary"
                  onChange={() => { handleChangeWeekvals("wednesday", !weekVals.wednesday) }}
                  checked={weekVals.wednesday}
                />
              }
              label="Wed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="thu"
                  color="primary"
                  onChange={() => { handleChangeWeekvals("thursday", !weekVals.thursday) }}
                  checked={weekVals.thursday}
                />
              }
              label="Thur"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="fri"
                  color="primary"
                  onChange={() => { handleChangeWeekvals("friday", !weekVals.friday) }}
                  checked={weekVals.friday}
                />
              }
              label="Fri"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="sat"
                  color="primary"
                  onChange={() => { handleChangeWeekvals("saturday", !weekVals.saturday) }}
                  checked={weekVals.saturday}
                />
              }
              label="Sat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="pending"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("pending", !searchVals.pending) }}
                  checked={searchVals.pending}
                />
              }
              label="payment pending"
            />
          </div>
        </div>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllStudents}
              onChange={handleSelectAllStudents}
              indeterminate={selectedSomeStudents}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => handleDeleteAllSelected(
                selectedStudents,
                deleteStudents,
                setSelectedStudents,
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
                    checked={selectedAllStudents}
                    onChange={handleSelectAllStudents}
                    indeterminate={selectedSomeStudents}
                  />
                </TableCell>

                <TableCell align="center">
                  First Name
                </TableCell>

                <TableCell align="center">
                  Last Name
                </TableCell>

                <TableCell align="center">
                  {searchVals.active ? 'Hours left' : 'Level'}
                </TableCell>

                <TableCell align="center">
                  {searchVals.active ? 'Days left' : 'End Date'}
                </TableCell>

                <TableCell align="center">
                  Status
								</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((n) => {
                const isStudentselected = selectedStudents.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={n.id}
                    selected={isStudentselected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isStudentselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isStudentselected}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {n.pending === "Y" ? `[PENDING] ${n.firstName}` : n.firstName}
                    </TableCell>

                    <TableCell align="center">
                      {n.lastName}
                    </TableCell>

                    <TableCell align="center" style={searchVals.active ? n.hoursLeft.substr(0, n.hoursLeft.search(".0")) < 10 && n.hoursLeft.substr(0, n.hoursLeft.search(".0")) >= 0 ? { color: '#ffa500' } : n.hoursLeft.substr(0, n.hoursLeft.search(".0")) < 0 ? { color: '#ff0000' } : { color: '#0b9a09' } : null}>
                      {searchVals.active ? n.hoursLeft.substr(0, n.hoursLeft.search(".0")) : n.LEVEL}
                    </TableCell>

                    <TableCell align="center" style={searchVals.active ? n.daysLeft < 10 && n.daysLeft >= 0 ? { color: '#ffa500' } : n.daysLeft < 0 ? { color: '#ff0000' } : { color: '#0b9a09' } : null}>
                      {searchVals.active ? n.daysLeft : n.endDate}
                    </TableCell>

                    <TableCell align="center" style={{ paddingBottom: 5 }}>
                      <Menu
                        key={n.id}
                        id={n.id}
                        intl={intl}
                        deleteStudent={deleteStudent}
                      />
                      {/* <div>
                        <Switch
                          checked={switchstate}
                          onChange={handleChangeSwitchState}
                          color="primary"
                          title="Change status"
                        />
                        <IconButton
                          component={RouterLink}
                          to={formatMessage(intl.urlStudentDetail, { studentId: n.id })}
                          title="Detail"
                        >
                          <SvgIcon fontSize="small" title="detail">
                            <SearchIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          component={RouterLink}
                          to={formatMessage(intl.urlCertificationAdd, { studentId: n.id })}
                          title="Create certificate"
                        >
                          <SvgIcon fontSize="small">
                            <CreateIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          component={RouterLink}
                          to={formatMessage(intl.urlBillAdd, { studentId: n.id })}
                          title="Create bill"
                        >
                          <SvgIcon fontSize="small">
                            <NoteAddIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          component={RouterLink}
                          to={formatMessage(intl.urlStudentEdit, { studentId: n.id })}
                          title="Edit"
                        >
                          <SvgIcon fontSize="small">
                            <EditIcon />
                          </SvgIcon>
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          // component={RouterLink}
                          // to={formatMessage(intl.urlBillAdd, { studentId: n.id })}
                          title="Lessons"
                        >
                          <SvgIcon fontSize="small">
                            <LibraryBooksIcon />
                          </SvgIcon>
                        </IconButton>

                        <IconButton
                          // component={RouterLink}
                          // to={formatMessage(intl.urlBillAdd, { studentId: n.id })}
                          title="Lessons"
                        >
                          <SvgIcon fontSize="small">
                            <ReceiptIcon />
                          </SvgIcon>
                        </IconButton>

                        <IconButton
                          // component={RouterLink}
                          // to={formatMessage(intl.urlBillAdd, { studentId: n.id })}
                          title="Web portal"
                        >
                          <img src="/static/images/billsIcon.png" alt="billsIcon" style={{ width: 17, height: 17 }} />
                        </IconButton>

                        <IconButton
                          // component={RouterLink}
                          // to={formatMessage(intl.urlBillAdd, { studentId: n.id })}
                          title="Lessons"
                        >
                          <SvgIcon fontSize="small">
                            <HistoryIcon />
                          </SvgIcon>
                        </IconButton>

                        <IconButton
                          // component={RouterLink}
                          // to={formatMessage(intl.urlBillAdd, { studentId: n.id })}
                          title="Lessons"
                        >
                          <SvgIcon fontSize="small">
                            <MoreHorizIcon />
                          </SvgIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(
                            n.id,
                            deleteStudent,
                            enqueueSnackbar,
                            { ...intl, formatMessage }
                          )}
                          title="Delete"
                        >
                          <SvgIcon fontSize="small">
                            <HighlightOffIcon />
                          </SvgIcon>
                        </IconButton>
                      </div> */}
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
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired,
  totalcount: PropTypes.number
};

Results.defaultProps = {
  students: [],
  totalcount: 0
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

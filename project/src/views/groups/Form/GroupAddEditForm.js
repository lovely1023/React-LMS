import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  Button,
  makeStyles,
  CardContent,
  withStyles
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from 'src/components/FixedTextField';
import 'src/components/global';
import GroupComponent from 'src/components/group';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { connectIntl } from 'src/contexts/Intl';
import { useHistory } from 'react-router';
import {
  getLevels,
  getAllLevels,
  getTextbooks,
  getTeachers,
  getRooms,
  getAllStudents,
  getAllTeachers,
  getAllTextbooks,
  getAllRooms
} from 'src/localstorage';
var { global_levels } = getLevels();
var { global_textbooks } = getTextbooks();
var { global_rooms } = getRooms();
var { global_teachers } = getTeachers();
var { global_allstudents } = getAllStudents();
var { global_allteachers } = getAllTeachers();
var { global_alllevels } = getAllLevels();
var { global_alltextbooks } = getAllTextbooks();
var { global_allrooms } = getAllRooms();

var { } = getLevels();

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

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
        borderRadius: '19px',
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
  root: {
    '& .MuiFormHelperText-root.Mui-required': {
      color: 'red'
    }
  },
  button: {
    marginBottom: '0.5rem',
    width: '90%'
  },
  boldletter: {
    fontWeight: 'bold',
    marginRight: 10
  },
  row_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // "@media (max-width: 959px)": { width: '100%' }
  },
  row_Div: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  recomment_combo: {
    width: 230, height: 50,
    // "@media (max-width: 1370px)": { width: 200 }
  },
  list: {
    width: '100%',
    height: 420,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  transfer_root: {
    margin: 'auto',
    marginBottom: 15
  },
}));

const GroupAddEditForm = ({ group, students, update, intl }) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [groupid, setGroupid] = React.useState('');
  const [groupitems, setGroupitems] = React.useState([]);
  const [monday, setMonday] = React.useState(false)
  const [tuesday, setTuesday] = React.useState(false)
  const [wednesday, setWednesday] = React.useState(false)
  const [thursday, setThursday] = React.useState(false)
  const [friday, setFriday] = React.useState(false)
  const [saturday, setSaturday] = React.useState(false)
  const [statu_private, setStatuPrivate] = React.useState(false)
  const [statu_locked, setStatuLocked] = React.useState(false)
  const [searchVal, setSearchVal] = React.useState({
    name: '',
    active: false
  });
  const [combovalues, setCombovalues] = React.useState({
    teacher: group.teacher,
    level: group.LEVEL,
    textbook: group.textbook,
    room: group.newroom
  });

  const handleChangeCombovalues = (name, value) => {
    setCombovalues({ ...combovalues, [name]: value });
  };

  // transfer list for start
  const [studentchecked, setStudentChecked] = React.useState([]);
  const [totalstudents, setTotalStudents] = React.useState(global.Allstudents.length !== 0 ? global.Allstudents : JSON.parse(global_allstudents));
  const [leftStudents, setLeftStudnets] = React.useState(totalstudents);
  const [selectedstudents, setSelectedStudnets] = React.useState(students);
  const [rightStudnets, setRightStudnets] = React.useState(selectedstudents);
  const [oldstudents, setOldStudnets] = React.useState(selectedstudents);
  const studentsleftChecked = intersection(studentchecked, leftStudents);
  const studentsrightChecked = intersection(studentchecked, rightStudnets);

  useEffect(() => {
    setSelectedStudnets(students);
    setRightStudnets(students);
    setOldStudnets(students);
  }, [students])

  const handleToggle = (value) => () => {
    const currentIndex = studentchecked.indexOf(value);
    const newChecked = [...studentchecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setStudentChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRightStudnets(rightStudnets.concat(studentsleftChecked));
    setLeftStudnets(not(leftStudents, studentsleftChecked));
    setStudentChecked(not(studentchecked, studentsleftChecked));
  };

  const handleCheckedLeft = () => {
    setLeftStudnets(leftStudents.concat(studentsrightChecked));
    setRightStudnets(not(rightStudnets, studentsrightChecked));
    setStudentChecked(not(studentchecked, studentsrightChecked));
  };

  const customList = (items) => (
    <Paper style={{ whiteSpace: 'nowrap' }}>
      <List dense component="div" role="list" className={classes.list}>
        <ListItem role="listitem" button>
          <ListItemIcon>
            <Checkbox
              disabled={true}
            />
          </ListItemIcon>
          <ListItemText primary={'First Name'} style={{ width: '50%', textAlign: 'left' }} />
          <ListItemText primary={'Last Name'} style={{ width: '50%', textAlign: 'left' }} />
        </ListItem>
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${value.id}-label`;
          return (
            <ListItem key={index} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon key={index + 1}>
                <Checkbox
                  key={index + 2}
                  checked={studentchecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.firstName} key={index + 3} />
              <ListItemText id={labelId} primary={value.lastName} key={index + 4} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  // transfer list for end

  const handleAddGroupItem = () => {
    let data = [];
    let demo = '0';
    if (groupitems.length === 0)
      data.push(demo)
    else {
      for (let i = 0; i < groupitems.length; i++)
        data.push(i)
      data.push(groupitems.length)
    }
    setGroupitems(data);
  }

  const handleRemoveGroupItem = (index) => {
    const newgroupitems = [...groupitems];
    newgroupitems.splice(index, 1);
    setGroupitems(newgroupitems);
  }

  const handlegetWeekStatus = (daysOfWeek) => {
    if (daysOfWeek & 16) {
      setMonday(true)
    }
    if (daysOfWeek & 8) {
      setTuesday(true)
    }
    if (daysOfWeek & 4) {
      setWednesday(true)
    }
    if (daysOfWeek & 2) {
      setThursday(true)
    }
    if (daysOfWeek & 1) {
      setFriday(true)
    }
    if (daysOfWeek & 32) {
      setSaturday(true)
    }
  }

  const handlegetWeekdays = () => {
    let daysofweekNum = 0;
    if (monday) {
      daysofweekNum += 16;
    }
    if (tuesday) {
      daysofweekNum += 8;
    }
    if (wednesday) {
      daysofweekNum += 4;
    }
    if (thursday) {
      daysofweekNum += 2;
    }
    if (friday) {
      daysofweekNum += 1;
    }
    if (saturday) {
      daysofweekNum = 32;
    }

    return daysofweekNum;
  }

  const handlegetGroupstatus = (status) => {
    if (status === 2) {
      setStatuPrivate(true)
      setStatuLocked(false)
    }
    else {
      setStatuPrivate(false)
      setStatuLocked(true)
    }
  }

  const handleChangeSearchVal = (name, value) => {
    let data = { ...searchVal };
    if (name === 'name') {
      data.name = value.target.value;
    }
    else {
      data.active = value;
    }
    setSearchVal(data);
    handleSearch(data);
  }

  const handleSearch = (demodata) => {
    let data = { searchVals: demodata, pagenum: 0, limitnum: 1000 }
    const url = `api/student/search`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLeftStudnets(json.students);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handlegetWeekStatus(group.daysint);
    handlegetGroupstatus(group.groupstatus);
    setGroupid(group.id)
  }, [])

  return (
    <Formik
      initialValues={{
        name: group.name || '',
        startTime: group.time || '',
        endTime: group.endtime || '',
        unit: group.unit || '',
      }}
      onSubmit={
        async (values, { setErrors }) => {
          let levelId = '', teacherId = '', textbookId = '', roomId = '', roomName = '';
          let jsonallteacher = global.Allteachers.length !== 0 ? global.Allteachers : JSON.parse(global_allteachers);
          jsonallteacher.map((val) => {
            if (val.name === combovalues.teacher)
              teacherId = val.id
          })

          let jsonalllevels = global.Allclassis.length !== 0 ? global.Allclassis : JSON.parse(global_alllevels);
          jsonalllevels.map((val) => {
            if (val.name === combovalues.level)
              levelId = val.id
          })

          let jsonalltextbooks = global.Alltextbooks.length !== 0 ? global.Alltextbooks : JSON.parse(global_alltextbooks);
          jsonalltextbooks.map((val) => {
            if (val.name === combovalues.textbook)
              textbookId = val.id
          })

          let jsonallrooms = global.Allrooms.length !== 0 ? global.Allrooms : JSON.parse(global_allrooms);
          jsonallrooms.map((val) => {
            if (val.name === combovalues.room) {
              roomId = val.id;
              roomName = val.name;
            }
          })

          let senddata = {
            values: values,
            students: rightStudnets,
            oldstudents: oldstudents,
            id: groupid,
            combovalues: {
              teacherId: teacherId,
              levelId: levelId,
              textbookId: textbookId,
              roomId: roomId,
              roomName: roomName
            },
            daysint: handlegetWeekdays(),
            groupstatus: statu_private ? '2' : '0'
          };

          const url = `api/group/${(update) ? 'update' : 'create'}`
          const method = (update) ? 'put' : 'post';
          httpClient[method](url, senddata)
            .then(json => {
              if (json.success && isMountedRef.current) {
                setOldStudnets(rightStudnets)
                enqueueSnackbar(
                  update ? 'Updated successfully' : 'Added successfully',
                  { variant: 'success' }
                )
              }
              else
                enqueueSnackbar(
                  'FAILD',
                  { variant: 'error' }
                )
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    >
      {({
        errors,
        values,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue
      }) => {

        return (
          <form onSubmit={handleSubmit} className={clsx(classes.root)} >
            <Card>
              <CardContent>
                <Grid container >
                  <Grid item xs={12} md={4}>
                    <div className={classes.row_Div}>
                      <div className={classes.boldletter}>Name:</div>
                      <CssTextField
                        required
                        name="name"
                        style={{ height: 50, width: 200, marginRight: 10 }}
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="locked"
                            color="primary"
                            checked={statu_locked}
                            onChange={() => { setStatuLocked(!statu_locked) }}
                          />
                        }
                        label="locked"
                      />
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.boldletter}>Teacher:</div>
                      <Autocomplete
                        id="teacher"
                        options={global.teachers.length !== 0 ? global.teachers : JSON.parse(global_teachers)}
                        getOptionLabel={(option) => option}
                        className={classes.recomment_combo}
                        renderInput={(params) => <CssTextField {...params} />}
                        onChange={(event, value) => { handleChangeCombovalues('teacher', value) }}
                        value={combovalues.teacher}
                      />
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.boldletter}>Level:</div>
                      <Autocomplete
                        id="level"
                        options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                        getOptionLabel={(option) => option}
                        className={classes.recomment_combo}
                        renderInput={(params) => <CssTextField {...params} />}
                        onChange={(event, value) => { handleChangeCombovalues('level', value) }}
                        value={combovalues.level}
                      />
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.boldletter}>Textbook:</div>
                      <Autocomplete
                        id="textbook"
                        options={global.textbooks.length !== 0 ? global.textbooks : JSON.parse(global_textbooks)}
                        getOptionLabel={(option) => option}
                        className={classes.recomment_combo}
                        renderInput={(params) => <CssTextField {...params} />}
                        onChange={(event, value) => { handleChangeCombovalues('textbook', value) }}
                        value={combovalues.textbook}
                      />
                    </div>

                    <div className={classes.row_Div}>
                      <div style={{ display: 'flex', width: '49%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={classes.boldletter} style={{ width: '30%' }}>Unit:</div>
                        <CssTextField
                          name="unit"
                          style={{ height: 50, width: '70%', marginRight: 10 }}
                          value={values.unit}
                          onChange={handleChange}
                        />
                      </div>
                      <div style={{ display: 'flex', width: '49%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={classes.boldletter} style={{ width: '30%' }}>Room:</div>
                        <Autocomplete
                          id="room"
                          options={global.rooms.length !== 0 ? global.rooms : JSON.parse(global_rooms)}
                          getOptionLabel={(option) => option}
                          style={{ height: 50, width: '70%', marginRight: 10 }}
                          renderInput={(params) => <CssTextField {...params} />}
                          onChange={(event, value) => { handleChangeCombovalues('room', value) }}
                          value={combovalues.room}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="private"
                            color="primary"
                            checked={statu_private}
                            onChange={() => { setStatuPrivate(!statu_private) }}
                          />
                        }
                        label="private"
                      />
                      <div style={{ display: 'flex', width: 200, justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={classes.boldletter} style={{ width: '30%' }}>Start:</div>
                        <CssTextField
                          name="startTime"
                          style={{ height: 50, width: '65%', marginRight: 10 }}
                          placeholder="HH:MM"
                          value={values.startTime}
                          onChange={handleChange}
                        />
                        {/* <KeyboardTimePicker
                          margin="normal"
                          id="startTime"
                          value={values.startTime}
                          onChange={(date) => setFieldValue('startTime', date)}
                          style={{ width: '65%', margin: 0 }}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        /> */}
                      </div>
                      <div style={{ display: 'flex', width: 200, justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={classes.boldletter} style={{ width: '30%' }}>End:</div>
                        <CssTextField
                          name="endTime"
                          style={{ height: 50, width: '65%', marginRight: 10 }}
                          placeholder="HH:MM"
                          value={values.endTime}
                          onChange={handleChange}
                        />
                        {/* <KeyboardTimePicker
                          margin="normal"
                          id="endTime"
                          value={values.endTime}
                          onChange={(date) => setFieldValue('endTime', date)}
                          style={{ width: '65%', margin: 0 }}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        /> */}
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.boldletter}>Days:</div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="mon"
                            color="primary"
                            checked={monday}
                            onChange={() => { setMonday(!monday) }}
                          />
                        }
                        label="Mon"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="tue"
                            color="primary"
                            checked={tuesday}
                            onChange={() => { setTuesday(!tuesday) }}
                          />
                        }
                        label="Tue"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="wed"
                            color="primary"
                            checked={wednesday}
                            onChange={() => { setWednesday(!wednesday) }}
                          />
                        }
                        label="Wed"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="thu"
                            color="primary"
                            checked={thursday}
                            onChange={() => { setThursday(!thursday) }}
                          />
                        }
                        label="Thu"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fri"
                            color="primary"
                            checked={friday}
                            onChange={() => { setFriday(!friday) }}
                          />
                        }
                        label="Fri"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="sat"
                            color="primary"
                            checked={saturday}
                            onChange={() => { setSaturday(!saturday) }}
                          />
                        }
                        label="Sat"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={8} style={{ paddingLeft: 15 }}>
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                      <div className={classes.boldletter}>Search:</div>
                      <CssTextField
                        name="name"
                        style={{ height: 50, width: 230, marginRight: 10 }}
                        value={searchVal.name}
                        onChange={(e) => handleChangeSearchVal('name', e)}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="active"
                            color="primary"
                            checked={searchVal.active}
                            onChange={(event, value) => { handleChangeSearchVal('active', value) }}
                          />
                        }
                        label="Only Active"
                      />
                    </div>

                    <Grid container alignItems="center" className={classes.transfer_root}>
                      <Grid item md={5} xs={12}>
                        {customList(leftStudents)}
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Grid container direction="column" alignItems="center">
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={studentsleftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            Add &gt;&gt;
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={studentsrightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item md={5} xs={12}>
                        {customList(rightStudnets)}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginTop: 40 }}>
                    <Grid item xs={12}>
                      {
                        groupitems.map((val, index) => {
                          return (
                            <Grid container key={index}>
                              <Grid item xs={12}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  onClick={() => { handleRemoveGroupItem(index) }}
                                  style={{ marginTop: 10 }}
                                  key={index + 1}
                                >
                                  -
                                </Button>
                              </Grid>
                              <GroupComponent key={index + 2} />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleAddGroupItem}
                      >
                        +
                      </Button>
                    </Grid>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => history.goBack()}
                        style={{ margin: 5 }}
                      >
                        Cancel
                          </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        style={{ margin: 5 }}
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        )
      }}
    </Formik >
  );
};

GroupAddEditForm.propTypes = {
  update: PropTypes.bool,
  group: PropTypes.array,
  students: PropTypes.array,
  className: PropTypes.string,
};

GroupAddEditForm.defaultProps = {
  group: [],
  students: []
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(GroupAddEditForm);

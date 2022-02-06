import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Card,
  Button,
  makeStyles,
  CardContent,
  withStyles
} from '@material-ui/core';
import { useHistory } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from '../../../components/FixedTextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import httpClient from 'src/utils/httpClient';
import 'src/components/global';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* connectIntl */
import { connectIntl } from 'src/contexts/Intl';

import {
  getLanguages,
  getAllLanguages,
  getLevels,
  getAllLevels,
  getGroups,
  getAllGroups,
  getAllLessontextbooks,
  getTeachers,
  getAllTeachers,
  getLessoninfos,
  getTopics,
  getAllLessoninfos,
  getAllStudents
} from 'src/localstorage';

var { global_groups } = getGroups();
var { global_allgroups } = getAllGroups();
var { global_levels } = getLevels();
var { global_alllevels } = getAllLevels();
var { global_languages } = getLanguages();
var { global_alllanguages } = getAllLanguages();
var { global_alllessontextbooks } = getAllLessontextbooks();
var { global_teachers } = getTeachers();
var { global_allteachers } = getAllTeachers();
var { global_lessoninfos } = getLessoninfos();
var { global_topics } = getTopics();
var { global_alllessoninfos } = getAllLessoninfos();
var { global_allstudents } = getAllStudents();

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormHelperText-root.Mui-required': {
      color: 'red'
    }
  },
  avatar: {
    width: '100%'
  },
  boldletter: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  input_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    "@media (max-width: 959px)": { width: '100%' }
  },
  datePicker: {
    width: 230
  },
  left_container: {
    paddingRight: 20,
    "@media (max-width: 959px)": { padding: 0 }
  },
  recomment_combo: {
    width: 230, height: 50,
    "@media (max-width: 1370px)": { width: 200 }
  },
  payments_combo: {
    // width: '80%',
    height: 50,
    "@media (max-width: 1421px)": { width: '100%' }
  },
  transfer_root: {
    margin: 'auto',
    marginBottom: 15
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: '100%',
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    marginBottom: '0.5rem',
    width: '90%'
  },
  ellipsis: {
    maxWidth: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 10,
    paddingLeft: 5,
    paddingRight: 5
  }
}));

const LessonAddEditForm = ({ lesson, textbooks, students, topics, update, intl }) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [combovalues, setCombovalues] = React.useState({
    teacher: lesson.teacher,
    level: lesson.LEVEL,
    language: lesson.LANGUAGE,
    lessoninfo: lesson.lessoninfo,
    groupName: lesson.groupName
  });

  const handleChangeCombovalues = (name, value) => {
    setCombovalues({ ...combovalues, [name]: value });
  };
  const [topicsvalidate, setTopicsValidate] = React.useState(true);
  const [topicsdelvalidate, setTopicsDelValidate] = React.useState(true);
  const [topicseditvalidate, setTopicsEditValidate] = React.useState(true);

  const [etopics, setETopics] = React.useState({
    lessonid: 0,
    topicid: 0,
    homework: '',
    id: 0,
    name: '',
  })

  const handleChangeEtopics = (name, value) => {
    if (name === 'name') {
      let flag = false, topicsid = 0;
      for (let i = 0; i < topics.length; i++) {
        if (topics[i].name === value && value !== null) {
          flag = true;
          topicsid = topics[i].id;
        }
      }
      if (!flag) {
        let data = { ...etopics }
        data.name = value;
        data.id = topicsid;
        setETopics(data);
      }
      setTopicsValidate(flag)
    }

    if (name === 'homework')
      setETopics({ ...etopics, [name]: value ? 'x' : '' });

    if (topicsdelvalidate === false)
      setTopicsEditValidate(false);
  }

  const handleChangeEtopicsEdit = (data) => {
    setETopics(data);
    setTopicsDelValidate(false);
  }

  const handleAddTopics = () => {
    setTopicsValidate(true);
    setTopicsEditValidate(true);
    setTopicsDelValidate(true);
    const newChecked = [...state_topics];
    newChecked.push(etopics);
    setStateTopics(newChecked);
  }

  const handleDelTopics = () => {
    const currentIndex = state_topics.indexOf(etopics);
    const newChecked = [...state_topics];
    newChecked.splice(currentIndex, 1);
    setStateTopics(newChecked);
    setTopicsDelValidate(true);
  }

  const handleEditTopics = () => {
    let data = []
    for (let i = 0; i < state_topics.length; i++) {
      if (state_topics[i].name !== etopics.name)
        data.push(state_topics[i])
      else
        data.push(etopics)
    }
    setStateTopics(data);
    setTopicsEditValidate(true);
  }

  const [textbookvalidate, setTextbookValidate] = React.useState(true);
  const [textbookdelvalidate, setTextbookDelValidate] = React.useState(true);
  const [textbookeditvalidate, setTextbookEditValidate] = React.useState(true);

  const [etextbooks, setETextbooks] = React.useState({
    id: 0,
    lessonid: 0,
    textBookid: 0,
    unit: '',
    homework: '',
    exercise: '',
    textBookName: '',
    from: '',
    to: '',
    pages: '',
  })

  const handleChangeEtextbook = (name, value) => {
    if (value !== null) {
      if (name === 'textBookName') {
        let flag = false;
        for (let i = 0; i < state_textbooks.length; i++) {
          if (state_textbooks[i].textBookName === value.textBookName && value !== null)
            flag = true;
        }
        if (!flag) {
          let data = { ...etextbooks }
          data.textBookName = value.textBookName;
          data.id = value.id;
          setETextbooks(data);
        }
        setTextbookValidate(flag)
      }
    }

    if (name === 'homework')
      setETextbooks({ ...etextbooks, [name]: value ? 'x' : '' });
    if (name === 'unit' || name === 'exercise' || name === 'pages')
      setETextbooks({ ...etextbooks, [name]: value });

    if (textbookdelvalidate === false)
      setTextbookEditValidate(false);
  }

  const handleChangeEtextbookEdit = (data) => {
    console.log(data)
    setETextbooks(data);
    setTextbookDelValidate(false);
  }

  const handleAddTextbooks = () => {
    setTextbookValidate(true);
    setTextbookEditValidate(true);
    setTextbookDelValidate(true);
    const newChecked = [...state_textbooks];
    newChecked.push(etextbooks);
    setStateTextbooks(newChecked);
  }

  const handleDelEtextbook = () => {
    const currentIndex = state_textbooks.indexOf(etextbooks);
    const newChecked = [...state_textbooks];
    newChecked.splice(currentIndex, 1);
    setStateTextbooks(newChecked);
    setTextbookDelValidate(true);
  }

  const handleEditEtextbook = () => {
    let data = []
    for (let i = 0; i < state_textbooks.length; i++) {
      if (state_textbooks[i].textBookName !== etextbooks.textBookName)
        data.push(state_textbooks[i])
      else
        data.push(etextbooks)
    }
    setStateTextbooks(data);
    setTextbookEditValidate(true);
  }

  // transfer list for start
  const [searchVal, setSearchVal] = React.useState({
    name: '',
    active: false
  });

  const [state_topics, setStateTopics] = React.useState(topics)
  const [old_state_topics, setOldStateTopics] = React.useState(topics)
  const [state_textbooks, setStateTextbooks] = React.useState(textbooks)
  const [old_state_textbooks, setOldStateTextbooks] = React.useState(textbooks)

  const [studentchecked, setStudentChecked] = React.useState([]);
  const [totalstudents, setTotalStudents] = React.useState(global.Allstudents.length !== 0 ? global.Allstudents : JSON.parse(global_allstudents));
  const [leftStudents, setLeftStudnets] = React.useState(totalstudents);
  const [selectedstudents, setSelectedStudnets] = React.useState(students);
  const [rightStudnets, setRightStudnets] = React.useState(selectedstudents);
  const [oldrightStudnets, setOldRightStudnets] = React.useState(selectedstudents);
  const studentsleftChecked = intersection(studentchecked, leftStudents);
  const studentsrightChecked = intersection(studentchecked, rightStudnets);

  useEffect(() => {
    setSelectedStudnets(students);
    setRightStudnets(students);
    setOldRightStudnets(students);
  }, [students])

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

  return (
    <Formik
      initialValues={{
        lessonDate: lesson.lessonDate || new Date(),
        startTime: "2021-01-01T" + lesson.startTime || new Date(),
        endTime: "2021-01-01T" + lesson.endTime || new Date()
      }}
      onSubmit={
        async (values, { setErrors }) => {
          let levelId = '', languageId = '', teacherId = '', lessoninfoId = '', groupnameId = '';
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
          let jsonalllanguages = global.Alllanguages.length !== 0 ? global.Alllanguages : JSON.parse(global_alllanguages);
          jsonalllanguages.map((val) => {
            if (val.name === combovalues.language)
              languageId = val.id
          })
          let jsonallgroups = global.Allgroups.length !== 0 ? global.Allgroups : JSON.parse(global_allgroups);
          jsonallgroups.map((val) => {
            if (val.name === combovalues.groupName)
              groupnameId = val.id
          })
          let jsonalllessoninfos = global.Alllessoninfos.length !== 0 ? global.Alllessoninfos : JSON.parse(global_alllessoninfos);
          jsonalllessoninfos.map((val) => {
            if (val.name === combovalues.lessoninfo)
              lessoninfoId = val.id
          })


          let senddata = {
            values: values,
            students: rightStudnets,
            oldstudents: oldrightStudnets,
            topics: state_topics,
            oldtopics: old_state_topics,
            textbooks: state_textbooks,
            oldtextbooks: old_state_textbooks,
            id: lesson.id,
            combovalues: {
              teacherId: teacherId,
              levelId: levelId,
              languageId: languageId,
              lessoninfoId: lessoninfoId,
              groupnameId: groupnameId
            }
          };
          const url = `api/lessons/${(update) ? 'update' : 'create'}`
          const method = (update) ? 'put' : 'post';
          httpClient[method](url, senddata)
            .then(json => {
              if (json.success && isMountedRef.current) {
                setOldRightStudnets(rightStudnets);
                setOldStateTopics(state_topics);
                setOldStateTextbooks(old_state_textbooks)
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
                  <Grid item xs={12}>
                    <Grid container >
                      <Grid item md={1} xs={12}></Grid>
                      <Grid item md={10} xs={12} className={classes.left_container}>
                        <Grid item xs={12} style={{ marginBottom: 15 }}>
                          <Grid container >
                            <Grid item md={4} xs={12}>
                              <div className={classes.input_container} style={{ paddingRight: 20 }}>
                                <div className={classes.boldletter}>Date:</div>
                                <KeyboardDatePicker
                                  format="MM/DD/YYYY"
                                  name="lessonDate"
                                  value={values.lessonDate}
                                  style={{ width: '65%' }}
                                  onChange={(date) => setFieldValue('lessonDate', date)}
                                />
                              </div>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <div className={classes.input_container} style={{ paddingRight: 20 }}>
                                <div className={classes.boldletter}>Start:</div>
                                <KeyboardTimePicker
                                  margin="normal"
                                  id="startTime"
                                  value={values.startTime}
                                  onChange={(date) => setFieldValue('startTime', date)}
                                  style={{ width: '65%', margin: 0 }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                  }}
                                />
                              </div>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <div className={classes.input_container}>
                                <div className={classes.boldletter}>End:</div>
                                <KeyboardTimePicker
                                  margin="normal"
                                  id="endTime"
                                  value={values.endTime}
                                  onChange={(date) => setFieldValue('endTime', date)}
                                  style={{ width: '65%', margin: 0 }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                  }}
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 15 }} >
                          <Grid item md={5} xs={12}>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>Teacher:</div>
                              <Autocomplete
                                id="teacher"
                                options={global.teachers.length !== 0 ? global.teachers : JSON.parse(global_teachers)}
                                getOptionLabel={(option) => option}
                                style={{ width: '65%', height: 50 }}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombovalues('teacher', value) }}
                                value={combovalues.teacher}
                              />
                            </div>
                          </Grid>
                          <Grid item md={2} xs={12}></Grid>
                          <Grid item md={5} xs={12}>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>Level:</div>
                              <Autocomplete
                                id="level"
                                options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                                getOptionLabel={(option) => option}
                                style={{ width: '65%', height: 50 }}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombovalues('level', value) }}
                                value={combovalues.level}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 15 }} >
                          <Grid item md={5} xs={12}>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>Language:</div>
                              <Autocomplete
                                id="language"
                                options={global.languages.length !== 0 ? global.languages : JSON.parse(global_languages)}
                                getOptionLabel={(option) => option}
                                style={{ width: '65%', height: 50 }}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombovalues('language', value) }}
                                value={combovalues.language}
                              />
                            </div>
                          </Grid>
                          <Grid item md={2} xs={12}></Grid>
                          <Grid item md={5} xs={12}>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>Info:</div>
                              <Autocomplete
                                id="lessoninfo"
                                options={global.lessoninfos.length !== 0 ? global.lessoninfos : JSON.parse(global_lessoninfos)}
                                getOptionLabel={(option) => option}
                                style={{ width: '65%', height: 50 }}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombovalues('lessoninfo', value) }}
                                value={combovalues.lessoninfo}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 15 }}>
                          <Grid item md={6} xs={12} className={classes.left_container}>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>Group:</div>
                              <Autocomplete
                                id="groupName"
                                options={global.groups.length !== 0 ? global.groups : JSON.parse(global_groups)}
                                getOptionLabel={(option) => option}
                                style={{ width: '65%', height: 50 }}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombovalues('groupName', value) }}
                                value={combovalues.groupName}
                              />
                            </div>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>Topics:</div>
                            </div>
                            <Grid container>
                              <Grid item md={5} xs={12}>
                                <Autocomplete
                                  id="topic"
                                  options={global.topics.length !== 0 ? global.topics : JSON.parse(global_topics)}
                                  getOptionLabel={(option) => option}
                                  style={{ width: '95%', height: 50 }}
                                  renderInput={(params) => <CssTextField {...params} />}
                                  value={etopics.name}
                                  onChange={(event, value) => { handleChangeEtopics('name', value) }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={etopics.homework === '' ? false : true}
                                        onChange={(event, value) => { handleChangeEtopics('homework', value) }}
                                        name="homework"
                                        color="primary"
                                      />
                                    }
                                    label="Homework"
                                  />
                                </div>
                              </Grid>
                              <Grid item md={2} xs={12} style={{ textAlign: 'center' }}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={classes.button}
                                  disabled={topicsvalidate}
                                  onClick={handleAddTopics}
                                >
                                  Add
                                </Button>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={classes.button}
                                  disabled={topicseditvalidate}
                                  onClick={handleEditTopics}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={classes.button}
                                  disabled={topicsdelvalidate}
                                  onClick={handleDelTopics}
                                >
                                  Delete
                                </Button>
                              </Grid>
                              <Grid item md={5} xs={12} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <TableContainer component={Paper} style={{ height: 200, width: '95%' }}>
                                  <Table aria-label="customized table">
                                    <TableHead>
                                      <TableRow>
                                        <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Topic</StyledTableCell>
                                        <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>HW</StyledTableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {state_topics.map((row, index) => (
                                        <StyledTableRow
                                          key={index}
                                          style={{ cursor: 'pointer' }}
                                          onClick={() => { handleChangeEtopicsEdit(row) }}
                                        >
                                          <StyledTableCell className={classes.ellipsis} key={index + 1}>{row.name}</StyledTableCell>
                                          <StyledTableCell key={index + 2}>{row.homework}</StyledTableCell>
                                        </StyledTableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <div className={classes.input_container}>
                              <div className={classes.boldletter}>TextBooks:</div>
                            </div>
                            <Grid container>
                              <Grid item md={8} xs={12}>
                                <Autocomplete
                                  id="textbooks"
                                  options={global.Alllessontextbooks.length !== 0 ? global.Alllessontextbooks : JSON.parse(global_alllessontextbooks)}
                                  getOptionLabel={(option) => option.textBookName}
                                  style={{ width: '100%', height: 50 }}
                                  renderInput={(params) => <CssTextField {...params} />}
                                  value={etextbooks}
                                  onChange={(event, value) => { handleChangeEtextbook('textBookName', value) }}
                                />
                                <div style={{ width: '100%', display: 'flex' }}>
                                  <div className={classes.input_container} style={{ marginRight: 15 }}>
                                    <div className={classes.boldletter} style={{ marginRight: 10 }}>unit:</div>
                                    <CssTextField
                                      id="unit"
                                      style={{ height: 50 }}
                                      value={etextbooks.unit}
                                      onChange={(e) => { handleChangeEtextbook('unit', e.target.value) }}
                                    />
                                  </div>
                                  <div className={classes.input_container}>
                                    <div className={classes.boldletter} style={{ marginRight: 10 }}>Pages:</div>
                                    <CssTextField
                                      id="pages"
                                      style={{ height: 50 }}
                                      value={etextbooks.pages}
                                      onChange={(e) => { handleChangeEtextbook('pages', e.target.value) }}
                                    />
                                  </div>
                                </div>
                                <div style={{ width: '100%', display: 'flex' }}>
                                  <div className={classes.input_container} style={{ marginRight: 15 }}>
                                    <div className={classes.boldletter} style={{ marginRight: 10 }}>Exercise:</div>
                                    <CssTextField
                                      id="exercise"
                                      style={{ height: 50 }}
                                      value={etextbooks.exercise}
                                      onChange={(e) => { handleChangeEtextbook('exercise', e.target.value) }}
                                    />
                                  </div>
                                  <div className={classes.input_container}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={etextbooks.homework === '' ? false : true}
                                          onChange={(event, value) => { handleChangeEtextbook('homework', value) }}
                                          name="homework"
                                          color="primary"
                                        />
                                      }
                                      label="Homework"
                                    />
                                  </div>
                                </div>
                              </Grid>
                              <Grid item md={4} xs={12} style={{ textAlign: 'center' }}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={classes.button}
                                  disabled={textbookvalidate}
                                  onClick={handleAddTextbooks}
                                >
                                  Add
                                </Button>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={classes.button}
                                  disabled={textbookeditvalidate}
                                  onClick={handleEditEtextbook}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  className={classes.button}
                                  disabled={textbookdelvalidate}
                                  onClick={handleDelEtextbook}
                                >
                                  Delete
                                </Button>
                              </Grid>
                            </Grid>

                            <TableContainer component={Paper} style={{ height: 200 }}>
                              <Table aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Textbook</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Unit</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Pages</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Ex</StyledTableCell>
                                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>HW</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {state_textbooks.map((row, index) => (
                                    <StyledTableRow key={index}
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => { handleChangeEtextbookEdit(row) }}
                                    >
                                      <StyledTableCell className={classes.ellipsis} key={index + 1}>{row.textBookName}</StyledTableCell>
                                      <StyledTableCell key={index + 2}>{row.unit}</StyledTableCell>
                                      <StyledTableCell key={index + 3}>{row.pages}</StyledTableCell>
                                      <StyledTableCell key={index + 4}>{row.exercise}</StyledTableCell>
                                      <StyledTableCell key={index + 5}>{row.homework}</StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={1} xs={12}></Grid>
                    </Grid>
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                      <div className={classes.input_container} style={{ width: 'initial' }}>
                        <div className={classes.boldletter} style={{ textAlign: 'initial', marginRight: 15 }}>Search:</div>
                        <CssTextField
                          id="name"
                          style={{ height: 50 }}
                          value={searchVal.name}
                          onChange={(e) => handleChangeSearchVal('name', e)}
                        />
                      </div>

                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name="active"
                            style={{ marginLeft: 15 }}
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
                          <div className={classes.boldletter}>Groups</div>
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
                    <div style={{ textAlign: 'right' }}>
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

LessonAddEditForm.propTypes = {
  update: PropTypes.bool,
  lesson: PropTypes.object,
  textbooks: PropTypes.array,
  students: PropTypes.array,
  topics: PropTypes.array,
  className: PropTypes.string,
};

LessonAddEditForm.defaultProps = {
  lesson: {},
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(LessonAddEditForm);

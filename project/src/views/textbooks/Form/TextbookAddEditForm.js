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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import {
  getAllStudents
} from 'src/localstorage';
var { global_allstudents } = getAllStudents();

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
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
  inputStyle: {
    height: 50, width: 200, marginRight: 10,
    "@media (max-width: 414px)": { width: '100%' }
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

const TextbookAddEditForm = ({ textbook, students, update, intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [textbookid, setTextbookid] = React.useState(0)
  const [searchVal, setSearchVal] = React.useState({
    name: '',
    active: false
  });

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
    setTextbookid(textbook.id)
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
  return (
    <Formik
      initialValues={{
        name: textbook.name || '',
        stock: textbook.stock || '',
        status: textbook.status || '',
        nearMid: textbook.nearMid || '',
        nearEnd: textbook.nearEnd || '',
        midPoint: textbook.midPoint || '',
      }}
      onSubmit={
        async (values, { setErrors }) => {
          let senddata = {
            values: values,
            students: rightStudnets,
            oldstudents: oldstudents,
            id: textbookid
          };

          const url = `api/textbooks/${(update) ? 'update' : 'create'}`
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
      }) => {

        return (
          <form onSubmit={handleSubmit} className={clsx(classes.root)} >
            <Card>
              <CardContent>
                <Grid container >
                  <Grid item xs={12} sm={3}></Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Textbook</div>
                        <div style={{ marginRight: 15 }}>Exam reminders:</div>
                        <div className={classes.boldletter}>Progress test from unit:</div>
                        <CssTextField
                          name="nearMid"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                          value={values.nearMid}
                          onChange={handleChange}
                        />
                        <div className={classes.boldletter}>To:</div>
                        <CssTextField
                          name="nearEnd"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                          value={values.nearEnd}
                          onChange={handleChange}
                        />
                        <div className={classes.boldletter}>Final exam from unit:</div>
                        <CssTextField
                          name="midPoint"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                          value={values.midPoint}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Name:</div>
                        <CssTextField
                          name="name"
                          className={classes.inputStyle}
                          style={{ width: 300 }}
                          onChange={handleChange}
                          value={values.name}
                        />
                        <div className={classes.boldletter}>Stock:</div>
                        <CssTextField
                          name="stock"
                          className={classes.inputStyle}
                          style={{ width: 70 }}
                          value={values.stock}
                          onChange={handleChange}
                        />
                      </div>
                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Students:</div>
                        <div>Adding students to this textbook will affect the value of "stock", unless you have manually edited stock</div>
                      </div>
                      <div className={classes.row_Div}>
                        <div className={classes.boldletter}>Search:</div>
                        <CssTextField
                          name="search"
                          className={classes.inputStyle}
                          value={searchVal.name}
                          onChange={(e) => handleChangeSearchVal('name', e)}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="only_active"
                              color="primary"
                              style={{ marginLeft: 10 }}
                              checked={searchVal.active}
                              onChange={(event, value) => { handleChangeSearchVal('active', value) }}
                            />
                          }
                          label="Only active"
                        />
                      </div>
                    </Grid>
                    <Grid container alignItems="center" className={classes.transfer_root}>
                      <Grid item md={5} xs={12}>
                        {customList(leftStudents)}
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Grid container direction="column" alignItems="center">
                          <div className={classes.boldletter}>Students</div>
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
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>If  you wish to remove a student, you can do so by editing the student in question.</div>
                      <div style={{ display: 'flex' }}>
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
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={3}></Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        )
      }}
    </Formik >
  );
};

TextbookAddEditForm.propTypes = {
  update: PropTypes.bool,
  textbook: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
  className: PropTypes.string,
};

TextbookAddEditForm.defaultProps = {
  textbook: {},
  students: []
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TextbookAddEditForm);

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
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from 'src/components/FixedTextField';
import 'src/components/global';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { connectIntl } from 'src/contexts/Intl';
import { useHistory } from 'react-router';
import {
  getAllTextbooks
} from 'src/localstorage';
var { global_alltextbooks } = getAllTextbooks();

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
}));

const TeacherAddEditForm = ({ teacher, books, update, intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [searchVal, setSearchVal] = React.useState({
    name: ''
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
    const url = `api/textbooks/search`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          setLeftBooks(json.textbooks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // transfer list for start
  const [teacherid, setTeacherid] = React.useState(0)
  const [studentchecked, setStudentChecked] = React.useState([]);
  const [totalbooks, setTotalbooks] = React.useState(global.Alltextbooks.length !== 0 ? global.Alltextbooks : JSON.parse(global_alltextbooks));
  const [leftbooks, setLeftBooks] = React.useState(totalbooks);
  const [selectedbooks, setSelectedBooks] = React.useState(books);
  const [rightBooks, setRightBooks] = React.useState(selectedbooks);
  const [oldbooks, setOldBooks] = React.useState(selectedbooks);
  const booksleftChecked = intersection(studentchecked, leftbooks);
  const booksrightChecked = intersection(studentchecked, rightBooks);

  useEffect(() => {
    setSelectedBooks(books);
    setRightBooks(books);
    setOldBooks(books);
    setTeacherid(teacher.id)
  }, [books])

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
    setRightBooks(rightBooks.concat(booksleftChecked));
    setLeftBooks(not(leftbooks, booksleftChecked));
    setStudentChecked(not(studentchecked, booksleftChecked));
  };

  const handleCheckedLeft = () => {
    setLeftBooks(leftbooks.concat(booksrightChecked));
    setRightBooks(not(rightBooks, booksrightChecked));
    setStudentChecked(not(studentchecked, booksrightChecked));
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
          <ListItemText primary={'Name'} style={{ width: '50%', textAlign: 'left' }} />
          {/* <ListItemText primary={'Amount'} style={{ width: '50%', textAlign: 'left' }} /> */}
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
              <ListItemText id={labelId} primary={value.name} key={index + 3} />
              {/* <ListItemText id={labelId} primary={value.amount} key={index + 4} /> */}
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
        name: teacher.name || '',
        hours: teacher.hoursPerWeek || '',
        password: '',
        repassword: '',
        isteacher: Boolean(teacher.status) || false,
      }}
      onSubmit={
        async (values, { setErrors }) => {
          if (values.password !== values.repassword) {
            enqueueSnackbar(
              'Please confirm the password',
              { variant: 'error' }
            )
          }
          else {
            let senddata = {
              values: values,
              books: rightBooks,
              oldbooks: oldbooks,
              id: teacherid
            };

            const url = `api/teacher/${(update) ? 'update' : 'create'}`
            const method = (update) ? 'put' : 'post';
            httpClient[method](url, senddata)
              .then(json => {
                if (json.success && isMountedRef.current) {
                  setOldBooks(rightBooks)
                  enqueueSnackbar(
                    update ? 'Updated successfully' : 'Added successfully',
                    { variant: 'success' }
                  )
                  history.push("/app/teachers")
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
                    <div className={classes.row_Div}>
                      <div className={classes.boldletter}>Name:</div>
                      <CssTextField
                        required
                        name="name"
                        className={classes.inputStyle}
                        value={values.name}
                        onChange={handleChange}
                      />
                      <div className={classes.boldletter}>Hours per week:</div>
                      <CssTextField
                        required
                        name="hours"
                        className={classes.inputStyle}
                        value={values.hours}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={classes.row_Div} style={{ display: 'none' }}>
                      <div className={classes.boldletter}>Password:</div>
                      <CssTextField
                        required
                        name="password"
                        className={classes.inputStyle}
                        value={values.password}
                        onChange={handleChange}
                        type="password"
                      />
                      <div className={classes.boldletter}>Re Password:</div>
                      <CssTextField
                        required
                        name="repassword"
                        className={classes.inputStyle}
                        value={values.repassword}
                        onChange={handleChange}
                        type="password"
                      />
                    </div>

                    <div className={classes.row_Div}>
                      {/* <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}> */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={classes.boldletter}>Search:</div>
                        <CssTextField
                          name="search"
                          className={classes.inputStyle}
                          value={searchVal.name}
                          onChange={(e) => handleChangeSearchVal('name', e)}
                        />
                      </div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="isteacher"
                            color="primary"
                            style={{ marginLeft: 10 }}
                            onChange={handleChange}
                            checked={Boolean(values.isteacher)}
                          />
                        }
                        label="Teacher is active"
                      />
                    </div>
                    <Grid container alignItems="center" className={classes.transfer_root}>
                      <Grid item md={5} xs={12}>
                        {customList(leftbooks)}
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Grid container direction="column" alignItems="center">
                          <div className={classes.boldletter}>Books</div>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={booksleftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            Add &gt;&gt;
                          </Button>
                          <Button
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={booksrightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item md={5} xs={12}>
                        {customList(rightBooks)}
                      </Grid>
                    </Grid>
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20 }}>
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

TeacherAddEditForm.propTypes = {
  update: PropTypes.bool,
  teacher: PropTypes.object,
  books: PropTypes.array,
  className: PropTypes.string,
};

TeacherAddEditForm.defaultProps = {
  teacher: {},
  books: [],
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TeacherAddEditForm);

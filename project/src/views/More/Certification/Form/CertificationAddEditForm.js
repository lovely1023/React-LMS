import React from 'react';
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
import FixedTextField from 'src/components/FixedTextField';
import 'src/components/global';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import httpClient from 'src/utils/httpClient';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { connectIntl } from 'src/contexts/Intl';
import { useHistory } from 'react-router';
import {
  getLevels,
  getAllLevels
} from 'src/localstorage';
var { global_alllevels } = getAllLevels();
var { global_levels } = getLevels();

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
  row_Div: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // "@media (max-width: 684px)": { marginBottom: 10 },
  },
  bold_letter: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 20
  },
  letter: {
    fontSize: 16,
    marginRight: 10
  },
  width150: {
    height: 50,
    width: 150,
    // marginRight: 20,
    // "@media (max-width: 661px)": { width: '200px !important' }
  },
  width350: {
    height: 50,
    width: 350,
  }
}));

const CertificationAddEditForm = ({ certification, update, intl }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [combovalues, setCombovalues] = React.useState({
    level: certification.level
  });

  const handleChangeCombovalues = (name, value) => {
    setCombovalues({ ...combovalues, [name]: value });
  };

  const timeConvert = (mins) => {
    let minutes = (parseInt(mins) % 60);
    let hours = Math.floor(parseInt(mins) / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let res = `${hours} : ${minutes}`;
    return res;
  }

  const stringTomin = (str) => {
    let n = str.search(":");
    let hour = str.substr(0, n - 1);
    let min = str.substr(n + 1, str.length);
    let res = parseInt(hour) * 60 + parseInt(min);
    return res;
  }

  return (
    <Formik
      initialValues={{
        issueDate: certification.issueDate || new Date(),
        startDate: certification.startDate || '',
        endDate: certification.endDate || '',
        mins: timeConvert(certification.mins) || '',
        level: certification.level || '',
        studentName: certification.studentName || '',
        IDNumber: certification.IDNumber || '',
        title: certification.title || '',
        userName: certification.userName || ''
      }}
      onSubmit={
        async (values, { setErrors }) => {
          console.log(moment(values.startDate).format('YYYY-MM-DD'))
          let levelId = 0;
          let jsonalllevels = global.Allclassis.length !== 0 ? global.Allclassis : JSON.parse(global_alllevels);
          jsonalllevels.map((val) => {
            if (val.name === combovalues.level)
              levelId = val.id
          })
          let newData = {
            issueDate: moment(values.issueDate).format('YYYY-MM-DD'),
            startDate: moment(values.startDate).format('YYYY-MM-DD'),
            endDate: moment(values.endDate).format('YYYY-MM-DD'),
            mins: stringTomin(values.mins),
            level: combovalues.level,
            levelId: levelId,
            studentName: values.studentName,
            IDNumber: values.IDNumber,
            title: values.title,
            userName: values.userName,
          };

          let senddata = {
            originData: certification,
            newData: newData
          }

          const url = `api/more/certification/${(update) ? 'update' : 'create'}`
          const method = (update) ? 'put' : 'post';
          httpClient[method](url, senddata)
            .then(json => {
              if (json.success && isMountedRef.current) {
                enqueueSnackbar(
                  update ? 'Updated successfully' : 'Added successfully',
                  { variant: 'success' }
                )
                history.push("/app/more/certification")
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
                  <Grid item xs={12} sm={4}>
                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>Issue date:</div>
                      <div className={classes.letter}>
                        <KeyboardDatePicker
                          format="MM/DD/YYYY"
                          name="issueDate"
                          className={classes.width150}
                          value={values.issueDate}
                          onChange={(date) => setFieldValue('issueDate', date)}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>From:</div>
                      <div className={classes.letter}>
                        <KeyboardDatePicker
                          format="MM/DD/YYYY"
                          name="startDate"
                          className={classes.width150}
                          value={values.startDate}
                          onChange={(date) => setFieldValue('startDate', date)}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>To:</div>
                      <div className={classes.letter}>
                        <KeyboardDatePicker
                          format="MM/DD/YYYY"
                          name="endDate"
                          className={classes.width150}
                          value={values.endDate}
                          onChange={(date) => setFieldValue('endDate', date)}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>Total hours:</div>
                      <div className={classes.letter}>
                        <CssTextField
                          id="mins"
                          placeholder="HH:MM"
                          style={{ width: 150 }}
                          value={values.mins}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>Total hours:</div>
                      <div className={classes.letter}>
                        <Autocomplete
                          options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                          getOptionLabel={(option) => option}
                          className={classes.width350}
                          renderInput={(params) => <CssTextField {...params} />}
                          value={values.level}
                          onChange={(event, value) => { handleChangeCombovalues('level', value) }}
                          value={combovalues.level}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>Student Name:</div>
                      <div className={classes.letter}>
                        <CssTextField
                          id="studentName"
                          className={classes.width350}
                          value={values.studentName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>Student ID Number:</div>
                      <div className={classes.letter}>
                        <CssTextField
                          id="IDNumber"
                          className={classes.width350}
                          value={values.IDNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* <div>Changes made here will be reflected in future certificates created by this user</div> */}

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>User title:</div>
                      <div className={classes.letter}>
                        <CssTextField
                          id="title"
                          className={classes.width350}
                          value={values.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className={classes.row_Div}>
                      <div className={classes.bold_letter}>Full user name:</div>
                      <div className={classes.letter}>
                        <CssTextField
                          id="userName"
                          className={classes.width350}
                          value={values.userName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </Grid>
                  <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ margin: 10 }}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </form>
        )
      }}
    </Formik >
  );
};

CertificationAddEditForm.propTypes = {
  update: PropTypes.bool,
  certification: PropTypes.object,
  className: PropTypes.string,
};

CertificationAddEditForm.defaultProps = {
  certification: {},
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(CertificationAddEditForm);

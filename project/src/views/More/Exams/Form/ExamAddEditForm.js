import React, { useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  Button,
  makeStyles,
  CardContent,
  withStyles,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FixedTextField from 'src/components/FixedTextField';
import 'src/components/global';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { connectIntl } from 'src/contexts/Intl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  getTeachers,
  getTextbooks,
  getSchemes,
  getAllTeachers,
  getAllTextbooks,
  getAllSchemes
} from 'src/localstorage';

var { global_teachers } = getTeachers();
var { global_allteachers } = getAllTeachers();
var { global_schemes } = getSchemes();
var { global_allschemes } = getAllSchemes();
var { global_textbooks } = getTextbooks();
var { global_alltextbooks } = getAllTextbooks();

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
    width: 230,
    marginRight: 10
    // "@media (max-width: 1370px)": { width: 200 }
  },
  inputStyle: {
    height: 50, width: 200, marginRight: 10,
    "@media (max-width: 414px)": { width: '100%' }
  }
}));

const ExamAddEditForm = ({ result, schedules, update, itemType, intl }) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [combovalues, setCombovalues] = React.useState({
    teacher: result.teachername,
    scheme: result.markingname,
    textbook: result.textbookname,
  });
  const [sections, setSections] = React.useState([]);
  const [bigcatagory, setBigcatagory] = React.useState('textbook')
  const [smallcatagory, setSmallcatagory] = React.useState('')
  const [type, setType] = React.useState(result.type)
  const [header, setHeader] = React.useState([]);

  useEffect(() => {
    let data = []
    if (sections.length === 0)
      data.push({ outOf: "", name: "" })
    setSections(data)
    setCagagories(result.type)
    setScheduleDatas();
    handleParse();
  }, [])

  const handleParse = () => {
    if (result.scheme !== undefined)
      setSections(JSON.parse(result.scheme))
  }

  const setScheduleDatas = () => {
    if (schedules.length !== 0) {
      let head = [];
      for (var key in JSON.parse(schedules[0].results)) {
        head.push(key)
      }
      setHeader(head)
    }
  }

  const setCagagories = (type) => {
    switch (type) {
      case 1:
        setBigcatagory('textbook');
        setSmallcatagory('endofcourse');
        setType(1);
        break;
      case 2:
        setBigcatagory('textbook');
        setSmallcatagory('progress');
        setType(2);
        break;
      case 3:
        setBigcatagory('other');
        setType(3);
        break;
      case 4:
        setBigcatagory('upper');
        setType(4);
        break;
    }
  }

  const handleChangeBigCatagory = (event) => {
    setBigcatagory(event.target.value)
    switch (event.target.value) {
      case 'textbook':
        if (smallcatagory === 'progress')
          setType(2);
        else
          setType(1);
        break;
      case 'other':
        setType(3);
        break;
      case 'upper':
        setType(4);
        break;
    }
  }
  const handleChangeSmallCatagory = (event) => {
    setSmallcatagory(event.target.value)
    if (event.target.value === 'progress')
      setType(2)
    else
      setType(1)
  }

  const handleAddSectionItem = () => {
    let data = [];
    if (sections.length === 0)
      data.push({ outOf: "", name: "" })
    else {
      for (let i = 0; i < sections.length; i++)
        data.push(sections[i])
      data.push({ outOf: "", name: "" })
    }
    setSections(data);
  }

  const handleRemoveSectionItem = (index) => {
    if (sections.length !== 1) {
      const newsectionitems = [...sections];
      newsectionitems.splice(index, 1);
      setSections(newsectionitems);
    }
  }

  const handleChangeCombo = (name, value) => {
    setCombovalues({ ...combovalues, [name]: value });
  };

  const handleChangeSchemeData = (event, index, flag) => {
    let data = [...sections]
    if (flag === 'name') {
      data[index].name = event.target.value
    }
    else
      data[index].outOf = event.target.value
    setSections(data)
  }

  return (
    <Formik
      initialValues={{
        test_name: result.name || '',
        scheduled: result.scheduled === "Y" ? true : false,
        exam_date: result.examDate || new Date(),
        schemeType: result.type === 0 ? "weighted" : "percentages"
      }}
      onSubmit={
        async (values, { setErrors }) => {
          if (itemType === 'result') {
            let teacherId = 0, schemeId = 0, textbookId = 0;
            let teachers = JSON.parse(global_allteachers);
            let schemes = JSON.parse(global_allschemes);
            let textbooks = JSON.parse(global_alltextbooks);

            for (let i = 0; i < teachers.length; i++) {
              if (teachers[i].name === combovalues.teacher)
                teacherId = teachers[i].id;
            }
            for (let i = 0; i < schemes.length; i++) {
              if (schemes[i].name === combovalues.scheme)
                schemeId = schemes[i].id;
            }
            for (let i = 0; i < textbooks.length; i++) {
              if (textbooks[i].name === combovalues.textbook)
                textbookId = textbooks[i].id;
            }
            let senddata = {
              id: result.id,
              textbookid: textbookId,
              teacherid: teacherId,
              type: type,
              name: values.test_name,
              examDate: values.exam_date,
              groupid: result.groupid,
              scheduled: values.scheduled ? "Y" : "N",
              markingscheme: schemeId
            }
            // const url = `api/more/exams/update`
            // const method = 'put';
            const url = `api/more/exams/${(update) ? 'update' : 'create'}`
            const method = (update) ? 'put' : 'post';
            httpClient[method](url, senddata)
              .then(json => {
                if (json.success && isMountedRef.current) {
                  enqueueSnackbar(
                    'Updated successfully',
                    { variant: 'success' }
                  )
                  history.push('/app/more/exams');
                }
              })
              .catch((error) => {
                enqueueSnackbar(
                  'FAILD',
                  { variant: 'error' }
                )
              });
          }
          else {
            let senddata = {
              id: result.id,
              name: values.test_name,
              schemeType: values.schemeType === "weighted" ? 0 : 1,
              scheme: JSON.stringify(sections)
            }
            const url = `api/more/exams/scheme/${(update) ? 'update' : 'create'}`
            const method = (update) ? 'put' : 'post';
            httpClient[method](url, senddata)
              .then(json => {
                if (json.success && isMountedRef.current) {
                  enqueueSnackbar(
                    'Updated successfully',
                    { variant: 'success' }
                  )
                }
              })
              .catch((error) => {
                enqueueSnackbar(
                  'FAILD',
                  { variant: 'error' }
                )
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
        setFieldValue
      }) => {

        return (
          <form onSubmit={handleSubmit} className={clsx(classes.root)} >
            <Card>
              <CardContent>
                {
                  itemType === 'result' ?
                    <Grid container >
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} sm={8}>
                            <FormControl component="fieldset">
                              <RadioGroup aria-label="gender" name="textbook" value={bigcatagory} onChange={handleChangeBigCatagory}>
                                <div
                                  style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
                                >
                                  <FormControlLabel value="textbook" control={<Radio />} label="Textbook" />
                                  <div
                                    style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
                                  >
                                    <Autocomplete
                                      id="textbook"
                                      options={global.textbooks.length !== 0 ? global.textbooks : JSON.parse(global_textbooks)}
                                      className={classes.recomment_combo}
                                      getOptionLabel={(option) => option}
                                      renderInput={(params) => <CssTextField {...params} />}
                                      onChange={(event, value) => { handleChangeCombo('textbook', value) }}
                                      value={combovalues.textbook}
                                      disabled={bigcatagory !== "textbook" ? true : false}
                                    />
                                    <FormControl component="fieldset"
                                      disabled={bigcatagory !== "textbook" ? true : false}
                                    >
                                      <RadioGroup aria-label="gender" name="textbook" value={smallcatagory} onChange={handleChangeSmallCatagory} style={{ flexDirection: 'row' }}>
                                        <FormControlLabel value="endofcourse" control={<Radio />} label="End of course exam" />
                                        <FormControlLabel value="progress" control={<Radio />} label="Progress test" />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </div>
                                <FormControlLabel value="upper" control={<Radio />} label="Upper Int A" />
                                <div
                                  style={{ display: 'flex', flexWrap: 'wrap' }}
                                >
                                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                                  <div
                                    style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
                                  >
                                    <div className={classes.boldletter}>Test name:</div>
                                    <CssTextField
                                      id="test_name"
                                      disabled={bigcatagory !== "other" ? true : false}
                                      className={classes.recomment_combo}
                                      value={values.test_name}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div
                              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}
                            >
                              <div className={classes.boldletter}>Exam Date:</div>
                              <KeyboardDatePicker
                                className={classes.recomment_combo}
                                format="MM/DD/YYYY"
                                name="exam_date"
                                value={values.exam_date}
                                onChange={(date) => setFieldValue('exam_date', moment(date).format("YYYY-MM-DD"))}
                              />
                            </div>
                            <div
                              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}
                            >
                              <div className={classes.boldletter}>Teacher:</div>
                              <Autocomplete
                                id="teacher"
                                options={global.teachers.length !== 0 ? global.teachers : JSON.parse(global_teachers)}
                                getOptionLabel={(option) => option}
                                className={classes.recomment_combo}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombo('teacher', value) }}
                                value={combovalues.teacher}
                              />
                            </div>
                            <div
                              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                              <div className={classes.boldletter}>Marking scheme:</div>
                              <Autocomplete
                                id="scheme"
                                options={global.schemes.length !== 0 ? global.schemes : JSON.parse(global_schemes)}
                                getOptionLabel={(option) => option}
                                className={classes.recomment_combo}
                                renderInput={(params) => <CssTextField {...params} />}
                                onChange={(event, value) => { handleChangeCombo('scheme', value) }}
                                value={combovalues.scheme}
                              />
                            </div>
                          </Grid>
                          <div style={{ width: '100%' }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="scheduled"
                                  color="primary"
                                  checked={values.scheduled}
                                  onChange={handleChange}
                                />
                              }
                              label="Scheduled Exam (uncheck to add results)"
                            />
                          </div>
                          <Grid item xs={12} style={{ width: '100%' }}>
                            <Table>
                              <TableHead>
                                <TableRow>

                                  <TableCell align="center">

                                  </TableCell>

                                  {
                                    header.map((val, index) => {
                                      return (
                                        <TableCell align="center">
                                          {val}
                                        </TableCell>
                                      )
                                    })
                                  }
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {schedules.map((n, index) => {

                                  return (
                                    <TableRow
                                      hover
                                      key={index}
                                    >

                                      <TableCell align="left">
                                        {n.studentname}
                                      </TableCell>

                                      {
                                        header.map((val, index) => {
                                          return (
                                            <TableCell align="center">
                                              {JSON.parse(n.results)[val] !== undefined ? JSON.parse(n.results)[val].substr(JSON.parse(n.results)[val].lastIndexOf("/") + 1, JSON.parse(n.results)[val].length) : ""}
                                            </TableCell>
                                          )
                                        })
                                      }
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </Grid>
                          <Grid item xs={12}
                            style={{ marginTop: 10, textAlign: 'right' }}
                          >
                            <Button
                              color="secondary"
                              variant="contained"
                              style={{ marginRight: 10 }}
                              onClick={() => { history.goBack() }}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="secondary"
                              variant="contained"
                              type={'submit'}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                    </Grid>
                    :
                    <Grid container >
                      <Grid item xs={12} sm={3}></Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <div className={classes.row_Div}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div className={classes.boldletter}>Name:</div>
                              <CssTextField
                                required
                                name="test_name"
                                className={classes.inputStyle}
                                style={{ width: 300 }}
                                value={values.test_name}
                                onChange={handleChange}
                              />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              <div className={classes.boldletter} style={{ marginTop: 10 }}>Total Calculation:</div>
                              <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="schemeType" value={values.schemeType} onChange={handleChange}>
                                  <FormControlLabel value="weighted" control={<Radio />} label="Weighted Average" />
                                  <FormControlLabel value="percentages" control={<Radio />} label="Average of Percentages" />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 20 }}>
                          <div className={classes.boldletter}>Sections:</div>
                        </Grid>
                        <Grid container style={{ marginTop: 10 }}>
                          <Grid item xs={12}>
                            {
                              sections.map((val, index) => {
                                return (
                                  <div style={{ width: '100%', marginBottom: 20, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} key={index}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                      <div>Section Name:</div>
                                      <CssTextField
                                        className={classes.recomment_combo}
                                        value={val.name}
                                        onChange={(e) => { handleChangeSchemeData(e, index, 'name') }}
                                      />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                      <div>Out of:</div>
                                      <CssTextField
                                        className={classes.recomment_combo}
                                        value={val.outOf}
                                        onChange={(e) => { handleChangeSchemeData(e, index, 'outof') }}
                                      />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginTop: 10 }}>
                                      <Button
                                        key={index + 2}
                                        color="secondary"
                                        variant="contained"
                                        style={{ marginRight: 10, marginLeft: 10 }}
                                        onClick={() => { handleRemoveSectionItem(index) }}
                                      >
                                        -
                                      </Button>
                                      <Button
                                        key={index + 3}
                                        color="secondary"
                                        variant="contained"
                                        style={{ marginRight: 10 }}
                                        onClick={handleAddSectionItem}
                                      >
                                        +
                                      </Button>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </Grid>
                          <Grid item xs={12}
                            style={{ marginTop: 10, textAlign: 'right' }}
                          >
                            <Button
                              color="secondary"
                              variant="contained"
                              style={{ marginRight: 10 }}
                              onClick={() => { history.goBack() }}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="secondary"
                              variant="contained"
                              type={'submit'}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={3}></Grid>
                    </Grid>
                }
              </CardContent>
            </Card>
          </form>
        )
      }}
    </Formik >
  );
};

ExamAddEditForm.propTypes = {
  update: PropTypes.bool,
  result: PropTypes.object,
  schedules: PropTypes.array,
  className: PropTypes.string,
  itemType: PropTypes.string
};

ExamAddEditForm.defaultProps = {
  result: {},
  schedules: [],
  itemType: PropTypes.string
}

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(ExamAddEditForm);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Divider,
  makeStyles,
  withStyles,
  CardHeader,
  Checkbox,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import 'src/components/global';
import FixedTextField from 'src/components/FixedTextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import httpClient from 'src/utils/httpClient';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

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
        borderRadius: '3px',
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
  search_form: {
    width: 250,
    "@media (max-width: 390px)": { width: '100%' },
  },
  boldletter: {
    fontWeight: 'bold',
    marginRight: 10
  },
  row_container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  row_Div: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center'
  },
  combobox: {
    width: 200,
    marginRight: 10,
    "@media (max-width: 684px)": { marginBottom: 10 },
    "@media (max-width: 377px)": { width: '100%', marginBottom: 10 },
  },
  calendar: {
    "@media (max-width: 599px)": { width: '100% !important' },
  }
}));

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

function createData(first_name, last_name, pack, n, mark) {
  return { first_name, last_name, pack, n, mark };
}

function createData1(name, n) {
  return { name, n };
}

const TextbookInfo = ({ textbook, teachers, students, intl }) => {
  const classes = useStyles();
  const [searchVals, setSearchVals] = React.useState({
    teachers_name: '',
    teachers_status: false,
    students_name: '',
    students_status: false,
  });

  const [state_students, setStudents] = React.useState([])
  const [state_teachers, setTeachers] = React.useState([])
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    setStudents(students);
    setTeachers(teachers);
  }, [students, teachers])

  const handleChangeActivestatus = (name, value) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'teachers_status':
        newdata.teachers_status = value;
        handlefilterActive("teachers", newdata);
        break;
      case 'teachers_name':
        newdata.teachers_name = value.target.value;
        handlefilterActive("teachers", newdata);
        break;
      case 'students_status':
        newdata.students_status = value;
        handlefilterActive("students", newdata);
        break;
      case 'students_name':
        newdata.students_name = value.target.value;
        handlefilterActive("students", newdata);
        break;
    }
    console.log(newdata)
    setSearchVals(newdata)
  }

  const handlefilterActive = (flag, newdata) => {
    let data = { id: textbook.id, newdata: newdata };
    let url;
    if (flag === "teachers")
      url = `api/textbooks/teachers`
    if (flag === "students")
      url = `api/textbooks/students`
    const method = 'post';
    httpClient[method](url, data)
      .then(json => {
        if (json.success && isMountedRef.current) {
          if (flag === "teachers")
            setTeachers(json.teachers);
          if (flag === "students")
            setStudents(json.students);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card className={clsx(classes.root)} >
      <CardHeader title={formatMessage(intl.textbookDetail)} />
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={12} style={{ padding: 15 }}>
          <div className={classes.row_Div} style={{ flexWrap: 'wrap' }}>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Name:</div>
              <div>{textbook.name}</div>
            </div>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Stock:</div>
              <div>{textbook.stock}</div>
            </div>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div>No exam reminder information</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} style={{ padding: 15, height: 600 }}>
          <div className={classes.row_Div} style={{ flexWrap: 'wrap' }}>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Students:</div>
              <CssTextField
                id="stuendt_search"
                className={classes.search_form}
                variant="outlined"
                onChange={(e) => { handleChangeActivestatus("students_name", e) }}
                checked={searchVals.students_name}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  name="only_active"
                  color="primary"
                  style={{ marginLeft: 10 }}
                  onChange={() => { handleChangeActivestatus("students_status", !searchVals.students_status) }}
                  checked={searchVals.students_status}
                />
              }
              label="Only active"
            />
            <div className={classes.row_Div} style={{ marginRight: 20, marginBottom: 0 }}>
              <div className={classes.boldletter}>Total:</div>
              <div>{state_students.length}</div>
            </div>
          </div>
          <TableContainer component={Paper} style={{ height: '100%' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>First Name</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Last Name</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>pack</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>N</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Mark</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state_students.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.firstName}</StyledTableCell>
                    <StyledTableCell>{row.lastName}</StyledTableCell>
                    <StyledTableCell>{row.pack}</StyledTableCell>
                    <StyledTableCell>{row.amount}</StyledTableCell>
                    <StyledTableCell>{row.mark}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} style={{ padding: 15, height: 600, marginTop: 100 }}>
          <div className={classes.row_Div} style={{ flexWrap: 'wrap' }}>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Teachers:</div>
              <CssTextField
                id="teacher_search"
                className={classes.search_form}
                variant="outlined"
                onChange={(e) => { handleChangeActivestatus("teachers_name", e) }}
                checked={searchVals.teachers_name}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  name="only_active"
                  color="primary"
                  style={{ marginLeft: 10 }}
                  onChange={() => { handleChangeActivestatus("teachers_status", !searchVals.teachers_status) }}
                  checked={searchVals.teachers_status}
                />
              }
              label="Only active"
            />
            <div className={classes.row_Div} style={{ marginRight: 20, marginBottom: 0 }}>
              <div className={classes.boldletter}>Total:</div>
              <div>{state_teachers.length}</div>
            </div>
          </div>
          <TableContainer component={Paper} style={{ height: '100%' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Teacher</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>N</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state_teachers.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.amount}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  );
};

TextbookInfo.propTypes = {
  className: PropTypes.string,
  textbook: PropTypes.object.isRequired,
  teachers: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TextbookInfo);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Divider,
  makeStyles,
  withStyles,
  CardHeader,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import 'src/components/global';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {},
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
    marginBottom: 10
  },
  combobox: {
    width: 200,
    marginRight: 10,
    "@media (max-width: 684px)": { marginBottom: 10 },
    "@media (max-width: 377px)": { width: '100%', marginBottom: 10 },
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

function createData(hours, leave, total) {
  return { hours, leave, total };
}

const rows = [
  createData('0 (0 + 0 / 25 (-25)', '0', '0 / 25 (-25)'),
  createData('0 (0 + 0 / 25 (-25)', '0', '0 / 25 (-25)'),
  createData('0 (0 + 0 / 25 (-25)', '0', '0 / 25 (-25)'),
  createData('0 (0 + 0 / 25 (-25)', '0', '0 / 25 (-25)'),
  createData('0 (0 + 0 / 25 (-25)', '0', '0 / 25 (-25)'),
  createData('0 (0 + 0 / 25 (-25)', '0', '0 / 25 (-25)'),
];

const TeacherInfo = ({ teacher, books, observers, intl }) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [demodata, setDemodata] = React.useState([]);

  useEffect(() => {
    let temp = JSON.stringify(teacher);
    let count = (temp.match(/leaveweek/g) || []).length;
    let data = [];
    for (let i = 0; i < count; i++)
      data.push(i)
    setDemodata(data)
    setCount(count);
    console.log(teacher, teacher.holidaysweek1, count)
  }, [teacher])

  const handlegetdetail = (id, flag) => {
    // let key = `holidaysweek${id + 1}`
    // alert(teacher[key])
    let thisweek, scheduledweek, totalthisweek, total = 0, leave, hours;
    switch (id) {
      case 0:
        thisweek = teacher.week1;
        scheduledweek = 0;
        thisweek += teacher.examsweek1;
        totalthisweek = thisweek + scheduledweek;
        total += thisweek + scheduledweek;
        leave = Math.round(teacher.hoursleft) * teacher.holidaysweek1 + teacher.leaveweek1;
        total += leave;
        hours = totalthisweek + "(" + thisweek + scheduledweek + "/" + (teacher.hoursperWeek - leave) + (thisweek - teacher.hoursperWeek - leave) + ")";
        total = total + "/" + teacher.holidaysweek1 + "(" + (total - teacher.hoursperWeek) * (id + 1) + ")";
        break;
      case 1:
        thisweek = teacher.week2;
        scheduledweek = 0;
        thisweek += teacher.examsweek2;
        totalthisweek = thisweek + scheduledweek;
        total += thisweek + scheduledweek;
        leave = Math.round(teacher.hoursleft) * teacher.holidaysweek2 + teacher.leaveweek2;
        total += leave;
        hours = totalthisweek + "(" + thisweek + scheduledweek + "/" + (teacher.hoursperWeek - leave) + (thisweek - teacher.hoursperWeek - leave) + ")";
        total = total + "/" + teacher.holidaysweek2 + "(" + (total - teacher.hoursperWeek) * (id + 1) + ")";
        break;
      case 2:
        thisweek = teacher.week3;
        scheduledweek = 0;
        thisweek += teacher.examsweek3;
        totalthisweek = thisweek + scheduledweek;
        total += thisweek + scheduledweek;
        leave = Math.round(teacher.hoursleft) * teacher.holidaysweek3 + teacher.leaveweek3;
        total += leave;
        hours = totalthisweek + "(" + thisweek + scheduledweek + "/" + (teacher.hoursperWeek - leave) + (thisweek - teacher.hoursperWeek - leave) + ")";
        total = total + "/" + teacher.holidaysweek3 + "(" + (total - teacher.hoursperWeek) * (id + 1) + ")";
        break;
      case 3:
        thisweek = teacher.week4;
        scheduledweek = 0;
        thisweek += teacher.examsweek4;
        totalthisweek = thisweek + scheduledweek;
        total += thisweek + scheduledweek;
        leave = Math.round(teacher.hoursleft) * teacher.holidaysweek4 + teacher.leaveweek4;
        total += leave;
        hours = totalthisweek + "(" + thisweek + scheduledweek + "/" + (teacher.hoursperWeek - leave) + (thisweek - teacher.hoursperWeek - leave) + ")";
        total = total + "/" + teacher.holidaysweek4 + "(" + (total - teacher.hoursperWeek) * (id + 1) + ")";
        break;
    }
    switch (flag) {
      case 'hours':
        return hours;
        break;
      case 'leave':
        return leave;
        break;
      case 'total':
        return total;
        break;
    }
  }

  const handlegetLeave = (id) => {
    return id
  }
  const handlegetTotal = (id) => {
    return id
  }

  return (
    <Card className={clsx(classes.root)} >
      <CardHeader title={`${teacher.name} Detail`} />
      <Divider />
      <Grid container>
        <Grid item xs={12} style={{ padding: 10 }}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>hurs (taught + sch)</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>leave</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demodata.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{handlegetdetail(index, "hours")}</StyledTableCell>
                    <StyledTableCell>{handlegetdetail(index, "leave")}</StyledTableCell>
                    <StyledTableCell>{handlegetdetail(index, "total")}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} style={{ padding: 15 }}>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Hours per week:</div>
              <div>25</div>
            </div>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Weeks this month:</div>
              <div>5</div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} style={{ padding: 15 }}>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Exam suppleme...:</div>
              <div>0 hours (0 classes)</div>
            </div>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Satuday hours:</div>
              <div>0.00</div>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6} style={{ padding: 15 }}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Book</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>N</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.amount}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={6} style={{ padding: 15 }}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Date</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>N</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {observers.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.lessonDate}</StyledTableCell>
                      <StyledTableCell>{row.userName}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

TeacherInfo.propTypes = {
  className: PropTypes.string,
  teacher: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  observers: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TeacherInfo);

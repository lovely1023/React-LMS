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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

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
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  avatar: {
    width: '100%'
  },
  rightdetail_container: {
    padding: 15
  },
  leftdetail_container: {
    padding: 15
  },
  boldletter: {
    fontWeight: 'bold',
    marginBottom: 7,
    marginRight: 7
  },
  nomalletter: {
    marginRight: '2rem'
  },
  rowDiv: {
    width: '100%',
    display: 'flex',
    marginBottom: 7
  }
}));

const LessonInfo = ({ lesson, textbooks, students, intl }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root)} >
      <CardHeader title={formatMessage(intl.lessonDetail)} />
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={6} style={{ padding: 15 }}>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Language:</div>
            <div className={classes.nomalletter}>{lesson.LANGUAGE}</div>
            <div className={classes.boldletter}>Date:</div>
            <div className={classes.nomalletter}>{lesson.lessonDate}</div>
          </div>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Start:</div>
            <div className={classes.nomalletter}>{lesson.startTime}</div>
            <div className={classes.boldletter}>Info:</div>
            <div className={classes.nomalletter}>{lesson.info}</div>
          </div>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Finish:</div>
            <div className={classes.nomalletter}>{lesson.endTime}</div>
            <div className={classes.boldletter}>Duration:</div>
            <div className={classes.nomalletter}>lesson.duration</div>
          </div>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Group:</div>
            <div className={classes.nomalletter}>{lesson.groupName}</div>
          </div>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Level:</div>
            <div className={classes.nomalletter}>{lesson.LEVEL}</div>
          </div>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Teacher:</div>
            <div className={classes.nomalletter}>{lesson.teacher}</div>
          </div>
          <div className={classes.rowDiv}>
            <div className={classes.boldletter}>Topics:</div>
            <div className={classes.nomalletter}>{lesson.topicName}</div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
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
                {textbooks.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.textBookName}</StyledTableCell>
                    <StyledTableCell>{row.unit}</StyledTableCell>
                    <StyledTableCell>{row.pages}</StyledTableCell>
                    <StyledTableCell>{row.exercise}</StyledTableCell>
                    <StyledTableCell>{row.homework}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>First Name</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Last Name</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.firstName}</StyledTableCell>
                    <StyledTableCell>{row.lastName}</StyledTableCell>
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

LessonInfo.propTypes = {
  className: PropTypes.string,
  lesson: PropTypes.object.isRequired,
  textbooks: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(LessonInfo);

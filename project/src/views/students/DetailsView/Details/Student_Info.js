import React, { useEffect, useCallback } from 'react';
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
import Button from '@material-ui/core/Button';
import FixedTextField from '../../../../components/FixedTextField'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import httpClient from 'src/utils/httpClient';
/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        borderRadius: '19px'
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
    marginBottom: 7
  },
  ellipsis: {
    overflow: 'hidden',
    maxWidth: '70%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}));

var arrGroupinfo;

const StudentInfo = ({ student, groupids, noteinfos, textbookinfo, intl, currentLanguage }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [groupinfo, setGroupinfo] = React.useState([]);
  const [statearrGroupinfo, setStateArrGroupinfo] = React.useState([]);
  const [opendialog, setOpendialog] = React.useState(false);
  const [notesVal, setNotesval] = React.useState('');

  const handleClickOpendialog = () => {
    setOpendialog(true);
  };

  const handleClosedialog = () => {
    setOpendialog(false);
  };

  const handleHoursCalcu = (max, useal) => {
    var int_max = 0, int_useal = 0, maxMin = 0, usealMin = 0, leftHour = 0, leftMin = 0, maxhours = max, usualhour = useal;
    if (max !== null) {
      int_max = max.split(":");
      maxMin = parseInt(int_max[0]) * 60 + parseInt(int_max[1]);
    } else {
      maxhours = '00:00';
    }
    if (useal !== null) {
      int_useal = useal.split(":");
      usealMin = parseInt(int_useal[0]) * 60 + parseInt(int_useal[1]);
    } else {
      usualhour = '00:00'
    }
    leftHour = Math.floor((maxMin - usealMin) / 60);
    leftMin = (maxMin - usealMin) % 60;
    if (leftHour < 10)
      leftHour = `0${leftHour}`
    if (leftMin < 10)
      leftMin = `0${leftMin}`
    return (`${usualhour} / ${maxhours} (${leftHour}:${leftMin} left)`)
  }

  useEffect(() => {
    arrGroupinfo = []
    groupids.map((val) => {
      httpClient.get(`api/group/${val.groupid}`)
        .then(json => {
          if (json.success && isMountedRef.current) {
            setStateArrGroupinfo(json.group)
          }
        })
        .catch((error) => {
          console.log('error--->', error);
        });
    })

    let data = '';
    noteinfos.map((val) => {
      data += val.notelist;
    })
    setNotesval(data);
  }, [])

  useEffect(() => {
    handleSetGroupinfo();
  }, [statearrGroupinfo])

  const handleSetGroupinfo = useCallback(async () => {
    if (statearrGroupinfo.length !== 0) {
      await arrGroupinfo.push(statearrGroupinfo)
      await setGroupinfo(arrGroupinfo)
    }
  });

  const handleGroupdetail = (index) => {
    // handleClickOpendialog();
  }

  const handlegetRenewing = (isActive) => {
    let renewStatus = 0;
    if (isActive & 2) {
      renewStatus = 1;
    }
    if (isActive & 4) {
      renewStatus = 2;
    }
    if (renewStatus === 1) {
      return "Not renewing";
    }
    else if (renewStatus === 2) {
      return "Renewing";
    }
    else {
      return "Undecided";
    }
  }

  const handlegetWeekdays = (daysOfWeek) => {
    let daysOfWeekString = '';
    if (daysOfWeek & 16) {
      daysOfWeekString = daysOfWeekString + "Mon ";
    }
    if (daysOfWeek & 8) {
      daysOfWeekString = daysOfWeekString + "Tue ";
    }
    if (daysOfWeek & 4) {
      daysOfWeekString = daysOfWeekString + "Wed ";
    }
    if (daysOfWeek & 2) {
      daysOfWeekString = daysOfWeekString + "Thurs ";
    }
    if (daysOfWeek & 1) {
      daysOfWeekString = daysOfWeekString + "Fri ";
    }
    if (daysOfWeek & 32) {
      daysOfWeekString = daysOfWeekString + "Sat";
    }
    return daysOfWeekString;
  }

  return (
    <Card className={clsx(classes.root)} >
      <CardHeader title={formatMessage(intl.studentDetail)} />
      <Divider />
      <div>
        <Dialog
          open={opendialog}
          onClose={handleClosedialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosedialog} color="primary">
              Disagree
          </Button>
            <Button onClick={handleClosedialog} color="primary" autoFocus>
              Agree
          </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={4} className={classes.leftdetail_container}>
              <img
                className={classes.avatar}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTox5GjcAiQFx_AhZfdb1Y4Y5TViXM613ATDg&usqp=CAU"
                alt="avatar"
              >
              </img>
            </Grid>
            <Grid item xs={8} className={classes.rightdetail_container} style={{ margin: 'auto' }}>
              <div>
                <div style={student[0].pending === "Y" ? { backgroundColor: '#febebe', padding: 5 } : null}>
                  <div style={{ marginBottom: 7 }}>{student[0].firstName}</div>
                  <div style={{ marginBottom: 7 }}>{student[0].lastName}</div>
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div className={classes.boldletter} style={{ marginRight: 7 }}>ID:</div>
                  <div style={{ marginBottom: 7 }}>{student[0].IDNumber}</div>
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                  <div className={classes.boldletter} style={{ marginRight: 7 }}>Postcode:</div>
                  <div style={{ marginBottom: 7 }}>{student[0].post_code}</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={4} className={classes.leftdetail_container}>
              <div className={classes.boldletter}>Level:</div>
              <div className={classes.boldletter}>Phone:</div>
              <div className={classes.boldletter}>Email:</div>
              <div className={classes.boldletter}>Enrolled:</div>
            </Grid>
            <Grid item xs={8} className={classes.rightdetail_container}>
              <div style={{ marginBottom: 7 }}>{student[0].LEVEL ? student[0].LEVEL : ''}</div>
              <div style={{ marginBottom: 7 }}>{student[0].tel ? student[0].tel : ''}</div>
              <div style={{ marginBottom: 7 }}>{student[0].email ? student[0].email : ''}</div>
              <div style={{ marginBottom: 7 }}>{student[0].enrolled ? student[0].enrolled : ''}</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={5} className={classes.leftdetail_container} style={{ paddingBottom: 0 }}>
                  <div className={classes.boldletter}>Status:</div>
                </Grid>
                <Grid item xs={7} className={classes.leftdetail_container} style={{ paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].status}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid container>
                <Grid item xs={4} className={classes.leftdetail_container} style={{ paddingBottom: 0 }}>
                  <div className={classes.boldletter}>last:</div>
                </Grid>
                <Grid item xs={8} className={classes.leftdetail_container} style={{ paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].last}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={3} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className={classes.boldletter}>Course:</div>
                </Grid>
                <Grid item xs={9} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].startDate} - {student[0].endDate}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={2} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                </Grid>
                <Grid item xs={10} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{handlegetRenewing(student[0].isActive)}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div className={classes.boldletter}>Payment:</div>
              <div className={classes.boldletter}>Hours:</div>
            </Grid>
            <Grid item xs={9} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div style={{ marginBottom: 7 }}>{student[0].duedate}</div>
              <div style={{ marginBottom: 7 }}>{handleHoursCalcu(student[0].maxHours, student[0].usualHour)}</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={8} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className={classes.boldletter}>Renewals:</div>
                </Grid>
                <Grid item xs={4} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].renewals}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid container>
                <Grid item xs={4} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className={classes.boldletter}>Price:</div>
                </Grid>
                <Grid item xs={8} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].price}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div className={classes.boldletter}>Days:</div>
            </Grid>
            <Grid item xs={9} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div style={{ marginBottom: 7 }}>{handlegetWeekdays(student[0].daysOfWeek)}</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={8} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className={classes.boldletter}>Library:</div>
                </Grid>
                <Grid item xs={4} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].libraryAccess}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid container>
                <Grid item xs={4} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className={classes.boldletter}>TOEIC:</div>
                </Grid>
                <Grid item xs={8} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div style={{ marginBottom: 7 }}>{student[0].toeicaccess}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div className={classes.boldletter}>Groups:</div>
            </Grid>
            <Grid item xs={9} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <TableContainer component={Paper} style={{ height: 200 }}>
                <Table className={classes.table} aria-label="customized table">
                  <TableBody>
                    {groupinfo.map((row, index) => (
                      <StyledTableRow key={index} onClick={() => { handleGroupdetail(index) }}>
                        <StyledTableCell key={index + 1}>{row.time}</StyledTableCell>
                        <StyledTableCell className={classes.ellipsis} key={index + 2}>{row.name}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} className={classes.rightdetail_container}>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Book</StyledTableCell>
                      <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Pack</StyledTableCell>
                      <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Date</StyledTableCell>
                      <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Mark</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {textbookinfo.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell key={index + 1}>{row.name}</StyledTableCell>
                        <StyledTableCell key={index + 2}>{row.pack}</StyledTableCell>
                        <StyledTableCell key={index + 3}>{row.date}</StyledTableCell>
                        <StyledTableCell key={index + 4}>{row.mark}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container style={{ paddingTop: 15 }}>
              <Grid item xs={3} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Button variant="contained" color="primary" style={{ fontSize: 12 }}>
                  Notes ({noteinfos ? noteinfos.length : '0'})
                </Button>
              </Grid>
              <Grid item xs={9} className={classes.leftdetail_container} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <CssTextField
                  variant="outlined"
                  id="custom-css-outlined-input"
                  style={{ width: '100%' }}
                  disabled
                  multiline
                  rows={6}
                  value={notesVal}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

StudentInfo.propTypes = {
  className: PropTypes.string,
  groupids: PropTypes.array.isRequired,
  noteinfos: PropTypes.array.isRequired,
  student: PropTypes.array.isRequired,
  textbookinfo: PropTypes.array.isRequired
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(StudentInfo);

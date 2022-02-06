import React from 'react';
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
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'src/components/global';
import FixedTextField from 'src/components/FixedTextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import {
  getLevels
} from 'src/localstorage';
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

function createData(name, level, startdate, enddate, renew) {
  return { name, level, startdate, enddate, renew };
}

const rows = [
  createData('Frozen yoghurt', 'Advanced', '06-07-2020', '03-03-2021', 'renew'),
];

const GroupInfo = ({ group, intl }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)} >
      <CardHeader title={formatMessage(intl.groupDetail)} />
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={3} style={{ padding: 15 }}></Grid>
        <Grid item xs={12} sm={6} style={{ padding: 10 }}>
          <div className={classes.row_container}>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Name:</div>
              <div>111Grupo Prueba</div>
            </div>
            <div className={classes.row_Div}>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginRight: 10 }}
              >
                Netes
              </Button>
              <Button
                color="secondary"
                variant="contained"
              >
                Lessons
              </Button>
            </div>
          </div>
          <div className={classes.row_container}>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Mon:</div>
              <div>| (1)</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Tue:</div>
              <div>| (1)</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Wed:</div>
              <div>| (1)</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Thurs:</div>
              <div>| (1)</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Fri:</div>
              <div>| (1)</div>
            </div>
          </div>

          <div className={classes.row_container}>
            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Exam:</div>
              <div>No scheduled exam</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Room:</div>
              <div></div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Teacher:</div>
              <div>Any</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Level:</div>
              <div>Pre-Int</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Time:</div>
              <div>00:00 - 00:00</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Textbook:</div>
              <div>EF4 Pre-Int</div>
            </div>

            <div className={classes.row_Div}>
              <div className={classes.boldletter}>Unit:</div>
              <div>1</div>
            </div>
          </div>

          <div className={classes.row_container}>
            <div className={classes.row_Div} style={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <div className={classes.boldletter}>Students Level:</div>
              <Autocomplete
                id="payments"
                options={global.classis.length !== 0 ? global.classis : JSON.parse(global_levels)}
                getOptionLabel={(option) => option}
                className={classes.combobox}
                renderInput={(params) => <CssTextField {...params} />}
              />
              <Button
                color="secondary"
                variant="contained"
                style={{ marginRight: 10 }}
              >
                Apply
              </Button>
              <div className={classes.boldletter}>Total:</div>
              <div>1</div>
            </div>
          </div>
          <div className={classes.row_container}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Student Name</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Level</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>StartDate</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>End Date</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Renew</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.level}</StyledTableCell>
                      <StyledTableCell>{row.startdate}</StyledTableCell>
                      <StyledTableCell>{row.enddate}</StyledTableCell>
                      <StyledTableCell>{row.renew}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <Grid item xs={12} sm={3} style={{ padding: 15 }}></Grid>
      </Grid>
    </Card>
  );
};

GroupInfo.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object.isRequired
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(GroupInfo);

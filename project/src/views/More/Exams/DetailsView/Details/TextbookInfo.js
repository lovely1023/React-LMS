import React from 'react';
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

const rows = [
  createData('Adrian', 'Langoria Salvador', '', '1', ''),
  createData('Adrian', 'Langoria Salvador', '', '1', ''),
  createData('Adrian', 'Langoria Salvador', '', '1', ''),
  createData('Adrian', 'Langoria Salvador', '', '1', ''),
  createData('Adrian', 'Langoria Salvador', '', '1', ''),
  createData('Adrian', 'Langoria Salvador', '', '1', ''),
];

const teacher_rows = [
  createData1('Gareth', '1'),
  createData1('Gareth', '1'),
  createData1('Gareth', '1'),
  createData1('Gareth', '1'),
  createData1('Gareth', '1'),
];

const TextbookInfo = ({ textbook, intl }) => {
  const classes = useStyles();

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
        <Grid item xs={12} style={{ padding: 15 }}>
          <div className={classes.row_Div} style={{ flexWrap: 'wrap' }}>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Students:</div>
              <CssTextField
                id="stuendt_search"
                style={{ width: 250 }}
                variant="outlined"
              // value={values.maxHours}
              // onChange={handleChange}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  name="only_active"
                  color="primary"
                  style={{ marginLeft: 10 }}
                />
              }
              label="Only active"
            />
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Total:</div>
              <div>27</div>
            </div>
          </div>
          <TableContainer component={Paper}>
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
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.first_name}</StyledTableCell>
                    <StyledTableCell>{row.last_name}</StyledTableCell>
                    <StyledTableCell>{row.pack}</StyledTableCell>
                    <StyledTableCell>{row.n}</StyledTableCell>
                    <StyledTableCell>{row.mark}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} style={{ padding: 15 }}>
          <div className={classes.row_Div} style={{ flexWrap: 'wrap' }}>
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Teachers:</div>
              <CssTextField
                id="teacher_search"
                style={{ width: 250 }}
                variant="outlined"
              // value={values.maxHours}
              // onChange={handleChange}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  name="only_active"
                  color="primary"
                  style={{ marginLeft: 10 }}
                />
              }
              label="Only active"
            />
            <div className={classes.row_Div} style={{ marginRight: 20 }}>
              <div className={classes.boldletter}>Total:</div>
              <div>3</div>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>Teacher</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: 'rgb(223, 226, 249)', color: '#000' }}>N</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacher_rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.n}</StyledTableCell>
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
  textbook: PropTypes.object.isRequired
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  currentLanguage: store.intl.language,
})

export default connectIntl(mapStateToProps)(TextbookInfo);

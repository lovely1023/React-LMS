import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  SvgIcon,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  IconButton,
  TablePagination,
  withStyles
} from '@material-ui/core';
import {
  Search as SearchIcon
} from 'react-feather';
import Grid from '@material-ui/core/Grid';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FixedTextField from '../../../components/FixedTextField'
import 'src/components/global';
import { connectIntl, formatMessage } from 'src/contexts/Intl';
import {
  getAllStorageUsers
} from 'src/localstorage';

var { global_allusers } = getAllStorageUsers();

const CssTextField = withStyles({
  root: {
    '& label': {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: 20,
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
        borderRadius: '10px',
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
  queryField: {
    // width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  boldletter: {
    fontWeight: 'bold',
  },
  row_container: {
    // width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 25,
    "@media (max-width: 599px)": { justifyContent: 'space-between' },
  },
  totalcontainer: {
    display: 'flex',
    alignItems: 'center',
    "@media (max-width: 875px)": {
      width: '100%',
      justifyContent: 'space-around',
      marginTop: 20
    },
  }
}));

const Results = ({
  intl,
  bills,
  totalcount,
  totalPrice,
  className,
  handleGetData,
  handleSearchData,
  params
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchVals, setSearchvals] = React.useState({
    user: '',
    startDate: '',
    endDate: '',
    cash: false,
    other: false,
    card: false,
    transfer: false,
    company: false,
  });
  const [user, setUser] = React.useState('')

  const handlegetTypeint = () => {
    let typeInt = 0;
    if (searchVals.cash) {
      typeInt = typeInt | 1;
    }
    if (searchVals.card) {
      typeInt = typeInt | 2;
    }
    if (searchVals.other) {
      typeInt = typeInt | 4;
    }
    if (searchVals.transfer) {
      typeInt = typeInt | 8;
    }
    if (searchVals.company) {
      typeInt = typeInt | 16;
    }
    if (typeInt == 15) {
      typeInt = 0;
    }
    return typeInt;
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVals: searchVals, typeInt: handlegetTypeint(), pagenum: parseInt(newPage + '0'), limitnum: limit }
    if (searchVals.user !== '' || searchVals.startDate !== '' || searchVals.endDate !== '' || searchVals.cash !== false || searchVals.other !== false || searchVals.card !== false || searchVals.transfer !== false || searchVals.company !== false)
      handleSearchData(data);
    else
      handleGetData(parseInt(newPage + '0'), limit);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVals: searchVals, typeInt: handlegetTypeint(), pagenum: page, imitnum: event.target.value }
    if (searchVals.user !== '' || searchVals.startDate !== '' || searchVals.endDate !== '' || searchVals.cash !== false || searchVals.other !== false || searchVals.card !== false || searchVals.transfer !== false || searchVals.company !== false)
      handleSearchData(data);
    else
      handleGetData(page, event.target.value);
  };

  useEffect(() => {
    if (params === '{studentId}') {
      let data = { searchVals: searchVals, typeInt: handlegetTypeint(), pagenum: 0, limitnum: 10 }
      if (searchVals.user === '' && searchVals.startDate === '' && searchVals.endDate === '' && searchVals.cash === false && searchVals.other === false && searchVals.card === false && searchVals.transfer === false && searchVals.company === false) {
        handleGetData(0, 10)
      }

      handleSearchData(data);
    }
  }, [searchVals])

  const handleChangeSearchvals = (name, value) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'users':
        let data = global.Allusers.length !== 0 ? global.Allusers : JSON.parse(global_allusers);
        if (value !== null) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === value.name) {
              setUser(value);
              newdata.user = data[i].id
            }
          }
        } else {
          newdata.user = '';
          setUser('');
        }
        break;
      case 'startDate':
        newdata.startDate = value;
        break;
      case 'endDate':
        newdata.endDate = value;
        break;
      case 'cash':
        newdata.cash = value;
        break;
      case 'other':
        newdata.other = value;
        break;
      case 'card':
        newdata.card = value;
        break;
      case 'transfer':
        newdata.transfer = value;
        break;
      case 'company':
        newdata.company = value;
        break;
    }
    setSearchvals(newdata)
  };

  const handlegetBillnumber = (Dtime, num, type) => {
    let typeString = 'TR', billNumber = '';
    if (type === 1)
      typeString = "E";
    if (type === 2)
      typeString = "T";
    if (type === 4)
      typeString = "O";
    if (type === 16)
      typeString = "EM";
    if (type === 32)
      billNumber = "Pro Forma";
    else
      billNumber = typeString + "-" + Dtime.substr(0, 2) + "-" + num;
    return billNumber;
  }

  return (
    <Card className={clsx(classes.root, className)} >
      <Box p={2} >
        <Grid container >
          <div className={classes.boldletter} style={{ fontSize: 20, width: '100%', marginBottom: 30, paddingBottom: 25, borderBottom: '2px solid rgb(214,227,224)' }}>Search Bills:</div>
          <Grid container style={{
            marginBottom: 30, paddingBottom: 25, borderBottom: '2px solid rgb(214,227,224)'
          }}>
            <Grid item xs={12} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Autocomplete
                name="users"
                options={global.Allusers.length !== 0 ? global.Allusers : JSON.parse(global_allusers)}
                getOptionLabel={(option) => option.name}
                style={{ width: 230, height: 50 }}
                renderInput={(params) => <CssTextField {...params} label="User" variant="outlined" />}
                onChange={(event, value) => { handleChangeSearchvals('users', value) }}
                value={user}
              />
              <div className={classes.row_container}>
                <div className={classes.boldletter}>Start Date:</div>
                <KeyboardDatePicker
                  required
                  format="MM/DD/YYYY"
                  name="startDate"
                  style={{ width: '65%' }}
                  value={searchVals.startDate}
                  onChange={(date) => handleChangeSearchvals('startDate', date)}
                />
              </div>
              <div className={classes.row_container}>
                <div className={classes.boldletter}>End Date:</div>
                <KeyboardDatePicker
                  required
                  format="MM/DD/YYYY"
                  name="endDate"
                  style={{ width: '65%' }}
                  value={searchVals.endDate}
                  onChange={(date) => handleChangeSearchvals('endDate', date)}
                />
              </div>
            </Grid>
            < Grid item xs={12} style={{ paddingLeft: 10 }} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="cash"
                    color="primary"
                    value={searchVals.cash}
                    onChange={(e) => handleChangeSearchvals('cash', !searchVals.cash)}
                  />
                }
                label="Cash "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="other"
                    color="primary"
                    value={searchVals.other}
                    onChange={(e) => handleChangeSearchvals('other', !searchVals.other)}
                  />
                }
                label="Other "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="card"
                    color="primary"
                    value={searchVals.card}
                    onChange={(e) => handleChangeSearchvals('card', !searchVals.card)}
                  />
                }
                label="Card "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="transfer"
                    color="primary"
                    value={searchVals.transfer}
                    onChange={(e) => handleChangeSearchvals('transfer', !searchVals.transfer)}
                  />
                }
                label="Transfer "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="company"
                    color="primary"
                    value={searchVals.company}
                    onChange={(e) => handleChangeSearchvals('company', !searchVals.company)}
                  />
                }
                label="Company "
              />
              <div className={classes.totalcontainer}>
                <div className={classes.boldletter}>Total:</div>
                <div>{totalPrice}</div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell align="center">
                  Date
                </TableCell>

                <TableCell align="center">
                  Student
                </TableCell>

                <TableCell align="center">
                  User
                </TableCell>

                <TableCell align="center">
                  Bill number
								</TableCell>

                <TableCell align="center">
                  Price
								</TableCell>

                <TableCell align="center">
                  Status
								</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((n) => {

                return (
                  <TableRow
                    hover
                    key={n.id}
                  >

                    <TableCell align="center">
                      {n.dTime.substr(0, 10)} {n.dTime.substr(11, 8)}
                    </TableCell>

                    <TableCell align="center">
                      {n.student}
                    </TableCell>

                    <TableCell align="center">
                      {n.user}
                    </TableCell>

                    <TableCell align="center">
                      {handlegetBillnumber(n.dTime, n.billNumber, n.type)}
                    </TableCell>

                    <TableCell align="center">
                      {n.price}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlBillDetail, { billId: n.id, billNum: handlegetBillnumber(n.dTime, n.billNumber, n.type) })}
                        title="Detail"
                      >
                        <SvgIcon fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalcount}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  bills: PropTypes.array.isRequired,
  totalcount: PropTypes.number,
  totalPrice: PropTypes.number,
  params: PropTypes.string
};

Results.defaultProps = {
  bills: [],
  totalcount: 0,
  totalPrice: 0,
  params: ''
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
})

const mapDispatchToProps = (dispatch) => ({
  // 
})

export default connectIntl(
  mapStateToProps,
  mapDispatchToProps
)(Results);

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  Button,
  SvgIcon,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  makeStyles,
  IconButton,
  InputAdornment,
  TablePagination,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Search as SearchIcon
} from 'react-feather';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'src/components/global';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker'
import moment from 'moment';
import ExportCSV from 'src/components/ExportCSV';
import {
  handleDelete,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 500
  },
  queryField: {
    width: '100%',
    marginBottom: 10
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
  calendar: {
    "@media (max-width: 599px)": { width: '100% !important' },
  },
  rowDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10
  },
  boldLetter: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 17
  }
}));

const Results = ({
  intl,
  certifications,
  objTotal,
  className,
  deleteCertification,
  deleteCertifications,
  handleSearchData,
  totalcount
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [searchVals, setSearchvals] = React.useState({
    name: '',
    startdate: '',
    enddate: '',
    current: false,
    certificateId: 0
  })

  const handleSearchChange = (name, event) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'name':
        newdata.name = event.target.value;
        break;
      case 'current':
        newdata.current = event;
        break;
      case 'startdate':
        newdata.startdate = moment(event).format("YYYY-MM-DD");
        break;
      case 'enddate':
        newdata.enddate = moment(event).format("YYYY-MM-DD");
        break;
      case 'studentid':
        newdata.certificateId = event;
        break;
    }
    setSearchvals(newdata)
  };

  useEffect(() => {
    if (searchVals.name === '' && searchVals.current === false && searchVals.startdate === '' && searchVals.enddate === '') {
      let data = { pagenum: 0, limitnum: 10, searchVal: { name: '', startdate: '', enddate: '', current: false, certificateId: 0 } };
      handleSearchData(data)
    }
    else {
      let data = { pagenum: 0, limitnum: 10, searchVal: searchVals };
      handleSearchData(data);
    }
  }, [searchVals])

  const handleSelectAllCertifications = (event) => {
    setSelectedCertifications(event.target.checked
      ? certifications.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedCertifications.includes(newId)) {
      setSelectedCertifications((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedCertifications((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVal: searchVals, pagenum: parseInt(newPage + '0'), limitnum: limit }
    handleSearchData(data)
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVal: searchVals, pagenum: page, limitnum: event.target.value }
    handleSearchData(data)
  };

  const enableBulkOperations = selectedCertifications.length > 0;
  const selectedSomeCertifications = selectedCertifications.length > 0 && selectedCertifications.length < certifications.length;
  const selectedAllCertifications = selectedCertifications.length === certifications.length;

  const [startdate, setStartDate] = React.useState('');
  const [enddate, setEndDate] = React.useState('');

  const handleChangeCalender = (name, date) => {
    if (name === "startdate") setStartDate(date);
    else setEndDate(date);
  }

  return (
    <Card className={clsx(classes.root, className)} >
      <Box p={2} minHeight={56} display="flex" flexWrap='wrap' alignItems="center" >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          value={searchVals.name}
          onChange={(e) => handleSearchChange('name', e)}
          placeholder={formatMessage(intl.search)}
        />
        <div className={classes.rowDiv}>
          <div className={classes.boldLetter}>Issued From:</div>
          <DatePicker
            onChange={(date) => { handleChangeCalender("startdate", date) }}
            value={startdate}
            onClickDay={(value) => { handleSearchChange("startdate", value) }}
            onClickMonth={(value) => { handleSearchChange("startdate", value) }}
          />
        </div>
        <div className={classes.rowDiv}>
          <div className={classes.boldLetter}>To:</div>
          <DatePicker
            onChange={(date) => { handleChangeCalender("enddate", date) }}
            value={enddate}
            onClickDay={(value) => { handleSearchChange("enddate", value) }}
            onClickMonth={(value) => { handleSearchChange("enddate", value) }}
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              name="current_student"
              color="primary"
              style={{ marginLeft: 10 }}
              onChange={() => { handleSearchChange("current", !searchVals.current) }}
              checked={searchVals.current}
            />
          }
          label="Current Student"
        />
        <ExportCSV
          csvData={objTotal}
          fileName={`Certificates ${moment(new Date()).format("YYYY-MM-DD")}`}
        />
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCertifications}
              onChange={handleSelectAllCertifications}
              indeterminate={selectedSomeCertifications}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => handleDeleteAllSelected(
                selectedCertifications,
                deleteCertifications,
                setSelectedCertifications,
                enqueueSnackbar,
                { ...intl, formatMessage }
              )}
            >
              {formatMessage(intl.deleteAll)}
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCertifications}
                    onChange={handleSelectAllCertifications}
                    indeterminate={selectedSomeCertifications}
                  />
                </TableCell>

                <TableCell align="center">
                  Number
                </TableCell>

                <TableCell align="center">
                  Student
                </TableCell>

                <TableCell align="center">
                  User
                </TableCell>

                <TableCell align="center">
                  Issued
                </TableCell>

                <TableCell align="center">
                  Status
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {certifications.map((n, index) => {
                const isCertificationselected = selectedCertifications.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => { handleSearchChange('studentid', n.studentid) }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCertificationselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isCertificationselected}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {n.certNumber}
                    </TableCell>

                    <TableCell align="center">
                      {n.studentName}
                    </TableCell>

                    <TableCell align="center">
                      {n.userName}
                    </TableCell>

                    <TableCell align="center">
                      {n.issueDate}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlCertificationDetail, { certificationId: n.id })}
                        title="Detail"
                      >
                        <SvgIcon fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlCertificationEdit, { certificationId: n.id })}
                        title="Edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(
                          n.id,
                          deleteCertification,
                          enqueueSnackbar,
                          { ...intl, formatMessage }
                        )}
                        title="Delete"
                      >
                        <SvgIcon fontSize="small">
                          <HighlightOffIcon />
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
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card >
  );
};

Results.propTypes = {
  className: PropTypes.string,
  certifications: PropTypes.array.isRequired,
  objTotal: PropTypes.array.isRequired,
};

Results.defaultProps = {
  certifications: [],
  objTotal: []
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

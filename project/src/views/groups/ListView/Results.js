import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import { useSnackbar } from 'notistack';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';

/* utils */
import {
  applySort,
  applyFilters,
  applyPagination,
  sortOptionsDefault,
  handleDelete,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 450,
    "@media (max-width: 500px)": { width: '100%' },
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
  }
}));

const Results = ({
  intl,
  groups,
  totalcount,
  className,
  deleteGroup,
  deleteGroups,
  handleGetData,
  handleSearchData
}) => {
  const classes = useStyles();
  const [filters] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const [searchVals, setSearchvals] = React.useState({
    name: '',
    groups: true,
    private: false,
    hour: false,
    day: false,
    friday: false,
    saturday: false,
  });

  const handleChangeSearchvals = (name, value) => {
    let newdata = { ...searchVals }
    switch (name) {
      case 'name':
        newdata.name = value.target.value;
        break;
      case 'groups':
        newdata.groups = value;
        break;
      case 'private':
        newdata.private = value;
        break;
      case 'hour':
        newdata.hour = value;
        break;
      case 'day':
        newdata.day = value;
        break;
      case 'friday':
        newdata.friday = value;
        break;
      case 'saturday':
        newdata.saturday = value;
        break;
    }
    setSearchvals(newdata)
  };

  useEffect(() => {
    let data = { searchVals: searchVals, pagenum: 0, limitnum: 10 }
    if (searchVals.name === '' && searchVals.groups === false && searchVals.private === false && searchVals.hour === false && searchVals.day === false && searchVals.friday === false && searchVals.saturday === false) {
      handleGetData(0, 10)
    }
    handleSearchData(data);
  }, [searchVals])

  const handleSelectAllGroups = (event) => {
    setSelectedGroups(event.target.checked
      ? groups.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedGroups.includes(newId)) {
      setSelectedGroups((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedGroups((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVals: searchVals, pagenum: parseInt(newPage + '0'), limitnum: limit }
    if (searchVals.name !== '' || searchVals.groups !== false || searchVals.private !== false || searchVals.hour !== false || searchVals.day !== false || searchVals.friday !== false || searchVals.saturday !== false)
      handleSearchData(data)
    else
      handleGetData(parseInt(newPage + '0'), limit);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVals: searchVals, pagenum: page, limitnum: event.target.value }
    if (searchVals.name !== '' || searchVals.groups !== false || searchVals.private !== false || searchVals.hour !== false || searchVals.day !== false || searchVals.friday !== false || searchVals.saturday !== false)
      handleSearchData(data)
    else
      handleGetData(page, event.target.value);
  };

  const filteredGroups = applyFilters(groups, query, filters);
  const sortedGroups = applySort(filteredGroups, sort);
  const enableBulkOperations = selectedGroups.length > 0;
  const selectedSomeGroups = selectedGroups.length > 0 && selectedGroups.length < groups.length;
  const selectedAllGroups = selectedGroups.length === groups.length;

  return (
    <Card className={clsx(classes.root, className)} >
      <Box p={2} alignItems="center" >
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
          onChange={(e) => handleChangeSearchvals('name', e)}
          placeholder={formatMessage(intl.search)}
        />
        <Grid container >
          <Grid item xs={12} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="show_groups"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("groups", !searchVals.groups) }}
                  checked={searchVals.groups}
                />
              }
              label="Show Groups"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="show_private"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("private", !searchVals.private) }}
                  checked={searchVals.private}
                />
              }
              label="Show Private"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hour"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("hour", !searchVals.hour) }}
                  checked={searchVals.hour}
                />
              }
              label="1 hour"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="days"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("day", !searchVals.day) }}
                  checked={searchVals.day}
                />
              }
              label="2 days"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="fri"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("friday", !searchVals.friday) }}
                  checked={searchVals.friday}
                />
              }
              label="Fri"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="sat"
                  color="primary"
                  onChange={() => { handleChangeSearchvals("saturday", !searchVals.saturday) }}
                  checked={searchVals.saturday}
                />
              }
              label="Sat"
            />
          </Grid>
        </Grid>

      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllGroups}
              onChange={handleSelectAllGroups}
              indeterminate={selectedSomeGroups}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => handleDeleteAllSelected(
                selectedGroups,
                deleteGroups,
                setSelectedGroups,
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
                    checked={selectedAllGroups}
                    onChange={handleSelectAllGroups}
                    indeterminate={selectedSomeGroups}
                  />
                </TableCell>

                <TableCell align="center">
                  Time
                </TableCell>

                <TableCell align="center">
                  Group
                </TableCell>

                <TableCell align="center">
                  Textbook
                </TableCell>

                <TableCell align="center">
                  Unit
								</TableCell>

                <TableCell align="center">
                  Teacher
								</TableCell>

                <TableCell align="center">
                  Room
								</TableCell>

                <TableCell align="center">
                  Status
								</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((n, index) => {
                const isGroupselected = selectedGroups.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isGroupselected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isGroupselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isGroupselected}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {n.time}
                    </TableCell>

                    <TableCell align="center">
                      {n.name}
                    </TableCell>

                    <TableCell align="center">
                      {n.textbook}
                    </TableCell>

                    <TableCell align="center">
                      {n.unit}
                    </TableCell>

                    <TableCell align="center">
                      {n.teacher}
                    </TableCell>

                    <TableCell align="center">
                      {n.room}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlGroupDetail, { groupId: n.id })}
                        title="Detail"
                      >
                        <SvgIcon fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlGroupEdit, { groupId: n.id })}
                        title="Edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(
                          n.id,
                          deleteGroup,
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
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  groups: PropTypes.array.isRequired,
  totalcount: PropTypes.number
};

Results.defaultProps = {
  groups: [],
  totalcount: 0,
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

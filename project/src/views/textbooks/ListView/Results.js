import React, { useState, useEffect } from 'react';

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

/* utils */
import {
  applySort,
  handleDelete,
  applyFilters,
  sortOptionsDefault,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
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
  textbooks,
  totalcount,
  className,
  deleteTextbook,
  deleteTextbooks,
  handleGetData,
  handleSearchData
}) => {
  const classes = useStyles();
  const [filters] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTextbooks, setSelectedTextbooks] = useState([]);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const [searchVals, setSearchvals] = React.useState({
    name: '',
  });

  const handleSearchChange = (event) => {
    let newdata = { ...searchVals }
    newdata.name = event.target.value;
    setSearchvals(newdata)
  };

  useEffect(() => {
    let data = { searchVals: searchVals, pagenum: 0, limitnum: 10 }
    if (searchVals.name === '')
      handleGetData(0, 10)
    handleSearchData(data);
  }, [searchVals])

  const handleSelectAllTextbooks = (event) => {
    setSelectedTextbooks(event.target.checked
      ? textbooks.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedTextbooks.includes(newId)) {
      setSelectedTextbooks((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedTextbooks((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVals: searchVals, pagenum: parseInt(newPage + '0'), limitnum: limit }
    if (searchVals.name !== '')
      handleSearchData(data);
    else
      handleGetData(parseInt(newPage + '0'), limit);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVals: searchVals, pagenum: page, imitnum: event.target.value }
    if (searchVals.name !== '')
      handleSearchData(data);
    else
      handleGetData(page, event.target.value);
  };

  const filteredTextbooks = applyFilters(textbooks, query, filters);
  const sortedTextbooks = applySort(filteredTextbooks, sort);
  const enableBulkOperations = selectedTextbooks.length > 0;
  const selectedSomeTextbooks = selectedTextbooks.length > 0 && selectedTextbooks.length < textbooks.length;
  const selectedAllTextbooks = selectedTextbooks.length === textbooks.length;

  return (
    <Card className={clsx(classes.root, className)} >
      <Box p={2} minHeight={56} display="flex" alignItems="center" >
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
          value={searchVals.name}
          variant="outlined"
          onChange={handleSearchChange}
          placeholder={formatMessage(intl.search)}
        />
        <Box flexGrow={1} />
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllTextbooks}
              onChange={handleSelectAllTextbooks}
              indeterminate={selectedSomeTextbooks}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => handleDeleteAllSelected(
                selectedTextbooks,
                deleteTextbooks,
                setSelectedTextbooks,
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
                    checked={selectedAllTextbooks}
                    onChange={handleSelectAllTextbooks}
                    indeterminate={selectedSomeTextbooks}
                  />
                </TableCell>

                <TableCell align="center">
                  Name
                </TableCell>

                <TableCell align="center">
                  Given
                </TableCell>

                <TableCell align="center">
                  Stock
                </TableCell>

                <TableCell align="center">
                  Status
								</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {textbooks.map((n, index) => {
                const isTextbookselected = selectedTextbooks.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isTextbookselected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isTextbookselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isTextbookselected}
                      />
                    </TableCell>

                    <TableCell align="center">
                      {n.name}
                    </TableCell>

                    <TableCell align="center">
                      {n.totalGiven}
                    </TableCell>

                    <TableCell align="center">
                      {n.stock}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlTextbookDetail, { textbookId: n.id })}
                        title="Detail"
                      >
                        <SvgIcon fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={formatMessage(intl.urlTextbookEdit, { textbookId: n.id })}
                        title="Edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(
                          n.id,
                          deleteTextbook,
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
  textbooks: PropTypes.array.isRequired,
  totalcount: PropTypes.number.isRequired
};

Results.defaultProps = {
  textbooks: [],
  totalcount: 0
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

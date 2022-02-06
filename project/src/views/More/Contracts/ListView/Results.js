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
  getComparator,
  applyPagination,
  sortOptionsDefault,
  descendingComparator,
  handleDeleteAllSelected,
} from 'src/utils/defaultTableSettings';
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
  totalcount,
  contracts,
  className,
  deletecontract,
  deletecontracts,
  handleSearchData,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedContracts, setSelectedContracts] = useState([]);
  const [searchVals, setSearchvals] = React.useState({
    name: ''
  })

  const handleChangeSearchVal = (event) => {
    let newdata = { ...searchVals }
    newdata.name = event.target.value;
    setSearchvals(newdata)
  };

  useEffect(() => {
    let data = { pagenum: 0, limitnum: 10, searchVal: searchVals };
    handleSearchData(data);
  }, [searchVals])

  const handleSelectAllContracts = (event) => {
    setSelectedContracts(event.target.checked
      ? contracts.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedContracts.includes(newId)) {
      setSelectedContracts((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedContracts((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    let data = { searchVal: searchVals, pagenum: parseInt(newPage + '0'), limitnum: limit }
    handleSearchData(data);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    let data = { searchVal: searchVals, pagenum: page, imitnum: event.target.value }
    handleSearchData(data);
  };

  const enableBulkOperations = selectedContracts.length > 0;
  const selectedSomeContracts = selectedContracts.length > 0 && selectedContracts.length < contracts.length;
  const selectedAllContracts = selectedContracts.length === contracts.length;

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
          onChange={handleChangeSearchVal}
          placeholder={formatMessage(intl.search)}
        />
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllContracts}
              onChange={handleSelectAllContracts}
              indeterminate={selectedSomeContracts}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={() => handleDeleteAllSelected(
                selectedContracts,
                deletecontracts,
                setSelectedContracts,
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
                <TableCell padding="checkbox" style={{ padding: 10 }}>
                  <Checkbox
                    checked={selectedAllContracts}
                    onChange={handleSelectAllContracts}
                    indeterminate={selectedSomeContracts}
                  />
                </TableCell>

                <TableCell align="left">
                  Contract
                </TableCell>

                <TableCell align="left">
                  Payments
                </TableCell>

                <TableCell align="center">
                  Status
								</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((n, index) => {
                const isContractselected = selectedContracts.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isContractselected}
                  >
                    <TableCell padding="checkbox" style={{ padding: 10 }}>
                      <Checkbox
                        checked={isContractselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isContractselected}
                      />
                    </TableCell>

                    <TableCell align="left">
                      {n.name}
                    </TableCell>

                    <TableCell align="left">
                      {`${n.cost} (${n.total}€)`}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        title="Edit"
                        component={RouterLink}
                        to={formatMessage(intl.urlContractEdit, { contractId: n.id })}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(
                          n.id,
                          deletecontract,
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
  contracts: PropTypes.array.isRequired,
  totalcount: PropTypes.number,
};

Results.defaultProps = {
  contracts: [],
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

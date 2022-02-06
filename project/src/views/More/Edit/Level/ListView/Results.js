import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
  levels,
  className,
  deletelevel,
  deletelevels,
}) => {
  const classes = useStyles();
  const [filters] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [sort, setSort] = useState(sortOptionsDefault[2].value);
  const [opendialog, setOpenDialog] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllLevels = (event) => {
    setSelectedLevels(event.target.checked
      ? levels.map((n) => n.id)
      : []);
  };

  const handleSelectOneNew = (event, newId) => {
    if (!selectedLevels.includes(newId)) {
      setSelectedLevels((prevSelected) => [...prevSelected, newId]);
    } else {
      setSelectedLevels((prevSelected) => prevSelected.filter((id) => id !== newId));
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredLevels = applyFilters(levels, query, filters);
  const sortedLevels = applySort(filteredLevels, sort);
  const paginatedLevels = applyPagination(sortedLevels, page, limit);
  const enableBulkOperations = selectedLevels.length > 0;
  const selectedSomeLevels = selectedLevels.length > 0 && selectedLevels.length < levels.length;
  const selectedAllLevels = selectedLevels.length === levels.length;

  const handleItemEdit = () => {
    setName('Advanced');
    handleClickOpenDialog();
  }

  return (
    <Card className={clsx(classes.root, className)} >
      <div>
        <Dialog
          open={opendialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Input Name"
              variant="outlined"
              value={name}
              style={{ width: '100%' }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="exam_level"
                  color="primary"
                />
              }
              label="Exam level"
            />
            <div style={{ width: '100%' }}>(will count 30 extra minutes for the teacher)</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
          value={query}
          variant="outlined"
          onChange={handleQueryChange}
          placeholder={formatMessage(intl.search)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: 20 }}
          onClick={handleClickOpenDialog}
        >
          Add
        </Button>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllLevels}
              onChange={handleSelectAllLevels}
              indeterminate={selectedSomeLevels}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            // onClick={() => handleDeleteAllSelected(
            //   selectedLevels,
            //   deleteLevels,
            //   setSelectedLevels,
            //   enqueueSnackbar,
            //   { ...intl, formatMessage }
            // )}
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
                    checked={selectedAllLevels}
                    onChange={handleSelectAllLevels}
                    indeterminate={selectedSomeLevels}
                  />
                </TableCell>

                <TableCell align="left">
                  Name
                </TableCell>

                <TableCell align="left">
                  Exam level
                </TableCell>

                <TableCell align="center">
                  Status
								</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLevels.map((n, index) => {
                const isLevelselected = selectedLevels.includes(n.id);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isLevelselected}
                  >
                    <TableCell padding="checkbox" style={{ padding: 10 }}>
                      <Checkbox
                        checked={isLevelselected}
                        onChange={(event) => handleSelectOneNew(event, n.id)}
                        value={isLevelselected}
                      />
                    </TableCell>

                    <TableCell align="left">
                      {n.name}
                    </TableCell>

                    <TableCell>
                      {n.exam_level}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={handleItemEdit}
                        title="Edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        // onClick={() => handleDelete(
                        //   n.id,
                        //   deleteLevel,
                        //   enqueueSnackbar,
                        //   { ...intl, formatMessage }
                        // )}
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
        count={filteredLevels.length}
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
  levels: PropTypes.array.isRequired
};

Results.defaultProps = {
  levels: []
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

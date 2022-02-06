import React, { useState } from 'react';
import clsx from 'clsx';
import Moment from 'moment';
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
	Search as SearchIcon,
} from 'react-feather';
import { useSnackbar } from 'notistack';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

/* utils */
import {
	applySort,
	handleDelete,
	applyFilters,
	applyPagination,
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

const Results = ({ intl, users, deleteUser, deleteUsers }) => {
	const classes = useStyles();
	const [ page, setPage ] = useState(0);
	const [ limit, setLimit ] = useState(10);
	const [ query, setQuery ] = useState('');
	const { enqueueSnackbar } = useSnackbar();
	const [ filters, setFilters ] = useState({});
	const [ selected, setSelected ] = useState([]);
	const [ sort, setSort ] = useState(sortOptionsDefault[2].value);

	const handleQueryChange = (event) => {
		event.persist();
		setQuery(event.target.value);
	};

	const handleSortChange = (event) => {
		event.persist();
		setSort(event.target.value);
	};

	const handleSelectAll = (event) => {
		setSelected(event.target.checked
			? users.map((appuser) => appuser.id)
			: []);
	};

	const handleSelectOne = (event, appuserId) => {
		if (!selected.includes(appuserId)) {
			setSelected((prevSelected) => [...prevSelected, appuserId]);
		} else {
			setSelected((prevSelected) => prevSelected.filter((id) => id !== appuserId));
		}
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleLimitChange = (event) => {
		setLimit(parseInt(event.target.value));
	};

	const searchCriteria = [
		'name',
		'location',
		'department',
		'employee_number',
	];
	const filtered = applyFilters(users, query, filters, searchCriteria);
	const sorted = applySort(filtered, sort);
	const paginated = applyPagination(sorted, page, limit);
	const enableBulkOperations = selected.length > 0;
	const selectedSome = selected.length > 0 && selected.length < users.length;
	const selectedAll = selected.length === users.length;

	return (
		<Card className={clsx(classes.root)} >
			<Box
				p={2}
				minHeight={56}
				display="flex"
				alignItems="center"
			>
				<TextField
					className={classes.queryField}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SvgIcon
									color="action"
									fontSize="small"
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

				<Box flexGrow={1} />
				{/*
					<TextField
						select
						name="sort"
						value={sort}
						variant="outlined"
						onChange={handleSortChange}
						SelectProps={{ native: true }}
						label={formatMessage(intl.sortBy)}
					>
						{sortOptionsDefault.map((option) => (
							<option
								key={option.value}
								value={option.value}
							>
								{option.label}
							</option>
						))}
					</TextField>
				*/}
			</Box>
			{enableBulkOperations && (
				<div className={classes.bulkOperations}>
					<div className={classes.bulkActions}>
						<Checkbox
							checked={selectedAll}
							onChange={handleSelectAll}
							indeterminate={selectedSome}
						/>
						<Button
							variant="outlined"
							className={classes.bulkAction}
								onClick={() => handleDeleteAllSelected(
								selected,
								deleteUsers,
								setSelected,
								enqueueSnackbar,
								{ ...intl, formatMessage}
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
										checked={selectedAll}
										onChange={handleSelectAll}
										indeterminate={selectedSome}
									/>
								</TableCell>
								<TableCell>
									{formatMessage(intl.user_name)}
								</TableCell>

								<TableCell>
									{formatMessage(intl.surname)}
								</TableCell>

								<TableCell>
									{formatMessage(intl.email)}
								</TableCell>

								<TableCell>
									{formatMessage(intl.address)}
								</TableCell>

								<TableCell>
									{formatMessage(intl.actions)}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{paginated.map((el) => {
								const isSelected = selected.includes(el.id);

								return (
									<TableRow
										hover
										key={el.id}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isSelected}
												onChange={(event) => handleSelectOne(event, el.id)}
												value={isSelected}
											/>
										</TableCell>

										<TableCell>
											{el.name}
										</TableCell>

										<TableCell>
											{el.surnames}
										</TableCell>

										<TableCell>
											{el.email}
										</TableCell>

										<TableCell>
											{el.address}
										</TableCell>

										<TableCell>
											<IconButton
												to={'#'}
												component={RouterLink}
											>
												<SvgIcon fontSize="small">
													<SearchIcon />
												</SvgIcon>
											</IconButton>
											<IconButton
												to={'#'}
												component={RouterLink}
											>
												<SvgIcon fontSize="small">
													<EditIcon />
												</SvgIcon>
											</IconButton>
											<IconButton
												onClick={() => handleDelete(
													el.id,
													deleteUser,
													enqueueSnackbar,
													{ ...intl, formatMessage}
												)}
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
				page={page}
				component="div"
				rowsPerPage={limit}
				count={filtered.length}
				onChangePage={handlePageChange}
				rowsPerPageOptions={[5, 10, 25]}
				onChangeRowsPerPage={handleLimitChange}
			/>
		</Card>
	);
};

Results.propTypes = {
	users: PropTypes.array,
	className: PropTypes.string,
};

Results.defaultProps = {
	users: []
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(Results);
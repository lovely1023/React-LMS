import React, { useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
	Breadcrumbs,
	Button,
	Grid,
	Link,
	SvgIcon,
	Typography,
	makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
	PlusCircle as PlusCircleIcon,
} from 'react-feather';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
	root: {},
	action: {
		marginBottom: theme.spacing(1),
		'& + &': {
			marginLeft: theme.spacing(1)
		}
	},
	recomment_combo: {
		width: 230, height: 50, marginRight: 10
		// "@media (max-width: 1370px)": { width: 200 }
	},
}));

const options = ['topics', 'textbooks', 'levels', 'rooms', 'languages', 'lesson info', 'heard of us'];

const HeaderBreadcrumbs = ({ className, ...rest }) => {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');

	const {
		crumbs,
		goBack,
		buttonRight,
		actualPage,
		checkbox
	} = rest;

	useEffect(() => {
		if (rest.checkbox !== undefined)
			setValue(rest.checkbox.value)
	}, [rest.checkbox])

	const handleChangeState = (event, newValue) => {
		if (newValue !== null) {
			setValue(newValue);
			switch (newValue) {
				case "lesson info":
					history.push(`/app/more/edit/lessons`)
					break;
				case "heard of us":
					history.push(`/app/more/edit/heards`)
					break;
				default:
					history.push(`/app/more/edit/${newValue}`)
					break;
			}
		}
	}

	const renderCheckbox = () => {
		return (checkbox) ? (
			<Autocomplete
				value={value}
				onChange={handleChangeState}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				id="controllable-states-demo"
				options={options}
				style={{ width: 300 }}
				renderInput={(params) => <TextField {...params} variant="outlined" />}
			/>
		) : null
	}

	const renderButtonAddEdit = () => {
		return (buttonRight) ? (
			<Grid item>
				<Link
					variant="h6"
					to={buttonRight.to}
					color="inherit"
					component={RouterLink}
				>
					<Button
						color="secondary"
						variant="contained"
						startIcon={
							<SvgIcon fontSize="small">
								{
									(buttonRight.icon)
										? buttonRight.icon
										: <PlusCircleIcon />
								}
							</SvgIcon>
						}
					>
						{(buttonRight.label) ? buttonRight.label : 'Agregar'}
					</Button>
				</Link>
			</Grid>
		) : null;
	}

	const renderGoBack = () => {
		return (goBack) ? (
			<Grid
				container
				direction="row"
				alignItems="center"
				style={{ cursor: 'pointer' }}
			>
				<NavigateBeforeIcon fontSize="small" />
				<Typography
					variant="body1"
					color="textPrimary"
					onClick={() => history.goBack()}
				>
					Regresar
				</Typography>
			</Grid>
		) : null;
	}

	const renderCrumbs = () => {
		if (!crumbs) return null;

		let key = 0;

		let links = [(
			<Link
				key={key++}
				variant="body1"
				color="inherit"
				to="/"
				component={RouterLink}
			>
				Dashboard
			</Link>
		)];

		links.push(
			...crumbs.map((el) => (
				<Link
					key={key++}
					to={el.to || '#'}
					variant="body1"
					color="inherit"
					component={RouterLink}
				>
					{el.label}
				</Link>
			))
		)

		links.push((
			<Typography
				key={key++}
				variant="body1"
				color="textPrimary"
			>
				{actualPage}
			</Typography>
		))
		return links;
	}

	return (
		<Grid
			container
			spacing={3}
			justify="space-between"
			className={clsx(classes.root, className)}
		>
			<Grid item>
				{renderGoBack()}

				<Breadcrumbs
					separator={<NavigateNextIcon fontSize="small" />}
					aria-label="breadcrumb"
				>

					{renderCrumbs()}

				</Breadcrumbs>
				<Typography
					variant="h3"
					color="textPrimary"
				>
					{actualPage}
				</Typography>
			</Grid>

			{renderButtonAddEdit()}
			{renderCheckbox()}
		</Grid>
	);
};

HeaderBreadcrumbs.propTypes = {
	/**
	 * [goBack ]
	 * activate the button to return to the previous page
	**/
	goBack: PropTypes.bool,
	/**
	 * [crumbs]
	 * Array of objects to assemble the breadcrumbs.
	 * the object must have the following structure
	 * [
	 *		{
	 *			to: {string}
	 *			label: {string}
	 *		}
	 *		...
	 * ]
	 * @type {array => object}
	 */
	crumbs: PropTypes.array,
	className: PropTypes.string,
	actualPage: PropTypes.string,
	buttonRight: PropTypes.object,
	checkbox: PropTypes.object
};

export default HeaderBreadcrumbs;

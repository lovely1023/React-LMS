import React from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import TextbookInfo from './TextbookInfo';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {}
}));

const Details = ({ textbook, teachers, students, className }) => {
	const classes = useStyles();

	return (
		<Grid className={clsx(classes.root)} container spacing={3} >
			<Grid item lg={12} md={12} xl={12} xs={12} >
				<TextbookInfo
					textbook={textbook}
					teachers={teachers}
					students={students}
				/>
			</Grid>
		</Grid>
	);
};

Details.propTypes = {
	className: PropTypes.string,
	textbook: PropTypes.object.isRequired,
	teachers: PropTypes.array.isRequired,
	students: PropTypes.array.isRequired
};

export default Details;

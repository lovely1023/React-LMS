import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TeacherInfo from './TeacherInfo';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {}
}));

const Details = ({ teacher, books, observers }) => {
	const classes = useStyles();

	return (
		<Grid className={clsx(classes.root)} container spacing={3} >
			<Grid item lg={12} md={12} xl={12} xs={12} >
				<TeacherInfo
					teacher={teacher}
					books={books}
					observers={observers}
				/>
			</Grid>
		</Grid>
	);
};

Details.propTypes = {
	className: PropTypes.string,
	teacher: PropTypes.object.isRequired,
	books: PropTypes.object.isRequired,
	observers: PropTypes.object.isRequired,
};

export default Details;

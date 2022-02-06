import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CertificationInfo from './CertificationInfo';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {}
}));

const Details = ({ certification }) => {
	const classes = useStyles();

	return (
		<Grid className={clsx(classes.root)} container spacing={3} >
			<Grid item lg={12} md={12} xl={12} xs={12} >
				<CertificationInfo
					certification={certification}
				/>
			</Grid>
		</Grid>
	);
};

Details.propTypes = {
	className: PropTypes.string,
	certification: PropTypes.object.isRequired,
};

export default Details;

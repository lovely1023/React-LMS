import React from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import StudentInfo from './Student_Info';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = ({ student, groupids, noteinfos, textbookinfo, className }) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root)} container spacing={3} >
      <Grid item lg={12} md={12} xl={12} xs={12} >
        <StudentInfo
          student={student}
          groupids={groupids}
          noteinfos={noteinfos}
          textbookinfo={textbookinfo}
        />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  student: PropTypes.array.isRequired,
  groupids: PropTypes.array.isRequired,
  noteinfos: PropTypes.array.isRequired,
  textbookinfo: PropTypes.array.isRequired
};

export default Details;

import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const RestricGuard = ({ children, roles }) => {
  const { user } = useAuth();

  if (!roles.includes(user.role)) {
    return <Redirect to="/app/reports/dashboard" />;
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

RestricGuard.propTypes = {
  children: PropTypes.node
};

export default RestricGuard;

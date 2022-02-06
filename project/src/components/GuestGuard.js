import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Redirect } from 'react-router-dom';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const GuestGuard = ({ children, intl }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Redirect to={ formatMessage(intl.urlStudents) } />;
	}

	return (
		<Fragment>
			{children}
		</Fragment>
	);
};

GuestGuard.propTypes = {
	children: PropTypes.node
};

const mapStateToProps = (store) => ({
	intl: store.intl.messages,
})

export default connectIntl(mapStateToProps)(GuestGuard);


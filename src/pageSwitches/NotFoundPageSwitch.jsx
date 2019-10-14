import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import DesktopNotFoundPage from '../desktop/components/notFoundPage/NotFoundPage';

export const NotFoundPageSwitch = ({ text }) => (
  <DesktopNotFoundPage text={text} />
);

NotFoundPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default NotFoundPageSwitch;

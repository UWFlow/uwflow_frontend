import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopNotFoundPage from '../desktop/components/notFoundPage/NotFoundPage';
import MobileNotFoundPage from '../mobile/components/notFoundPage/NotFoundPage';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const NotFoundPageSwitch = ({ text, isDesktopPage }) => {
  return isDesktopPage ? (
    <DesktopNotFoundPage text={text} />
  ) : (
    <MobileNotFoundPage text={text} />
  );
};

NotFoundPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default connect(mapStateToProps)(NotFoundPageSwitch);

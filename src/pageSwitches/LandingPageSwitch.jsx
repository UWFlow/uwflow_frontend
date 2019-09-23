import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopLandingPage from '../desktop/components/landingPage/LandingPage';
import MobileLandingPage from '../mobile/components/landingPage/LandingPage';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const LandingPageSwitch = ({ isDesktopPage }) => {
  return isDesktopPage ? <DesktopLandingPage /> : <MobileLandingPage />;
};

LandingPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default connect(mapStateToProps)(LandingPageSwitch);

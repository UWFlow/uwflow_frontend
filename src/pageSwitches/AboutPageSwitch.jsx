import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopAboutPage from '../desktop/components/aboutPage/AboutPage';
import MobileAboutPage from '../mobile/components/aboutPage/AboutPage';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const AboutPageSwitch = ({ isDesktopPage }) => {
  return isDesktopPage ? <DesktopAboutPage /> : <MobileAboutPage />;
};

AboutPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default connect(mapStateToProps)(AboutPageSwitch);

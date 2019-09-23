import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopPrivacyPage from '../desktop/components/privacyPage/PrivacyPage';
import MobilePrivacyPage from '../mobile/components/privacyPage/PrivacyPage';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const PrivacyPageSwitch = ({ isDesktopPage }) => {
  return isDesktopPage ? <DesktopPrivacyPage /> : <MobilePrivacyPage />;
};

PrivacyPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default connect(mapStateToProps)(PrivacyPageSwitch);

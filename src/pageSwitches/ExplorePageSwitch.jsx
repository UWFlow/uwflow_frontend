import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopExplorePage from '../desktop/components/explorePage/ExplorePage';
import MobileExplorePage from '../mobile/components/explorePage/ExplorePage';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

//TODO(EDWIN): Add props to DesktopExplorePage if needed
export const ExplorePageSwitch = ({ isDesktopPage }) => {
  return isDesktopPage ? <DesktopExplorePage /> : <MobileExplorePage />;
};

ExplorePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default connect(mapStateToProps)(ExplorePageSwitch);

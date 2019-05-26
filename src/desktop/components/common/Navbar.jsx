import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Routes */
import { LANDING_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from '../../../Routes';

/* Selectors */
import {
  getIsShallowInfoFetched,
  getIsFetchingAllShallowInfo,
} from '../../../data/reducers/CourseReducer';

/* Actions */
import { loadAllCourseShallowInfo } from '../../../data/actions/CourseActions';

/* Styled Components */
import {
  NavbarSpacer,
  NavbarWrapper,
  LogoWrapper,
  ProfileButtonWrapper,
} from './styles/Navbar';

/* Child Components */
import Textbox from './Textbox';

const mapStateToProps = state => ({
  isFetchingAllShallowInfo: getIsFetchingAllShallowInfo(state),
  isShallowInfoFetched: getIsShallowInfoFetched(state),
});

const loadAllShallowInfoHelper = dispatch => () =>
  dispatch(loadAllCourseShallowInfo());

const mapDispatchToProps = dispatch => ({
  loadAllShallowInfo: loadAllShallowInfoHelper(dispatch),
});

export const NAVBAR_TEXTBOX_ID = 'NAVBAR_TEXTBOX';

const Navbar = ({
  isShallowInfoFetched,
  isFetchingAllShallowInfo,
  loadAllShallowInfo,
}) => {
  useEffect(() => {
    if (!isShallowInfoFetched && !isFetchingAllShallowInfo) {
      loadAllShallowInfo();
    }
  }, [isFetchingAllShallowInfo, isShallowInfoFetched, loadAllShallowInfo]);

  return (
    <>
      <NavbarSpacer />
      <NavbarWrapper>
        <LogoWrapper to={LANDING_PAGE_ROUTE}>UW Flow</LogoWrapper>
        <Textbox
          ID={NAVBAR_TEXTBOX_ID}
          initialPlaceholder="Explore or search for courses, subjects or professors"
        />
        <ProfileButtonWrapper to={PROFILE_PAGE_ROUTE}>
          My Profile
        </ProfileButtonWrapper>
      </NavbarWrapper>
    </>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Navbar),
);

import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Styled Components */
import { ShortlistStarWrapper } from './styles/ShortlistStar';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ShortlistStar = ({ theme, courseID, isLoggedIn, initialState = false, size = 32 }) => {
  const [checked, setChecked] = useState(initialState);
  const dispatch = useDispatch();

  const onStarClicked = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
    } else {
      return;
    }
  }

  return (
    <ShortlistStarWrapper
      onClick={onStarClicked}
      checked={checked}
      width={size}
      color={checked ? theme.dark3 : theme.light4}
      strokeWidth={2}
    />
  );
};

ShortlistStar.propTypes = {
  theme: PropTypes.object.isRequired,
  courseID: PropTypes.number.isRequired,
  initialState: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

export default withTheme(connect(mapStateToProps)(ShortlistStar));

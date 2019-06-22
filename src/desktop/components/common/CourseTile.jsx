import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { CourseTileWrapper } from './styles/CourseTile';

const CourseTile = ({ info }) => {
  return <CourseTileWrapper>{info.courseName}</CourseTileWrapper>;
};

CourseTile.propTypes = {
  info: PropTypes.object
};

export default CourseTile;

import React from 'react';
import { withRouter } from 'react-router-dom';

/* Styled Components */
import { CourseTileWrapper } from './styles/CourseTile';

const CourseTile = ({ info }) => {
  return <CourseTileWrapper>{info.courseName}</CourseTileWrapper>;
};

export default CourseTile;

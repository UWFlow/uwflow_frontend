import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import { ExtraInfoBoxWrapper } from './styles/CoursePage';

const ExtraInfoBox = ({ requiredTextbooks }) => {
  return <ExtraInfoBoxWrapper>Required Textbooks:</ExtraInfoBoxWrapper>;
};

export default ExtraInfoBox;

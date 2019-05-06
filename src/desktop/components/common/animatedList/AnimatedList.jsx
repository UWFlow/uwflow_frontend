import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import { AnimatedListWrapper } from './styles';

const mapStateToProps = state => ({});

const AnimatedList = ({}) => {
  return <AnimatedListWrapper>List</AnimatedListWrapper>;
};

export default connect(mapStateToProps)(AnimatedList);

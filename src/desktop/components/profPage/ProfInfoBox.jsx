import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getProfInfo } from '../../../data/reducers/ProfReducer';

const mapStateToProps = (state, { profID }) => ({
  profInfo: getProfInfo(state, profID),
});

const ProfInfoBox = ({ profInfo }) => {};

export default connect(mapStateToProps)(ProfInfoBox);

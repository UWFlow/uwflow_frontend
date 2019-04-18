import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getProfInfo } from '../../../data/reducers/ProfReducer';

/* Styled Components */
import { ProfInfoBoxWrapper } from './styles/ProfPage';

const mapStateToProps = (state, { profID }) => ({
  profInfo: getProfInfo(state, profID),
});

const ProfInfoBox = ({ profInfo }) => {
  return <ProfInfoBoxWrapper> Prof Info </ProfInfoBoxWrapper>;
};

export default connect(mapStateToProps)(ProfInfoBox);

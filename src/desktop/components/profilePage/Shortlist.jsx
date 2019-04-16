import React from 'react';
import { connect } from 'react-redux';
import { getUserShortlist } from '../../../data/reducers/UserReducer';

const mapStateToProps = state => ({
  shortlist: getUserShortlist(state),
});

const Shortlist = ({ shortlist }) => {
  return <>Shortlist</>;
};

export default Shortlist;

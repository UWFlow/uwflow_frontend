import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  PageWrapper,
  PageHeader,
  HeaderText,
  PageContentWrapper,
} from './styles/AboutPage';

import AboutContent from '../../../sharedComponents/aboutPage/AboutContent';

import { getIsBrowserDesktop } from '../../../data/reducers/BrowserReducer';

const mapStateToProps = state => ({
  isDesktop: getIsBrowserDesktop(state),
});

const AboutPage = ({ isDesktop }) => (
  isDesktop ? (
    <PageWrapper>
      <PageHeader>
        <HeaderText>About Flow</HeaderText>
      </PageHeader>
      <PageContentWrapper>
        <AboutContent />
      </PageContentWrapper>
    </PageWrapper>
  ) : (
    <PageWrapper>
      <PageHeader>
        <HeaderText>About Flow</HeaderText>
      </PageHeader>
      <PageContentWrapper>
        <AboutContent />
      </PageContentWrapper>
    </PageWrapper>
  )
);

AboutPage.propTypes = {
  isDesktop: PropTypes.bool,
};

export default connect(mapStateToProps)(AboutPage);

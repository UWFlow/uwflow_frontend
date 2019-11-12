import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../components/input/Button';
import { LANDING_PAGE_ROUTE } from '../../Routes';

import { NotFoundPageWrapper, NotFoundImage, PageHeader, HeaderText } from './styles/NotFoundPage';

const NotFoundPage = ({ text, history }) => {
  const handleClick = () => {
    history.push(LANDING_PAGE_ROUTE);
  };

  const displayText = text ? text : `Sorry, this page doesn't exist!`;

  return (
    <NotFoundPageWrapper>
      <PageHeader>
        <HeaderText>{displayText}</HeaderText>
      </PageHeader>
      <NotFoundImage />
      <Button handleClick={handleClick}>Home</Button>
    </NotFoundPageWrapper>
  );
};

NotFoundPage.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(NotFoundPage);

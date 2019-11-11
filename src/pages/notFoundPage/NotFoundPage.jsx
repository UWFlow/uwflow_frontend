import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../components/input/Button';
import { LANDING_PAGE_ROUTE } from '../../Routes';

import { NotFoundPageWrapper, NotFoundText } from './styles/NotFoundPage';

const NotFoundPage = ({ text, history }) => {
  const handleClick = () => {
    history.push(LANDING_PAGE_ROUTE);
  };

  const displayText = text ? text : `Sorry, this page doesn't exist!`;

  return (
    <NotFoundPageWrapper>
      <NotFoundText>{displayText}</NotFoundText>
      <Button handleClick={handleClick}>Home</Button>
    </NotFoundPageWrapper>
  );
};

NotFoundPage.propTypes = {
  text: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(NotFoundPage);

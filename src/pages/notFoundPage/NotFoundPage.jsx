import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

/* Styled Components */
import {
  NotFoundPageWrapper,
  NotFoundImage,
  PageHeader,
  HeaderText,
} from './styles/NotFoundPage';

/* Child Components */
import Button from '../../components/input/Button';

import { LANDING_PAGE_ROUTE } from '../../Routes';
import { NOT_FOUND } from '../../constants/Messages';

const NotFoundPage = ({
  text = NOT_FOUND.page,
  title = 'Not Found',
  history,
}) => {
  const handleClick = () => {
    history.push(LANDING_PAGE_ROUTE);
  };

  return (
    <NotFoundPageWrapper>
      <Helmet>
        <title>{title} - UW Flow</title>
      </Helmet>
      <PageHeader>
        <HeaderText>{text}</HeaderText>
      </PageHeader>
      <NotFoundImage />
      <Button handleClick={handleClick}>Home</Button>
    </NotFoundPageWrapper>
  );
};

NotFoundPage.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(NotFoundPage);

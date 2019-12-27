import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Body, Link, Hover } from '../../../constants/Mixins';

export const LastUpdatedText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark3};
  margin: ${({ margin }) => margin};

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px;
  `}
`;

export const LastUpdatedLink = styled.a`
  ${Link}
  color: ${({ theme }) => theme.dark3};
  ${Hover(false, true)}
`;

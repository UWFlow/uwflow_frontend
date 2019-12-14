import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Body, Link } from '../../../constants/Mixins';

export const LastUpdatedText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark3};
  margin-top: 16px;

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px;
  `}
`;

export const LastUpdatedLink = styled.a`
  ${Link}
  color: ${({ theme }) => theme.dark3};
`;

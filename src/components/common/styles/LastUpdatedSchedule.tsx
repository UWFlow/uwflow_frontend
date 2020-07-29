import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Body, Hover, Link } from 'constants/Mixins';

export const LastUpdatedText = styled.div<{ margin: string }>`
  ${Body}
  color: ${({ theme }) => theme.dark3};
  margin: ${({ margin }) => margin};

  ${breakpoint('zero', 'tablet')`
    padding: 0 16px;
  `}
`;

export const LastUpdatedLink = styled.a`
  ${Link}
  color: ${({ theme }) => theme.dark3};
  ${Hover()}
`;

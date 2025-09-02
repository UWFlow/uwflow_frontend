import styled from 'styled-components';

import { Body, BoxShadow, Card, Heading3 } from 'constants/Mixins';

export const DeliveryModeWrapper = styled.div`
${Card('32px 24px')}
${BoxShadow}
${Heading3}
margin-bottom: 32px;
`;

export const Header = styled.div`
  ${Heading3}
  margin-bottom: 16px;
`;

export const LineOfText = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const GreyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
`;

export const DeliveryModeText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1};
  font-weight: 600;
  margin-bottom: 8px;
`;

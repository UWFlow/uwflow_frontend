import styled from 'styled-components';
import { Card, BoxShadow, Heading3 } from '../../../../constants/Mixins';

export const ShortlistBoxWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  margin-bottom: 32px;
`;

export const ShortlistHeading = styled.div`
  ${Heading3}
  color: ${({theme}) => theme.dark1}
`;

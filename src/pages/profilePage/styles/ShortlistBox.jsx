import styled from 'styled-components';
import { Card, BoxShadow, Heading3 } from '../../../constants/Mixins';

export const ShortlistBoxWrapper = styled.div`
  ${Card('0')}
  ${BoxShadow}
  margin-bottom: 32px;
  padding-bottom: 8px;
`;

export const ShortlistHeading = styled.div`
  ${Heading3}
  color: ${({theme}) => theme.dark1};
  padding: 32px 32px 16px 32px;
  border-bottom: 1px solid ${({theme}) => theme.light3};
`;

export const ShortlistContentWrapper = styled.div`
  padding: 0 16px;
`;

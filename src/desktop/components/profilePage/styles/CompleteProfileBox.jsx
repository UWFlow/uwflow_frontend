import styled from 'styled-components';
import { BoxShadow, Heading3 } from '../../../../constants/Mixins';

export const CompleteProfileBoxWrapper = styled.div`
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;
  ${BoxShadow}  
`;

export const CompleteProfileHeading = styled.div`
  ${Heading3}
  color: ${({theme}) => theme.dark1}
`;

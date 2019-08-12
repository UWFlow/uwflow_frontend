import styled from 'styled-components';
import { BoxShadow, Heading3, Heading4 } from '../../../../constants/Mixins';

export const CompleteProfileBoxWrapper = styled.div`
  width: 100%;
  padding: 32px;
  padding-bottom: 0;
  margin-bottom: 32px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.white};
  ${BoxShadow}  
`;

export const CompleteProfileHeading = styled.div`
  ${Heading3}
  color: ${({theme}) => theme.dark1};
`;

export const CheckedItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 32px 0;
`;

export const CheckedText = styled.div`
  margin: auto;
  margin-left: 16px;
  ${Heading4}
  color: ${({theme, checked}) => checked ? theme.dark3 : theme.dark2};
`;
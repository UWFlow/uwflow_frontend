import styled from 'styled-components';
import { BoxShadow } from '../../../../constants/Mixins';

export const ProfileCalendarWrapper = styled.div`
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;
  ${BoxShadow}
`;

export const ProfileCalendarHeading = styled.div`
  font-family: 'Anderson Grotesk';
  font-size: 32px;
  margin-bottom: 16px;
  color: ${({theme}) => theme.dark1}
`;

export const ProfileCalendarText = styled.div`
  font-family: Inter;
  font-size: 21px;
  margin-bottom: 16px;
  color: ${({theme}) => theme.dark2}
`;
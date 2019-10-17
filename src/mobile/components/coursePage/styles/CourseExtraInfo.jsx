import styled from 'styled-components';
import { Heading4, Body } from '../../../../constants/Mixins';
import { Link } from 'react-router-dom';

export const CourseExtraInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: white;
  margin-bottom: 32px;
`;

export const Header = styled.div`
  ${Heading4}
  margin: 24px 0;
`;

export const LineOfText = styled.div`
  margin-bottom: 16px;
`;

export const CourseText = styled(Link)`
  ${Body}
  color: ${({ theme }) => theme.courses};
`;

export const GreyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.light3};
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Card,
  BoxShadow,
  Heading4,
  Heading3,
  Body,
} from '../../../constants/Mixins';

export const ExtraInfoBoxWrapper = styled.div`
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

export const CourseText = styled(Link)`
  ${Body}
  font-weight: 600;
  color: ${({ theme }) => theme.courses};
`;

export const GreyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
`;

export const PrereqText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
`;

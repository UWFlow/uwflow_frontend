import styled from "styled-components";
import { Link } from 'react-router-dom';

import { Heading3, Body } from '../../../constants/Mixins';

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
  color: ${({ theme }) => theme.courses};
`;

export const GreyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.light4};
`;

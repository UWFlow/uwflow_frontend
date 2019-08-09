import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { BoxShadow, Link } from '../../../../constants/Mixins';

export const SearchResultsWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  border-radius: 4px;
  background-color: ${({theme}) => theme.white};
  ${BoxShadow}  
`;

export const CourseCode = styled(RouterLink)`
  ${Link}
  color: ${({theme}) => theme.courses};
`;

export const ProfName = styled(RouterLink)`
 ${Link}
  color: ${({theme}) => theme.professors};
`;

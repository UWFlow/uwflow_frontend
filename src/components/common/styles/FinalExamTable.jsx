import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { Link } from 'constants/Mixins';

export const CourseCode = styled(RouterLink)`
  ${Link}
  color: ${({ theme }) => theme.courses};
`;

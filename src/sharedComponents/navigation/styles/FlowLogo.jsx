import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading4 } from '../../../constants/Mixins';

export const FlowLogoWrapper = styled(Link)`
  user-select: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.dark1};
  text-decoration: none;
  outline: 0;
  border: none;
  ${Heading4}
  font-size: 24px;
  margin-right: 40px;
`;

export const BlueText = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-left: 4px;
`;

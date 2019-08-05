import styled from 'styled-components';
import { BoxShadow } from '../../../../constants/Mixins';

export const SearchResultsWrapper = styled.div`
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;
  background-color: ${({theme}) => theme.white};
  ${BoxShadow}  
`;

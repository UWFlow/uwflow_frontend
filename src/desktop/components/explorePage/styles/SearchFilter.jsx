import styled from 'styled-components';
import { BoxShadow, Heading3, Heading4 } from '../../../../constants/Mixins';

export const SearchFilterWrapper = styled.div`
  width: 100%;
  padding: 32px;
  margin-bottom: 32px;
  background-color: ${({theme}) => theme.white};
  ${BoxShadow}  
`;

export const SearchFilterHeader = styled.div`
  ${Heading3}
  color: ${({theme}) => theme.dark1};
`;

export const SearchFilterText = styled.div`
  ${Heading4}
  color: ${({theme}) => theme.dark2};
  margin-bottom: 8px;
`;

export const SearchFilterSection = styled.div`
  margin-top: 24px;
`;
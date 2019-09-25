import styled from 'styled-components';
import { BoxShadow } from '../../../../constants/Mixins';

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: fit-content;
  z-index: 10;
`;

export const SearchResultsWrapper = styled.div`
  position: absolute;
  width: 100%;
  background: ${({ theme }) => theme.white};
  ${BoxShadow}
  border-radius:  0 0 4px 4px;
`;

export const SearchResult = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ theme }) => theme.white};
  padding: 8px 16px;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.light3};

  &:last-child {
    border-radius:  0 0 4px 4px;
  }
`;
import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  display: flex;
`;

export const SearchInput = styled.input`
  outline: none;
  border: none;
  width: ${({ options }) => (options.width ? options.width : '400px')};
  padding: ${({ options }) => (options.padding ? options.padding : '8px 16px')};
  border-radius: 4px;
  background: ${({ theme }) => theme.light2}
  height: 48px;
  color: ${({ theme }) => theme.dark4}

  &::placeholder {
    color: grey;
  }
`;

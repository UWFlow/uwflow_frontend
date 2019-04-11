import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  display: flex;
`;

export const SearchInput = styled.input`
  outline: none;
  width: ${({ options }) => (options.width ? options.width : '400px')};
  padding: ${({ options }) => (options.padding ? options.padding : '4px')};

  &::placeholder {
    color: grey;
  }
`;

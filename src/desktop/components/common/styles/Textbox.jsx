import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  display: block;
`;

export const SearchInput = styled.input`
  outline: none;
  border: ${({ error, theme }) => error ? `1px solid ${theme.red}` : 'none'};
  width: ${({ options }) => (options.width ? options.width : '400px')};
  padding: ${({ options }) => (options.padding ? options.padding : '8px 16px')};
  border-radius: 4px;
  background: ${({ theme }) => theme.light2};
  height: 48px;
  color: ${({ error, theme }) => error ? theme.red : theme.dark1};

  &::-webkit-input-placeholder {
    color: ${({ error, theme }) => error ? theme.red : theme.dark3};
  }
  
  &:-ms-input-placeholder {
    color: ${({ error, theme }) => error ? theme.red : theme.dark3};
  }
  
  &::placeholder {
    color: ${({ error, theme }) => error ? theme.red : theme.dark3};
  }  
`;

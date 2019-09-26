import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  display: block;
  position: relative;
`;

export const SearchInput = styled.input`
  position: relative;
  outline: none;
  border: ${({ error, theme }) => error ? `1px solid ${theme.red}` : 'none'};
  width: ${({ options }) => (options.width ? options.width : '400px')};
  padding: ${({ options }) => (options.padding ? options.padding : '8px 16px')};
  font-size: ${({ options }) => (options.fontSize ? options.fontSize : 'inherit')};
  border-radius: ${({ options }) => (options.borderRadius ? options.borderRadius : '4px')};;
  background: ${({ autocompleteActive, theme }) =>
    autocompleteActive ? 'transparent' : theme.light2};
  font-weight: ${({ options }) => options.fontWeight ? options.fontWeight : '400'};
  height: 48px;
  z-index: 2;
  color: ${({ error, theme }) => error ? theme.red : theme.dark2};
  padding-left: ${({ hasIcon }) => hasIcon ? '72px' : 'auto'};

  &::-webkit-input-placeholder {
    color: ${({ error, theme }) => error ? theme.red : theme.dark3};
    font-weight: 400;
  }
  
  &:-ms-input-placeholder {
    color: ${({ error, theme }) => error ? theme.red : theme.dark3};
    font-weight: 400;
  }
  
  &::placeholder {
    color: ${({ error, theme }) => error ? theme.red : theme.dark3};
    font-weight: 400;
  }  
`;

export const AutocompleteInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
  border: ${({ error, theme }) => error ? `1px solid ${theme.red}` : 'none'};
  width: ${({ options }) => (options.width ? options.width : '400px')};
  padding: ${({ options }) => (options.padding ? options.padding : '8px 16px')};
  font-size: ${({ options }) => (options.fontSize ? options.fontSize : 'inherit')};
  border-radius: ${({ options }) => (options.borderRadius ? options.borderRadius : '4px')};;
  background: ${({ theme }) => theme.light2};
  height: 48px;
  color: ${({ theme }) => theme.dark3};
  z-index: 1;
  padding-left: ${({ hasIcon }) => hasIcon ? '72px' : 'auto'};
`;

export const Icon = styled.div`
  position: absolute;
  top: 12px;
  left: 24px;
  z-index: 3;
  color: ${({ theme }) => theme.dark3};
`;
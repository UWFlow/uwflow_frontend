import styled from 'styled-components';

export const SearchInputWrapper = styled.div`
  display: block;
  position: relative;
`;

export const SearchInput = styled.input`
  position: relative;
  outline: none;
  border: ${({ options, error, theme }) =>
    error
      ? `1px solid ${theme.red}`
      : options.border
      ? options.border
      : 'none'};
  width: ${({ options }) => (options.width ? options.width : '400px')};
  min-width: 152px;
  padding: ${({ options }) => (options.padding ? options.padding : '8px 16px')};
  font-size: ${({ options }) =>
    options.fontSize ? options.fontSize : 'inherit'};
  border-radius: 4px;
  background: ${({ autocompleteActive, theme }) =>
    autocompleteActive ? 'transparent' : theme.light2};
  height: 48px;
  z-index: 2;
  color: ${({ error, theme }) => (error ? theme.red : theme.dark1)};
  background-color: ${({ options }) =>
    options ? options.backgroundColor : ''};
  padding-left: ${({ hasIcon }) => (hasIcon ? '48px' : '0')};

  &:-ms-input-placeholder {
    color: ${({ error, options, theme }) =>
      error ? theme.red : options ? options.color : theme.dark3};
    font-weight: 400;
  }

  &::-webkit-input-placeholder {
    color: ${({ error, options, theme }) =>
      error ? theme.red : options ? options.color : theme.dark3};
    font-weight: 400;
  }

  &::placeholder {
    color: ${({ error, options, theme }) =>
      error ? theme.red : options ? options.color : theme.dark3};
    font-weight: 400;
  }

  @media only screen and (max-width: 800px) {
    padding-left: ${({ hasIcon }) => (hasIcon ? '56px' : 'auto')};
  }
`;

export const AutocompleteInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  outline: none;
  border: ${({ error, theme }) => (error ? `1px solid ${theme.red}` : 'none')};
  width: ${({ options }) => (options.width ? options.width : '400px')};
  padding: ${({ options }) => (options.padding ? options.padding : '8px 16px')};
  font-size: ${({ options }) =>
    options.fontSize ? options.fontSize : 'inherit'};
  border-radius: ${({ options }) =>
    options.borderRadius ? options.borderRadius : '4px'};
  background: ${({ theme }) => theme.light2};
  height: 48px;
  color: ${({ theme }) => theme.dark3};
  z-index: 1;
  padding-left: ${({ hasIcon }) => (hasIcon ? '72px' : 'auto')};

  @media only screen and (max-width: 800px) {
    padding-left: ${({ hasIcon }) => (hasIcon ? '56px' : 'auto')};
  }
`;

export const Icon = styled.div`
  position: absolute;
  top: 12px;
  left: 16px;
  z-index: 3;
  color: ${({ theme }) => theme.dark3};

  @media only screen and (max-width: 800px) {
    left: 16px;
  }
`;

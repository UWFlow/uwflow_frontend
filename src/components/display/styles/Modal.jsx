import styled from 'styled-components';

export const ModalChildren = styled.div`
  position: relative;
  margin: 4px;
`;

export const ModalX = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.dark3};

  &:hover {
    color: ${({ theme }) => theme.dark1};
  }
`;

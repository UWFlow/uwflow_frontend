import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.light2};
  border-radius: 8px;
  color: ${({ theme }) => theme.light1};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0px 2px 5px rgba(236, 237, 237, 0.5), 0px 0px 5px rgba(142, 147, 148, 0.2);

  :hover {
    background: ${({ theme }) => theme.primaryDark};
  }

  :focus, :active {
    color: ${({ theme }) => theme.light4};
  }
`;

export const ButtonText = styled.div`
  font-size: 20px;
  line-height: 22px;
  margin: auto;
  font-weight: 500;
`;

import styled from 'styled-components';
import { Heading4 } from '../../../../constants/Mixins';

export const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.light2};
  border-radius: 8px;
  color: ${({ theme }) => theme.dark1};
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  background: ${({ theme }) => theme.accent};
  box-shadow: 0px 2px 5px rgba(236, 237, 237, 0.5),
    0px 0px 5px rgba(142, 147, 148, 0.2);

  :hover {
    background: ${({ theme }) => theme.accentDark};
  }

  :focus,
  :active {
    color: ${({ theme }) => theme.dark2};
  }
`;

export const ButtonText = styled.div`
  margin: auto;
  ${Heading4}
`;

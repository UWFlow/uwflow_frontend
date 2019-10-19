import styled from 'styled-components';
import { Heading3, Body } from '../../constants/Mixins';

export const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: white;
  width: 350px;
  border-radius: 5px 5px 5px 5px;
`;

export const Header = styled.div`
  ${Heading3}
  margin-bottom: 16px;
`;

export const TextboxWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

export const Error = styled.div`
  ${Body}
  color: ${({ theme }) => theme.red};
  margin-bottom: 16px;
  width: 100%;
`;

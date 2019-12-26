import styled from 'styled-components';
import { Heading2, BoxShadow, Link } from '../../../constants/Mixins';

export const EmailInputFormWrapper = styled.div`
  ${BoxShadow}
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: white;
  width: 350px;
  border-radius: 4px;
`;

export const FormTitle = styled.div`
  ${Heading2}
  margin-bottom: 24px;
`;

export const TextboxWrapper = styled.div`
  margin-bottom: 16px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormText = styled.div`
  margin-bottom: 16px;
`;

export const FormLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

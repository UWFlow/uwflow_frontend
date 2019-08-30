import styled from 'styled-components';
import {
  Heading2,
  Heading4,
  Body,
  BoxShadow,
} from '../../../../constants/Mixins';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  background: white;
  ${BoxShadow}
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 32px;
  width: 400px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  align-items: center;
`;

export const Header = styled.div`
  ${Heading2}
  margin-bottom: 32px;
  align-self: flex-start;
`;

export const TextboxWrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

export const Spacer = styled.div`
  width: 16px;
`;

export const NamesSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ForgotPasswordWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const ForgotPasswordText = styled.div`
  color: ${({ theme }) => theme.dark1};
`;

export const OrWrapper = styled.div`
  ${Heading4}
  margin-bottom: 16px;
`;

export const PrivacyWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

export const GreyText = styled.div`
  color: ${({ theme }) => theme.dark3};
  ${Body};
`;

export const PrivacyPolicyText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1};
  margin-left: 4px;
`;

export const SwapModalWrapper = styled.div`
  ${Heading4}
  color: ${({ theme }) => theme.dark3};
  font-weight: 300;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.light3};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;

export const SwapModalLink = styled.div`
  margin-left: 4px;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;

export const Error = styled.div`
  ${Body}
  color: ${({ theme }) => theme.accent};
`;
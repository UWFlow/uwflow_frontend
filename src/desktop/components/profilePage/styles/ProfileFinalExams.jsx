import styled from 'styled-components';
import { Card, BoxShadow, Heading3, Body, Link } from '../../../../constants/Mixins';

export const ProfileFinalExamsWrapper = styled.div`
  ${Card('0 0 12px 0')}
  ${BoxShadow}
  margin-bottom: 16px;
`;

export const ProfileFinalExamsHeader = styled.div`
  padding: 24px 32px 16px 32px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};
`;

export const LastUpdatedText = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark3};
  margin-bottom: 32px;
`;

export const LastUpdatedLink = styled.a`
  ${Link}
  color: ${({ theme }) => theme.dark3};
`;

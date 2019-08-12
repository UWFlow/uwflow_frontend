import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { BoxShadow, Heading3, Body, Link } from '../../../../constants/Mixins';

export const ProfileFinalExamsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 4px;
  padding-bottom: 12px;
  ${BoxShadow}
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

export const CourseCode = styled(RouterLink)`
  ${Link}
  color: ${({ theme }) => theme.courses};
`;
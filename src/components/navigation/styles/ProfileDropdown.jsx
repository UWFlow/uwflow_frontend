import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Heading4, BoxShadow } from '../../../constants/Mixins';

export const ProfileDropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: 0;
  border: none;
  margin-left: 40px;

  ${breakpoint('mobile', 'tablet')`
    margin-left: 24px;
  `}
`;

export const ProfilePicture = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primaryDark};
  object-fit: cover;
  ${BoxShadow}
`;

export const ProfileText = styled.div`
  ${Heading4}
  color: ${({ theme }) => theme.dark1};
  text-decoration: none;
  display: flex;
  align-items: center;
  width: max-content;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
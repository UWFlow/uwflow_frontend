import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading4, PageContent, BoxShadow } from '../../../../constants/Mixins';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: ${({ theme, landingPage }) => landingPage ? theme.transparent : theme.white};
  border: 1px solid ${({ theme, landingPage }) => landingPage ? theme.transparent : theme.white};
  box-sizing: border-box;
  ${({ landingPage }) => landingPage ? '' : BoxShadow};
  border-radius: 4px;
  display: flex;

  @media only screen and (max-width: 720px) {
    padding: 0 5%;
  }
`;

export const NavbarContent = styled.div`
  ${PageContent}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

export const LogoWrapper = styled(Link)`
  user-select: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: black;
  text-decoration: none;
  outline: 0;
  border: none;
  ${Heading4}
  font-size: 24px;
  margin-right: 40px;
`;

export const BlueText = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-left: 5px;
`;

export const ProfileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: 0;
  border: none;
  margin-left: 40px;
  ${Heading4}
`;

export const ProfilePicture = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primaryDark};
  margin-right: 16px;
  object-fit: cover;
  ${BoxShadow}
`;

export const ProfileText = styled.div`
  color: ${({ theme }) => theme.dark1};
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 8px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
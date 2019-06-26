import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: ${({theme}) => theme.light3};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  outline: 0;
  border: none;
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 600;
`;

export const BlueText = styled.div`
  color: ${({theme}) => theme.primary};
  margin-left: 5px;
`;

export const ProfileButtonWrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  outline: 0;
  border: none;
  font-family: 'Inter';
`;

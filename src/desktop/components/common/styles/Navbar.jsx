import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarSpacer = styled.div`
  height: 50px;
`;

export const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
`;

export const ProfileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
`;

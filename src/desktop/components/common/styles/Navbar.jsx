import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading4 } from '../../../../constants/Mixins';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: ${({theme}) => theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 125px;
  border: 1px solid ${({theme}) => theme.light2};
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(236, 237, 237, 0.5), 0px 0px 5px rgba(142, 147, 148, 0.2);
  border-radius: 4px;

  @media only screen and (max-width: 720px) {
    padding: 0 5%;
  }
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
  color: ${({theme}) => theme.primary};
  margin-left: 5px;
`;

export const ProfileButtonWrapper = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: black;
  text-decoration: none;
  outline: 0;
  border: none;
  margin-left: 40px;
  ${Heading4}
`;

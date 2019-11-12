import styled from 'styled-components';
import { PageContent, BoxShadow } from '../../../constants/Mixins';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  z-index: 1;
  min-height: 80px;
  background-color: ${({ theme, landingPage }) => landingPage ? theme.transparent : theme.white};
  border: 1px solid ${({ theme, landingPage }) => landingPage ? theme.transparent : theme.white};
  box-sizing: border-box;
  ${({ landingPage }) => landingPage ? '' : BoxShadow};
  border-radius: 4px;
  display: flex;
  ${BoxShadow}
`;

export const NavbarContent = styled.div`
  ${PageContent}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  @media only screen and (max-width: 800px) {
    padding: 0 16px;
  }
`;

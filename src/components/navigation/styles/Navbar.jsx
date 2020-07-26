import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { PageContent, BottomBoxShadow } from 'constants/Mixins';
import { NAVBAR_HEIGHT } from 'constants/PageConstants';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  min-height: ${NAVBAR_HEIGHT}px;
  height: ${NAVBAR_HEIGHT}px;
  position: fixed;
  z-index: 11;
  background-color: ${({ theme, landingPage }) =>
    landingPage ? theme.transparent : theme.white};
  border: 1px solid
    ${({ theme, landingPage }) =>
      landingPage ? theme.transparent : theme.white};
  box-sizing: border-box;
  ${({ landingPage }) => (landingPage ? '' : BottomBoxShadow)}
  display: flex;
`;

export const NavbarContent = styled.div`
  ${PageContent}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  ${breakpoint('zero', 'tablet')`
    padding: 0 16px;
    width: 100%;
  `}
`;

export const NavbarPlaceholder = styled.div`
  min-height: ${NAVBAR_HEIGHT}px;
  height: ${NAVBAR_HEIGHT}px;
  width: 100vw;
  content: '';
`;

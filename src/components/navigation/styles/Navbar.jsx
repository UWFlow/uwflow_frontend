import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { PageContent, BoxShadow } from '../../../constants/Mixins';
import { NAVBAR_HEIGHT } from '../../../constants/PageConstants';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  min-height: ${NAVBAR_HEIGHT}px;
  height: ${NAVBAR_HEIGHT}px;
  position: fixed;
  z-index: 11;
  background-color: ${({ theme, landingPage }) => landingPage ? theme.transparent : theme.white};
  border: 1px solid ${({ theme, landingPage }) => landingPage ? theme.transparent : theme.white};
  box-sizing: border-box;
  ${({ landingPage }) => landingPage ? '' : BoxShadow}
  border-radius: 4px;
  display: flex;
`;

export const NavbarContent = styled.div`
  ${PageContent}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px;
    width: 100%;
  `}
`;

import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { PageContent, BoxShadow } from '../../../constants/Mixins';

export const NavbarWrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  min-height: ${({ height }) => height}px;
  height: ${({ height }) => height}px;
  position: fixed;
  z-index: 1;
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

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px;
    width: 100%;
  `}
`;

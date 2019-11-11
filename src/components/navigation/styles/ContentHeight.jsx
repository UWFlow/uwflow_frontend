import styled from 'styled-components';
import { FOOTER_HEIGHT, FOOTER_MARGIN_TOP } from '../Footer';
import { NAVBAR_HEIGHT } from '../Navbar';

export const ContentHeightWrapper = styled.div`
  min-height: calc(100vh - ${FOOTER_HEIGHT}px - ${FOOTER_MARGIN_TOP}px - ${NAVBAR_HEIGHT}px)
`;

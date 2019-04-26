import styled from 'styled-components';
import {
  ModalBackdropZIndex,
  ModalZIndex,
} from '../../../../../constants/Mixins';
import { animated } from 'react-spring/renderprops';

export const ModalBackdrop = styled(animated.div)`
  display: flex;
  ${ModalBackdropZIndex}
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ModalWrapper = styled(animated.div).attrs(() => ({
  // don't click backdrop or modal will be closed
  onClick: event => event.stopPropagation(),
}))`
  background-color: #fff;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0:
  max-height: 0px;
  ${ModalZIndex}
`;

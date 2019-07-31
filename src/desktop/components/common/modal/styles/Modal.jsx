import styled from 'styled-components';
import {
  ModalBackdropZIndex,
  ModalZIndex,
} from '../../../../../constants/Mixins';
import { animated } from 'react-spring/renderprops';

export const ModalBackdrop = styled.div`
  ${ModalBackdropZIndex}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 42, 50);
`;

export const ModalContentWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
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
  position: relative;
  margin: auto;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0:
  max-height: 0px;
  ${ModalZIndex}
`;

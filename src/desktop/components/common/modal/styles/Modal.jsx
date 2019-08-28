import styled from 'styled-components';
import { ModalZIndex } from '../../../../../constants/Mixins';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 42, 50);
`;

export const ModalContentWrapper = styled.div`
  overflow-y: ${({ overflow }) => overflow};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const ModalScrollableWrapper = styled.div`
  min-height: ${({ screenHeight }) => screenHeight}px;
  overflow: show;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 105vh !important;
`;

export const ModalWrapper = styled.div.attrs(() => ({
  // don't click backdrop or modal will be closed
  onClick: event => event.stopPropagation(),
}))`
  z-index: 1;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0:
  max-height: 0px;
  ${ModalZIndex}
`;

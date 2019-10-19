import styled from 'styled-components';
import { ModalZIndex } from '../../../constants/Mixins';

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
  justify-content: center;
`;

export const ModalScrollableWrapper = styled.div`
  min-height: ${({ screenHeight }) => screenHeight}px;
  overflow: show;
  display: inline-flex;
  align-items: center;
  z-index: 2;
`;

export const ModalWrapper = styled.div.attrs(() => ({
  // don't click backdrop or modal will be closed
  onClick: event => event.stopPropagation(),
}))`
  z-index: 2;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0:
  max-height: 0px;
  ${ModalZIndex}
`;

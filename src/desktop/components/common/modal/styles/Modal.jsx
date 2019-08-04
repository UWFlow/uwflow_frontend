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
  justify-content: center;
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const ModalWrapper = styled.div.attrs(() => ({
  // don't click backdrop or modal will be closed
  onClick: event => event.stopPropagation(),
}))``;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0:
  max-height: 0px;
  ${ModalZIndex}
`;

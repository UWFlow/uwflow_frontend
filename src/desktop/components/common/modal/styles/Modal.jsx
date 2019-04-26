import styled from 'styled-components';
import {
  ModalBackdropZIndex,
  ModalZIndex,
} from '../../../../../constants/Mixins';

export const ModalBackdrop = styled.div`
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
  background: rgba(25, 42, 50, 0.7);
  transition: all 0.4s ease;
`;

export const ModalWrapper = styled.div.attrs(() => ({
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

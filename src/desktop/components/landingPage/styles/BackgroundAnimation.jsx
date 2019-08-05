import styled from 'styled-components';
import { BackgroundZIndex } from '../../../../constants/Mixins';

export const Canvas = styled.canvas`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 0;
  left: 0;
  ${BackgroundZIndex}
  opacity: 0.9;
`;

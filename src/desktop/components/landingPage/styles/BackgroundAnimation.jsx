import styled from 'styled-components';
import { BackgroundZIndex1 } from '../../../../constants/Mixins';

export const Canvas = styled.canvas`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  position: absolute;
  top: 0;
  left: 0;
  ${BackgroundZIndex1}
  opacity: 0.9;
`;

import styled from 'styled-components';
import { ArrowRight, Clipboard, Upload } from 'react-feather';

export const RightArrowIcon = styled(ArrowRight)`
  color: ${({ color }) => color};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  stroke-width: ${({ strokeWidth }) => (strokeWidth ? strokeWidth : 3)}px;
`;

export const UploadIcon = styled(Upload)`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  color: ${({ color }) => color};
`;

export const ClipboardIcon = styled(Clipboard)`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  color: ${({ color }) => color};
`;

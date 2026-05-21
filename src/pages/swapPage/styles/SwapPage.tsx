import styled from 'styled-components';

import { FadeInAnimation, PageWrapper } from 'constants/Mixins';

export const SwapPageWrapper = styled.div`
  ${PageWrapper}
  background: ${({ theme }) => theme.light1};
  position: relative;
  animation: ${FadeInAnimation} 0.3s ease;
`;

export const ScheduleImportOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 10;
  overflow-y: auto;
  box-sizing: border-box;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity 0.4s ease;
`;

export const ScheduleImportCard = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;

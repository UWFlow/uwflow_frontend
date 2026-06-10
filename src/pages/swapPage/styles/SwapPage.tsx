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

export const LockCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  background: ${({ theme }) => theme.white};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(23, 43, 77, 0.16);
  padding: 40px 48px;
  max-width: 400px;
`;

export const LockIconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.light2};
  color: ${({ theme }) => theme.dark2};
`;

export const LockHeading = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.dark1};
  margin: 4px 0 0;
`;

export const LockBody = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.dark2};
  margin: 0;
  line-height: 1.5;
`;

export const LoginButton = styled.button`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.dark1};
  font-size: 15px;
  font-weight: 600;
  padding: 12px 28px;
  margin-top: 8px;
  cursor: pointer;
  transition: filter 0.1s ease-in;

  &:hover {
    filter: brightness(0.95);
  }
`;

import styled from 'styled-components';

export const TourWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 90vw;
  background: ${({ theme }) => theme.white};
  border-radius: 12px;
  overflow: hidden;
`;

/* Decorative mini-calendar band */

export const TourIllustration = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  background: #fafbfc;
  border-bottom: 1px solid ${({ theme }) => theme.light2};
  padding: 28px 24px;
`;

export const MiniDayColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 76px;
`;

export const MiniDayLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.dark3};
  text-align: center;
`;

export const MiniDayBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.light2};
  border-radius: 6px;
  padding: 8px 6px;
  height: 96px;
`;

export const MiniBlock = styled.div<{
  fill: string;
  accent: string;
  highlighted?: boolean;
  offsetTop?: number;
}>`
  font-size: 9px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark1};
  background: ${({ fill }) => fill};
  border-left: 3px solid ${({ accent }) => accent};
  border-radius: 3px;
  padding: 4px 5px;
  margin-top: ${({ offsetTop }) => offsetTop ?? 0}px;
  ${({ highlighted, theme }) =>
    highlighted ? `box-shadow: 0 0 0 2px ${theme.primary};` : ''}
`;

export const MiniCursor = styled.div`
  position: absolute;
  top: 26px;
  right: 4px;
  color: ${({ theme }) => theme.dark1};
`;

/* Copy + controls */

export const TourBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 28px 28px;
`;

export const TourEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accentDark};
  margin-bottom: 8px;
`;

export const TourHeading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.dark1};
  margin: 0 0 8px;
`;

export const TourText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.dark2};
  margin: 0 0 24px;
`;

export const TourFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TourDots = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TourDot = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? 20 : 7)}px;
  height: 7px;
  border-radius: 4px;
  background: ${({ active, theme }) => (active ? theme.primary : theme.light3)};
  transition: width 0.15s ease;
`;

export const TourActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TourSkip = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  color: ${({ theme }) => theme.dark2};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.dark1};
  }
`;

export const TourNext = styled.button`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
`;

import styled from 'styled-components';

import { Body, Heading1 } from 'constants/Mixins';
import { CalendarWithButtonsWrapper } from 'pages/profilePage/styles/ProfileCalendar';

export const SWAP_HOUR_HEIGHT = 64;
export const SWAP_GRID_START_HOUR = 8;
export const SWAP_GRID_END_HOUR = 22;
export const SWAP_TIME_COL_WIDTH = 56;
export const SWAP_HEADER_HEIGHT = 32;

export const SwapCalendarOuter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 32px 32px;
  width: 100%;
  box-sizing: border-box;
`;

export const SwapTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const SwapPageTitle = styled.h1`
  ${Heading1}
  color: ${({ theme }) => theme.dark1};
  margin-bottom: 0;
  flex-shrink: 0;
`;

export const SwapPageSubtitle = styled.p`
  ${Body}
  color: ${({ theme }) => theme.dark2};
  margin-bottom: 0;
  text-align: right;
`;

export const SwapHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const TermTabGroup = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.light3};
  border-radius: 6px;
  overflow: hidden;
  margin-right: 4px;
`;

export const TermTab = styled.button<{ active: boolean }>`
  ${Body}
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  padding: 6px 16px;
  border: none;
  background: ${({ active, theme }) => (active ? theme.white : theme.light1)};
  color: ${({ active, theme }) => (active ? theme.dark1 : theme.dark2)};
  cursor: pointer;
  border-right: 1px solid ${({ theme }) => theme.light3};

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ theme }) => theme.white};
  }
`;

export const CourseSelectTrigger = styled.button<{ hasValue: boolean }>`
  ${Body}
  font-size: ${({ hasValue }) => (hasValue ? '16px' : '14px')};
  padding: ${({ hasValue }) => (hasValue ? '10px 20px' : '6px 12px')};
  border: 1px solid ${({ theme }) => theme.light3};
  border-radius: 8px;
  background: ${({ theme }) => theme.white};
  color: ${({ hasValue, theme }) => (hasValue ? theme.dark1 : theme.dark3)};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

export const SwapLabelText = styled.span`
  color: ${({ theme }) => theme.dark2};
  font-size: 16px;
  font-weight: 500;
`;

export const CourseCodeBadge = styled.span`
  background: ${({ theme }) => theme.courses};
  color: white;
  font-weight: 700;
  font-size: 15px;
  padding: 3px 12px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const SwapBodyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const CalendarPanelContainer = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const SectionFinderContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

export const CalendarPanel = styled(CalendarWithButtonsWrapper)`
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  margin-bottom: 0;
  overflow: hidden;
`;

export const DayHeadersRow = styled.div`
  display: flex;
  background: #fafbfc;
  border-bottom: 1px solid ${({ theme }) => theme.light2};
`;

export const TimeHeaderSpacer = styled.div`
  width: ${SWAP_TIME_COL_WIDTH}px;
  flex-shrink: 0;
`;

export const DayHeaderCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px 4px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark2};
  border-left: 1px solid ${({ theme }) => theme.light2};
`;

export const GridBody = styled.div`
  display: flex;
  position: relative;
`;

export const TimeLabelsCol = styled.div`
  width: ${SWAP_TIME_COL_WIDTH}px;
  flex-shrink: 0;
`;

export const TimeLabel = styled.div`
  height: ${SWAP_HOUR_HEIGHT}px;
  display: flex;
  align-items: flex-start;
  padding-top: 3px;
  padding-right: 6px;
  justify-content: flex-end;
  font-size: 11px;
  color: ${({ theme }) => theme.dark3};
`;

export const DayColumnsArea = styled.div`
  flex: 1;
  display: flex;
  border-left: 1px solid ${({ theme }) => theme.light2};
  position: relative;
`;

export const DayCol = styled.div`
  flex: 1;
  position: relative;
  border-right: 1px solid ${({ theme }) => theme.light2};

  &:last-child {
    border-right: none;
  }
`;

export const HourLineFull = styled.div<{ offset: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ offset }) => offset}px;
  height: 1px;
  background: ${({ theme }) => theme.light2};
  pointer-events: none;
`;

export const HalfHourLine = styled.div<{ offset: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ offset }) => offset}px;
  height: 1px;
  border-top: 1px dashed ${({ theme }) => theme.light3};
  pointer-events: none;
`;

export const EventBlock = styled.div<{
  top: number;
  height: number;
  fill: string;
  accent: string;
  selected: boolean;
  dimmed: boolean;
}>`
  position: absolute;
  left: 2px;
  right: 2px;
  top: ${({ top }) => top}px;
  height: ${({ height }) => Math.max(height - 2, 18)}px;
  background: ${({ fill }) => fill};
  border-radius: 3px;
  border-left: 4px solid ${({ accent }) => accent};
  cursor: pointer;
  overflow: hidden;
  padding: 3px 5px;
  opacity: ${({ dimmed }) => (dimmed ? 0.38 : 1)};
  outline: ${({ selected, accent }) =>
    selected ? `2px solid ${accent}` : 'none'};
  outline-offset: 1px;
  transition: opacity 0.15s;
  z-index: 1;

  &:hover {
    z-index: 2;
    filter: brightness(96%);
  }
`;

export const BlockCode = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.courses};
  line-height: 1.25;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const BlockSection = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.dark2};
  line-height: 1.2;
`;

export const BlockLoc = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.dark3};
  line-height: 1.2;
`;

export const BlockTime = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.dark2};
  line-height: 1.2;
`;

export const GhostEventBlock = styled.div<{
  top: number;
  height: number;
}>`
  position: absolute;
  left: 2px;
  right: 2px;
  top: ${({ top }) => top}px;
  height: ${({ height }) => Math.max(height - 2, 18)}px;
  background: rgba(255, 196, 0, 0.12);
  border-radius: 3px;
  border: 2px dashed #e8b300;
  pointer-events: none;
  z-index: 2;
`;

export const CalendarLegendBar = styled.div`
  display: flex;
  gap: 16px;
  padding: 6px 12px;
  border-top: 1px solid ${({ theme }) => theme.light2};
  background: #fafbfc;
  font-size: 12px;
  color: ${({ theme }) => theme.dark3};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LegendDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: ${({ color }) => color};
`;

export const CourseSelectBadgeWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const SwapDropdownOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 199;
`;

export const SwapDropdownWrapper = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.light3};
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  z-index: 200;
  min-width: 300px;
  max-height: 360px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SwapDropdownSearchInput = styled.input`
  ${Body}
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.light2};
  font-size: 14px;
  outline: none;
  background: transparent;
  flex-shrink: 0;

  &::placeholder {
    color: ${({ theme }) => theme.dark3};
  }
`;

export const SwapDropdownList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

export const SwapDropdownHeader = styled.div`
  padding: 8px 14px 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.dark3};
  border-bottom: 1px solid ${({ theme }) => theme.light2};
`;

export const SwapDropdownItem = styled.button<{
  isSelected: boolean;
  isEnrolled: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.light2};
  background: ${({ isSelected, isEnrolled }) =>
    isSelected ? '#eef4ff' : isEnrolled ? '#f5f8ff' : 'transparent'};
  font-size: 13px;
  color: ${({ theme }) => theme.dark1};
  cursor: pointer;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.light1};
  }
`;

export const DropdownCourseCode = styled.span`
  font-weight: 700;
  font-size: 13px;
  color: ${({ theme }) => theme.courses};
  flex-shrink: 0;
`;

export const DropdownCourseName = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.dark3};
  flex: 1;
  min-width: 0;
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DropdownEmptyState = styled.div`
  padding: 16px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.dark3};
  text-align: center;
`;

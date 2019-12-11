import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Card, BoxShadow, Body, Heading3 } from '../../../constants/Mixins';

export const HOUR_HEIGHT = 48;
const TIME_WIDTH = 60;
const HEADER_HEIGHT = 24;

export const CalendarWrapper = styled.div`
  ${Card('0')}
  ${BoxShadow}
  position: relative;
  margin-bottom: 32px;
`;

export const CalendarNavWrapper = styled.div`
  display: flex;
  vertical-align: bottom;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.light4};
`;

export const DateRangeText = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  ${Heading3}
`;

export const NavButtonWrapper = styled.div`
  display: flex;
`;

export const NavButton = styled.button`
  border-radius: 4px;
  background: ${({ theme }) => theme.light1};
  border: 2px solid ${({ theme }) => theme.light3};
  color: ${({ theme }) => theme.dark1};
  font-weight: bold;
  margin-left: 4px;
  padding: 4px 16px;
  cursor: pointer;
  ${Body}

  &:hover {
    background: ${({ theme }) => theme.light2};
  }
`;

export const CalendarContentWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  left: 0;
  height: 100%;
`;

export const CalendarHeader = styled.div`
  height: ${HEADER_HEIGHT}px;
  text-align: center;
  padding: 4px;
`;

export const HourRow = styled.div`
  height: ${HOUR_HEIGHT}px;
  padding: 0 16px;
  border-top: 1px solid ${({ theme }) => theme.light3};
  position: relative;

  &::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: ${TIME_WIDTH}px;
    right: 0;
    border-top: 1px dotted ${({ theme }) => theme.light2};
  }
`;

export const HourText = styled.div`
  margin-top: 4px;
`;

export const CalendarEvents = styled.div`
  position: absolute;
  overflow: auto;
  top: 0;
  width: calc(100% - ${TIME_WIDTH}px);
  height: 100%;
  left: ${TIME_WIDTH}px;
  display: flex;
  border-left: 1px solid ${({ theme }) => theme.light3};
`;

export const DayColumn = styled.div`
  position: relative;
  min-width: 104px;
  display: flex;
  flex: 1;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.light3};
`;

export const DayHeader = styled.div`
  height: ${HEADER_HEIGHT}px;
  text-align: center;
  padding: 4px;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const EventWrapper = styled.div`
  ${Body}
  position: absolute;
  top: ${({ top }) => top + HEADER_HEIGHT}px;
  height: ${({ height }) => height - 2}px;
  color: ${({ theme }) => theme.dark1};
  background: ${({ color }) => color};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.primary};
  border-left: 4px solid ${({ theme }) => theme.primaryDark};
  width: calc(100% - 4px);
  padding: 4px;
  font-size: 12px;
`;

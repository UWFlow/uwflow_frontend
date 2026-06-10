import styled from 'styled-components';

import { Body } from 'constants/Mixins';

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

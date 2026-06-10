import styled from 'styled-components';

import { Body } from 'constants/Mixins';

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

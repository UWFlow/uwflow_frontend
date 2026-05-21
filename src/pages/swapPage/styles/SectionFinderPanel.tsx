import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import LastUpdatedSchedule from 'components/common/LastUpdatedSchedule';
import { Body, Heading3 } from 'constants/Mixins';

export const PanelWrapper = styled.div`
  width: 440px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.light3};
  border-radius: 8px;
  background: ${({ theme }) => theme.white};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 360px;
  gap: 12px;
  padding: 32px;
`;

export const EmptyStateText = styled.div`
  ${Heading3}
  color: ${({ theme }) => theme.dark2};
  text-align: center;
`;

export const EmptyStateSub = styled.div`
  ${Body}
  font-size: 14px;
  color: ${({ theme }) => theme.dark3};
  text-align: center;
  max-width: 220px;
  line-height: 1.5;
`;

export const PanelHeader = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.light2};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const PanelCourseInfo = styled.div`
  flex: 1;
`;

export const PanelCourseCode = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.courses};
`;

export const PanelSectionCount = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.dark3};
  margin-left: 8px;
`;

export const PanelCourseName = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.dark2};
  margin-top: 3px;
`;

export const PanelCloseBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.light3};
  background: ${({ theme }) => theme.light1};
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.dark2};
  flex-shrink: 0;
  margin-left: 8px;

  &:hover {
    background: ${({ theme }) => theme.light2};
  }
`;

export const SectionListScroll = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SectionCard = styled.div<{ enrolled: boolean; disabled: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.light2};
  border-left: 4px solid
    ${({ enrolled, theme }) => (enrolled ? theme.primary : 'transparent')};
  background: ${({ enrolled }) => (enrolled ? '#f0f5ff' : 'transparent')};
  opacity: ${({ disabled }) => (disabled ? 0.55 : 1)};

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const SectionPill = styled.span`
  font-size: 12px;
  font-weight: 700;
  background: ${({ theme }) => theme.light2};
  border-radius: 4px;
  padding: 2px 8px;
  color: ${({ theme }) => theme.dark1};
`;

export const EnrolledBadge = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

export const ConflictBadge = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.red};
  font-weight: 600;
`;

export const FullBadge = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.dark3};
  font-weight: 600;
`;

export const SectionTimesText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.dark1};
  margin-bottom: 2px;
`;

export const SectionRoomText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.dark2};
  margin-bottom: 6px;
`;

export const ProfAnchor = styled(RouterLink)`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.professors};
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProfNameText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.dark2};
  display: inline-block;
  margin-bottom: 2px;
`;

export const RatingsText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.dark3};
  margin-bottom: 8px;

  strong {
    color: ${({ theme }) => theme.dark2};
    font-weight: 600;
  }
`;

export const SectionCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SeatsLabel = styled.div<{ full: boolean }>`
  font-size: 12px;
  color: ${({ full, theme }) => (full ? theme.red : theme.dark2)};
  font-weight: ${({ full }) => (full ? 700 : 400)};
`;

export const SwitchBtn = styled.button`
  ${Body}
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }

  &:disabled {
    background: ${({ theme }) => theme.light3};
    color: ${({ theme }) => theme.dark3};
    cursor: not-allowed;
  }
`;

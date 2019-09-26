import styled from 'styled-components';
import { BoxShadow, Body } from '../../../../constants/Mixins';

export const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: fit-content;
  z-index: 10;
`;

export const SearchResultsWrapper = styled.div`
  position: absolute;
  width: 100%;
  background: ${({ theme }) => theme.white};
  ${BoxShadow}
  border-radius:  0 0 4px 4px;
`;

export const SearchResult = styled.button`
  ${Body}
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.dark3};
  padding: 8px 24px;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.light3};

  &:last-child {
    border-radius:  0 0 4px 4px;
    border-bottom: none;
  }

  &:hover, &:focus {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light1} !important;
    border-bottom: none;
  }

  &:hover span, &:focus span {
    color: ${({ theme }) => theme.light1} !important;
  }
`;

export const ResultLeft = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const ResultText = `
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;

  svg {
    margin-right: 24px;
  }
`

export const ExploreText = styled.span`
  color: ${({ theme }) => theme.primary};
  ${ResultText}
`;

export const CourseText = styled.span`
  color: ${({ theme }) => theme.courses};
  ${ResultText}
`;

export const ProfText = styled.span`
  color: ${({ theme }) => theme.professors};
  ${ResultText}
`;

export const Dash = styled.span`
  margin: 0 4px;
`;

const ExploreSideButton = `
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  height: 32px;
  width: 32px;

  &:hover, &:focus {
    filter: brightness(85%);
  }
`;

export const ExploreCourseProfs = styled.button`
  background: ${({ theme }) => theme.professors};
  color: ${({ theme }) => theme.white};
  ${ExploreSideButton}
`;

export const ExploreProfCourses = styled.button`
  background: ${({ theme }) => theme.courses};
  color: ${({ theme }) => theme.white};
  ${ExploreSideButton}
`;
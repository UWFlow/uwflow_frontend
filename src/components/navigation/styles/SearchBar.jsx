import styled from 'styled-components';
import {
  BoxShadow,
  Body,
  DarkBoxShadow,
  Hover,
  FadeInAnimation,
} from '../../../constants/Mixins';

export const SearchBarWrapper = styled.div`
  ${({ isLanding }) => isLanding && DarkBoxShadow}
  position: relative;
  width: 100%;
  z-index: 10;
`;

export const SearchResultsWrapper = styled.div`
  position: absolute;
  width: 100%;
  background: ${({ theme }) => theme.white};
  ${BoxShadow}
  border-radius:  0 0 4px 4px;

  ${({ maximizeWidth }) =>
    maximizeWidth
      ? `@media only screen and (max-width: 425px) {
      width: 100vw;
      margin-top: 16px;
      margin-left: -17px; // including border 1px
    }`
      : ''}
`;

export const SearchResult = styled.button`
  ${Body}
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.dark3};
  padding: 8px 24px;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.light3};
  animation: ${FadeInAnimation} 0.2s;

  &:last-child {
    border-radius: 0 0 4px 4px;
    border-bottom: none;
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.light1} !important;
    border-bottom: none;
  }

  &:hover span,
  &:focus span {
    color: ${({ theme }) => theme.light1} !important;
  }
`;

export const ResultLeft = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-right: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ResultText = `
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  width: max-content;

  svg {
    margin-right: 24px;
  }
`;

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
  ${Hover(false, true)}
`;

export const Dash = styled.span`
  margin: 0 4px;
`;

const ExploreSideButton = `
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  ${Hover(false, true)}

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ExploreCourseProfs = styled.div`
  background: ${({ theme }) => theme.professors};
  color: ${({ theme }) => theme.white};
  ${ExploreSideButton}
`;

export const ExploreProfCourses = styled.div`
  background: ${({ theme }) => theme.courses};
  color: ${({ theme }) => theme.white};
  ${ExploreSideButton}
`;

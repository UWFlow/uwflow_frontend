import styled from 'styled-components';
import { Card, BoxShadow, Heading3, Heading4, Body } from '../../../../constants/Mixins';

export const SearchFilterWrapper = styled.div`
  ${Card('40px 32px')}
  ${BoxShadow}
  margin-bottom: 32px;
`;

export const SearchFilterHeader = styled.div`
  ${Heading3}
  color: ${({theme}) => theme.dark1};
  margin-bottom: 24px;
`;

export const SearchFilterText = styled.div`
  ${Heading4}
  color: ${({theme}) => theme.dark2};
  margin-bottom: 8px;
`;

export const SearchFilterSection = styled.div`
  display: block;
`;

export const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const CourseFilterDropdown = styled.span`
  position: absolute;
`;

export const NumRatingsText = styled.span`
  ${Body}
  color: ${({theme}) => theme.dark3};
`;

export const NumRatingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const BoldText = styled.span`
  font-weight: 600;
`;

export const ResetButton = styled.button`
  height: 28px;
  display: inline-block;
  padding: 4px 12px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${({theme}) => theme.dark3};
  ${BoxShadow}
  ${Body}
  color: ${({theme}) => theme.light1};
  border-radius: 4px;

  &:hover {
    background-color: ${({theme}) => theme.dark2};
  }
`;

export const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
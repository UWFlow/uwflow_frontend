import styled from 'styled-components';

export const LikeCourseToggleWrapper = styled.div`
  width: 72px;
  height: 32px;
  user-select: none;
  border-radius: 8px;
  display: flex;
  margin: auto;
`;

export const LikeCourseToggleButton = styled.button`
  outline: none;
  cursor: pointer;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  height: 100%;
  width: 50%;
  margin: auto;
  border-radius: ${({left}) => left ? '8px 0 0 8px' :  '0 8px 8px 0'};
  border: 2px solid ${({selected, theme}) => selected ? theme.primary : theme.light4};
  border-right-width: ${({left, noneSelected}) => left && noneSelected ? '1px' : '2px'};
  border-left-width: ${({left, noneSelected}) => !left && noneSelected ? '1px' : '2px'};
  background-color: ${({selected, theme}) => selected ? theme.primary : theme.light1};

  &:hover {
    border-color: ${({selected, theme}) => selected ? theme.primaryDark : theme.light4};
    background-color: ${({selected, theme}) => selected ? theme.primaryDark : theme.light2};
  }
`;

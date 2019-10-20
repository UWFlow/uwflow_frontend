import styled from 'styled-components';

/* Mixins */
import { Heading1, Heading3 } from '../../../../constants/Mixins';

export const ProfInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: white;
  flex-direction: column;
  position: relative;
`;

export const ProfNameSection = styled.div`
  width: 100%;
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  position: relative;
  padding: 16px;
`;

export const ProfName = styled.div`
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  color: ${({ theme }) => theme.white};
  ${Heading1}
`;

export const ProfCoursesText = styled.div`
  ${Heading3}
  color: ${({ theme }) => theme.dark2};
  padding: 16px;
`;
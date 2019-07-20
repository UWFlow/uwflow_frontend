import styled from 'styled-components';

/* Constants */
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

/* Mixins */
import { Heading1, Heading2, Body } from '../../../../constants/Mixins';

export const ProfInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  background-color: white;
  flex-direction: column;
  position: relative;
`;

export const ProfNameSection = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primary};
  position: relative;
`;

export const ProfDescriptionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 200px;
`;

export const ProfName = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 32px;
  bottom: 32px;
  color: white;
  ${Heading2};
`;

export const Description = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1};
`;

export const RatingsSection = styled.div`
  position: absolute;
  right: 80px;
  bottom: ${({ ratingBoxHeight }) => 200 - ratingBoxHeight / 2}px;
`;

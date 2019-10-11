import styled from 'styled-components';

/* Mixins */
import { Heading1, Heading3, PageContent } from '../../../../constants/Mixins';

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
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  padding: 16px;
`;

export const ProfDescriptionSection = styled.div`
  position: relative;
  ${PageContent}
  min-height: 80px;
  margin: auto;
  vertical-align: middle;
  display: flex;
`;

export const ProfNameWrapper = styled.div``;

export const ProfName = styled.div`
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  color: ${({ theme }) => theme.white};
  ${Heading1}
`;

export const Description = styled.div`
  ${Heading3}
  position: relative;
  margin: auto 0;
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  line-height: 1.5;
  vertical-align: middle;
  color: ${({ theme }) => theme.dark2};
`;

export const RatingsSection = styled.div`
  position: absolute;
  right: 0;
  bottom: 40px;
`;

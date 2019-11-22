import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ProfHeader from '../../../img/prof_v1.svg';

/* Mixins */
import { Heading1, Heading3, PageContent } from '../../../constants/Mixins';

export const ProfInfoHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: ${({ theme }) => theme.white};
  flex-direction: column;
  position: relative;
`;

export const ProfNameSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  background: url(${ProfHeader});
  background-size: cover;
  position: relative;
  min-height: 120px;
  padding: 16px;

  ${breakpoint('mobile', 'tablet')`
    padding: 24px 16px;
  `}

  ${breakpoint('tablet')`
    min-height: 320px;
  `}
`;

export const ProfNameWrapper = styled.div`
  ${PageContent}
  margin: auto;
  margin-bottom: 48px;

  ${breakpoint('mobile', 'tablet')`
    margin-bottom: 0;
  `}
`;

export const ProfName = styled.div`
  color: ${({ theme }) => theme.white};
  ${Heading1}

  ${breakpoint('mobile', 'tablet')`
    padding: 0 16px;
    min-width: 100%;
  `}

  ${breakpoint('tablet')`
    max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  `}
`;

export const ProfDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;

  ${breakpoint('tablet')`
    ${PageContent}
    padding-bottom: 48px;
    margin: auto;
  `}
`;

export const Description = styled.div`
  ${Heading3}
  position: relative;
  margin: auto 0;
  max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  vertical-align: middle;
  color: ${({ theme }) => theme.dark2};

  ${breakpoint('mobile', 'tablet')`
    margin-bottom: 16px;
    padding: 0 16px;
    min-width: 100%;
  `}

  ${breakpoint('tablet')`
    margin-top: 48px;
    max-width: calc(100% - ${({ ratingBoxWidth }) => ratingBoxWidth}px);
  `}
`;

export const RatingsSection = styled.div`
  ${breakpoint('mobile', 'tablet')`
    width: 100%;
  `}

  ${breakpoint('tablet')`
    position: absolute;
    right: 0;
    bottom: 32px;
  `}
`;
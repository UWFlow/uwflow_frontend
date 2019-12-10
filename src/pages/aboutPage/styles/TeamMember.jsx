import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import {
  Heading2,
  Heading3,
  Heading4,
  Body,
  BoxShadow,
  Link,
} from '../../../constants/Mixins';

export const TeamMembersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 48px 0;
`;

export const MemberPhoto = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 32px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.img});
  ${BoxShadow}
`;

export const MemberWrapper = styled.div`
    ${Heading4}
    ${breakpoint('tablet')`
        flex: 1;
        padding-left: 32px;
    `}
    ${breakpoint('mobile', 'tablet')`
        width: 100%;
    `}
`;

export const MemberTitle = styled.div`
  ${Heading2}
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const MemberBio = styled.div`
  ${Body}
`;

export const MemberLink = styled.a`
  ${Link}
  margin-right: 16px;
`;

import React from 'react';

import {
  TeamMembersWrapper,
  MemberPhoto,
  MemberTitle,
  MemberWrapper,
  MemberBio,
  MemberLink,
  MemberLinksWrapper,
} from './styles/TeamMember';

const TeamMember = ({
  photo,
  name,
  title,
  linkedIn,
  program,
  website,
  twitter,
  children,
}) => (
  <TeamMembersWrapper>
    <MemberPhoto img={photo} />
    <MemberWrapper>
      <MemberTitle>{name}</MemberTitle>
      {title}
      {program && ` — ${program}`}
      <MemberLinksWrapper>
        {linkedIn && (
          <MemberLink href={linkedIn} target="_blank" rel="noopener noreferrer">
            Linkedin
          </MemberLink>
        )}
        {website && (
          <MemberLink href={website} target="_blank" rel="noopener noreferrer">
            Website
          </MemberLink>
        )}
        {twitter && (
          <MemberLink href={twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </MemberLink>
        )}
      </MemberLinksWrapper>
      <MemberBio>{children}</MemberBio>
    </MemberWrapper>
  </TeamMembersWrapper>
);

export default TeamMember;

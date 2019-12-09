import React from 'react';
import PropTypes from 'prop-types';

import {
  TeamMembersWrapper,
  MemberPhoto,
  MemberTitle,
  MemberWrapper,
  MemberBio,
  MemberLink
} from './styles/TeamMember';

const AboutPage = ({ photo = '', name, title, linkedIn, program, website, children }) => (
  <TeamMembersWrapper>
    <MemberPhoto img={photo}/>
    <MemberWrapper>
      <MemberTitle>{name}{program && ` (${program})`}</MemberTitle>
      {title}
      <br/><br/>
      {linkedIn && <MemberLink>Linkedin</MemberLink>}
      {website && <MemberLink>Website</MemberLink>}
      <br/><br/>
      <MemberBio>{children}</MemberBio>
    </MemberWrapper>
  </TeamMembersWrapper>
);

AboutPage.propTypes = {
  photoName: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any
}

export default AboutPage;

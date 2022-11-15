import React from 'react';
import { Helmet } from 'react-helmet';

import { SEO_DESCRIPTIONS } from 'constants/Messages';
import AyushImg from 'img/about/ayush.jpg';
import BobImg from 'img/about/bob.jpg';
import DavidImg from 'img/about/david.jpg';
import DerrekImg from 'img/about/derrek.jpg';
import DmytroImg from 'img/about/dmytro.jpg';
import EdwinImg from 'img/about/edwin.jpg';
import JamieImg from 'img/about/jamie.jpg';
import JeffImg from 'img/about/jeff.jpg';
import MackImg from 'img/about/mack.jpg';
import MaxImg from 'img/about/max.jpg';
import SandyImg from 'img/about/sandy.jpg';
import ShubhamImg from 'img/about/shubham.jpg';
import TerranceImg from 'img/about/terrance.jpg';

import {
  ContributorLink,
  HeaderText,
  PageBody,
  PageBodyHeader,
  PageBodyParagraph,
  PageContentWrapper,
  PageHeader,
  PageWrapper,
} from './styles/AboutPage';
import TeamMember from './TeamMember';

type ContributorProps = {
  name: string;
  about: string;
  github: string;
};

const Contributor = ({ name, about, github }: ContributorProps) => (
  <li>
    <ContributorLink href={about} target="_blank">
      {name}
    </ContributorLink>{' '}
    —{' '}
    <ContributorLink
      href={`https://github.com/UWFlow/rmc/commits/master?author=${github}`}
      target="_blank"
    >
      contributions
    </ContributorLink>
  </li>
);

const AboutPage = () => {
  throw new Error('Error loading about page data');
};

export default AboutPage;

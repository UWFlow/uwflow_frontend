import React from 'react';
import { Helmet } from 'react-helmet';

import TeamMember from './TeamMember.jsx';

import AyushImg from '../../img/about/ayush.jpg';

import {
  PageWrapper,
  PageHeader,
  HeaderText,
  PageContentWrapper,
  PageBodyHeader,
  PageBody,
  PageBodyParagraph,
} from './styles/AboutPage';

const AboutPage = () => (
  <PageWrapper>
    <Helmet>
      <title>About - UW Flow</title>
      <meta name="description" content="About UW Flow." />
    </Helmet>
    <PageHeader>
      <HeaderText>About Flow</HeaderText>
    </PageHeader>
    <PageContentWrapper>
      <PageBody>
        <PageBodyHeader>Welcome to UW Flow!</PageBodyHeader>
        <PageBodyParagraph>
          Flow is a course planning website for University of Waterloo students.
          You can find everything from courses and professors to prerequisites
          here.
          <br />
          <br />
          Our mission is simple: to empower UWaterloo students through
          uncensored and unfiltered course and professor reviews.
          <br />
          <br />
          Had a bad prof? We want to know. Had a great one? Tell us as well.
          Found a course completely and utterly useless? Leave a review. Your
          experiences help us help more than 30,000 students like you every
          month choose great courses and avoid not so great ones.
        </PageBodyParagraph>
        <PageBodyHeader>Our History</PageBodyHeader>
        <PageBodyParagraph>
          UW Flow started off as a Final Year Design Project built by four
          students in Software Engineering at UWaterloo. You can find our
          founders below. Launching Flow in 2012, they addressed a real need at
          the University: students did not have nearly enough information about
          courses to choose them. Here’s Sandy Wu (one of our founders) on
          selecting courses before Flow:
          <br />
          <br />
          It’s like doing taxes. Each time, it’s inevitable, and each time, it’s
          a pain. Right now, students use the undergraduate calendar to look
          through thousands of courses before even knowing what’s out there. And
          that doesn’t even include opinions from people who had taken those
          courses before. For that, we rely on friends and word of mouth. But
          that’s both incomplete and inconvenient.
          <br />
          <br />
          Want more? Go to{' '}
          <a
            href="http://david-hu.com/2014/02/28/open-sourcing-uw-flow-draft.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://david-hu.com/2014/02/28/open-sourcing-uw-flow-draft.html
          </a>{' '}
          for a tale of four tenacious students and one mammoth idea.
          <br />
          <br />
          We built UW Flow 2.0 in 2019 to modernize and hone in on functionality
          you care about. As you navigate UW Flow 2.0, you’ll notice new
          features, better response times, and plenty more. What hasn’t changed
          is our commitment to the UWaterloo community and our drive to empower
          you.
          <br />
          <br />
          Sincerely,
          <br />
          <br />
          The UW Flow Team
        </PageBodyParagraph>
        <PageBodyHeader>The Team</PageBodyHeader>
        <TeamMember
          name="Ayush Kapur"
          title="Product Manager"
          program="SE 2022"
          photoName="ayush.jpg"
          linkedIn="https://www.linkedin.com/in/ayush-kapur/"
          photo={AyushImg}
        ></TeamMember>
        <TeamMember
          name="Bob Wei"
          title="Backend Developer"
          program="CS 2022"
          photoName="bob.jpg"
          linkedIn="https://www.linkedin.com/in/bobqywei/"
          photo={AyushImg}
        ></TeamMember>
        <TeamMember
          name="Derrek Chow"
          title="Designer"
          program="SE 2022"
          photoName="derrek.jpg"
          website="https://www.derrekchow.com/"
          linkedIn="https://www.linkedin.com/in/derrekchow/"
          photo={AyushImg}
        ></TeamMember>
        <TeamMember
          name="Edwin Zhang"
          title="Frontend Developer"
          program="CS 2021"
          photoName="edwin.jpg"
          website="https://www.edwinzhang.me/"
          linkedIn="https://www.linkedin.com/in/edwin-zhang/"
          photo={AyushImg}
        ></TeamMember>
        <TeamMember
          name="Dmytro Shynkevych"
          title="Backend Developer"
          program="CS 2022"
          photoName="dmytro.jpg"
          linkedIn="https://www.linkedin.com/in/dmshynk/"
          photo={AyushImg}
        ></TeamMember>

        <TeamMember
          name="Max Dai"
          title="Frontend Developer"
          program="SE 2022"
          photoName="max.jpg"
          linkedIn="https://www.linkedin.com/in/max-dai/"
          photo={AyushImg}
        ></TeamMember>
      </PageBody>
    </PageContentWrapper>
  </PageWrapper>
);

export default AboutPage;

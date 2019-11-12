import React from 'react';

import {
    PageBodyHeader,
    PageBody,
    PageBodyParagraph,
} from './styles/AboutContent';

const AboutContent = () => (
  <PageBody>
    <PageBodyHeader>Welcome to UW Flow!</PageBodyHeader>
    <PageBodyParagraph>
      Flow is a course planning website for University of Waterloo students.
      You can find everything from courses and professors to prerequisites
      here.
      <br/><br/>
      Our mission is simple: to empower UWaterloo students through uncensored
      and unfiltered course and professor reviews.
      <br/><br/>
      Had a bad prof? We want to know. Had a great one? Tell us as well. Found
      a course completely and utterly useless? Leave a review. Your
      experiences help us help more than 30,000 students like you every month
      choose great courses and avoid not so great ones.
    </PageBodyParagraph>
    <PageBodyHeader>Our History</PageBodyHeader>
    <PageBodyParagraph>
      UW Flow started off as a Final Year Design Project built by four
      students in Software Engineering at UWaterloo. You can find our founders
      below. Launching Flow in 2012, they addressed a real need at the
      University: students did not have nearly enough information about
      courses to choose them. Here’s Sandy Wu (one of our founders) on
      selecting courses before Flow:
      <br/><br/>
      It’s like doing taxes. Each time, it’s inevitable, and each time, it’s a
      pain. Right now, students use the undergraduate calendar to look through
      thousands of courses before even knowing what’s out there. And that
      doesn’t even include opinions from people who had taken those courses
      before. For that, we rely on friends and word of mouth. But that’s both
      incomplete and inconvenient.
    </PageBodyParagraph>
    <PageBodyParagraph>
      Want more? Go to {' '}
      <a href="http://david-hu.com/2014/02/28/open-sourcing-uw-flow-draft.html" target="_blank" rel="noopener noreferrer">
        http://david-hu.com/2014/02/28/open-sourcing-uw-flow-draft.html
      </a> {' '} for a
      tale of four tenacious students and one mammoth idea.
      <br/><br/>
      We built UW Flow 2.0 in 2019 to modernize and hone in on functionality
      you care about. As you navigate UW Flow 2.0, you’ll notice new features,
      better response times, and plenty more. What hasn’t changed is our
      commitment to the UWaterloo community and our drive to empower you.
    </PageBodyParagraph>
    <PageBodyParagraph>Sincerely, The UW Flow Team</PageBodyParagraph>
    <PageBodyHeader>The Team</PageBodyHeader>
  </PageBody>
);

export default AboutContent;
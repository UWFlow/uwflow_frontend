import React from 'react';
import { Helmet } from 'react-helmet';

/* Images */
import AyushImg from '../../img/about/ayush.jpg';
import BobImg from '../../img/about/bob.jpg';
import DerrekImg from '../../img/about/derrek.jpg';
import DmytroImg from '../../img/about/dmytro.jpg';
import EdwinImg from '../../img/about/edwin.jpg';
import MaxImg from '../../img/about/max.jpg';
import DavidImg from '../../img/about/david.jpg';
import MackImg from '../../img/about/mack.jpg';
import SandyImg from '../../img/about/sandy.jpg';
import JamieImg from '../../img/about/jamie.jpg';
import JeffImg from '../../img/about/jeff.jpg';
import TerranceImg from '../../img/about/terrance.jpg';
import ShubhamImg from '../../img/about/shubham.jpg';

/* Styled Components */
import {
  PageWrapper,
  PageHeader,
  HeaderText,
  PageContentWrapper,
  PageBodyHeader,
  PageBody,
  PageBodyParagraph,
  ContributorLink,
} from './styles/AboutPage';

/* Child Components */
import TeamMember from './TeamMember.jsx';

/* Constants */
import { SEO_DESCRIPTIONS } from '../../constants/Messages.jsx';

const Contributor = ({ name, about, gh }) => (
  <li>
    <ContributorLink href={about} target="_blank">
      {name}
    </ContributorLink>{' '}
    —{' '}
    <ContributorLink
      href={`https://github.com/UWFlow/rmc/commits/master?author=${gh}`}
      target="_blank"
    >
      contributions
    </ContributorLink>
  </li>
);

const AboutPage = () => (
  <PageWrapper>
    <Helmet>
      <title>About - UW Flow</title>
      <meta name="description" content={SEO_DESCRIPTIONS.about} />
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
          <i>
            <b>
              "It’s like doing taxes. Each time, it’s inevitable, and each time,
              it’s a pain. Right now, students use the undergraduate calendar to
              look through thousands of courses before even knowing what’s out
              there. And that doesn’t even include opinions from people who had
              taken those courses before. For that, we rely on friends and word
              of mouth. But that’s both incomplete and inconvenient."
            </b>
          </i>
          <br />
          <br />
          Want to learn more? Check out{' '}
          <a
            href="http://david-hu.com/2014/02/28/open-sourcing-uw-flow-draft.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            this blog post
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
        <br />
        <br />
        <br />
        <PageBodyParagraph>
          <PageBodyHeader>The Team (Flow 2.0)</PageBodyHeader>
          <TeamMember
            name="Ayush Kapur"
            title="Product Manager"
            program="Computer Science 2022"
            linkedIn="https://www.linkedin.com/in/ayush-kapur/"
            photo={AyushImg}
          >
            Ayush can often be found on the bike exploring the great outdoors,
            in a cafe with his nose in a book, or pacing excitedly while
            listening to a debate.
            <br />
            <br />
            Fun fact: he has eaten Alligator, and he contends that (while they
            may look very different) they taste exactly like chicken.
          </TeamMember>
          <TeamMember
            name="Bob Wei"
            title="Backend Developer"
            program="Computer Science 2022"
            linkedIn="https://www.linkedin.com/in/bobqywei/"
            photo={BobImg}
          >
            Bob Wei is a backend developer working on UW Flow. In his free time,
            he can be found balling, running, or eating hot-pot.
            <br />
            <br />
            He has worked at Uber ATG and SideFX and is interested in computer
            vision and general ML. You may also find him at grad school in a few
            years time.
          </TeamMember>
          <TeamMember
            name="Derrek Chow"
            title="Designer"
            program="Software Engineering 2022"
            website="https://www.derrekchow.com/"
            linkedIn="https://www.linkedin.com/in/derrekchow/"
            photo={DerrekImg}
          ></TeamMember>
          <TeamMember
            name="Dmytro Shynkevych"
            title="Backend Developer"
            program="Software Engineering 2022"
            linkedIn="https://www.linkedin.com/in/dmshynk/"
            photo={DmytroImg}
          >
            When not otherwise occupied, Dmytro develops the backend for Flow
            2.0.
            <br />
            <br />
            Dmytro likes precisely those things which are meticulously studied
            and well-understood. For that reason he doubts he will be a very
            good researcher. When this saddens him too much, he makes things go
            fast and is content.
          </TeamMember>
          <TeamMember
            name="Edwin Zhang"
            title="Frontend Developer"
            program="Computer Science 2021"
            website="https://www.edwinzhang.me/"
            linkedIn="https://www.linkedin.com/in/edwin-zhang/"
            photo={EdwinImg}
          ></TeamMember>
          <TeamMember
            name="Max Dai"
            title="Frontend Developer"
            program="Software Engineering 2022"
            linkedIn="https://www.linkedin.com/in/max-dai/"
            photo={MaxImg}
          ></TeamMember>
        </PageBodyParagraph>
        <PageBodyParagraph>
          <PageBodyHeader>Founders and Alumni (Flow 1.0)</PageBodyHeader>
          <TeamMember
            name="David Hu"
            title="Founder"
            program="Software Engineering 2014"
            website="http://david-hu.com/"
            photo={DavidImg}
          >
            David is a human being currently living on Earth.
            <br />
            <br />
            Since David complains a lot about bad user experience, he's the
            chief UX nitpicker at Flow. He also does system administration and
            takes out the garbage.
            <br />
            <br />
            David has worked at Google for two terms and then at Khan Academy
            for two terms.
          </TeamMember>
          <TeamMember
            name="Mack Duan"
            title="Founder"
            program="Software Engineering 2014"
            photo={MackImg}
          >
            Mack Duan is a Software Engineering student helping with the
            software development of Flow.
            <br />
            <br />
            He really enjoys eating spicy food. In his free time, he likes to
            watch TV, movies and play cards.
            <br />
            <br />
            Mack has worked two terms at Facebook, and at a startup in San
            Francisco.
          </TeamMember>
          <TeamMember
            name="Sandy Wu"
            title="Founder"
            program="Software Engineering 2014"
            photo={SandyImg}
          >
            After hacking on Flow, Sandy now spends his time fighting fraud on
            the risk team at Stripe.
            <br />
            <br />
            During his spare time he enjoys karaoke, dancing, and noming lots of
            delicious food.
            <br />
            <br />
            During his co-op terms at Facebook and Twitter he tried
            (unsuccessfully) to eat everything he saw.
          </TeamMember>
          <TeamMember
            name="Jamie Wong"
            title="Founder"
            program="Software Engineering 2014"
            website="http://jamie-wong.com/"
            twitter="https://twitter.com/jlfwong"
            photo={JamieImg}
          >
            Jamie Wong rants about technology on his blog, plays badminton, and
            occasionally writes some code for Flow.
            <br />
            <br />
            He also wrote Flow's very{' '}
            <a
              href="https://github.com/phleet/flask_debugtoolbar_lineprofilerpanel"
              target="_blank"
            >
              first piece of open source software!
            </a>
            <br />
            <br />
            He's worked at Facebook and Khan Academy where he learned to ride a
            ripstik and learned to juggle respectively.
          </TeamMember>
          <TeamMember
            name="Jeff Gulbronson"
            title="Maintainer (Flow 1.0)"
            program="Software Engineering 2018"
            website="http://jgulbronson.github.io/"
            linkedin="https://ca.linkedin.com/in/jgulbronson"
            photo={JeffImg}
          >
            Jeff enjoys juggling and getting involved in the Waterloo
            Engineering Society
            <br />
            <br />
            He has worked at Square, enjoying all the sunny weather San
            Francisco has to offer, and is currently enjoying all the rainy days
            Seattle has to offer while working at Seeq.
          </TeamMember>
          <TeamMember
            name="Terrance Kwok"
            title="Accounting and Finance (Flow 1.0)"
            twitter="http://twitter.com/terrancekwok"
            linkedin="http://www.linkedin.com/in/terrancekwok"
            photo={TerranceImg}
          >
            Terrance Kwok suffers from exercise induced asthma, but enjoys
            Indian food.
            <br />
            <br />
            He finds pleasure in the occasional IPA beer and as such, Terrance
            handles the business development side of Flow.
            <br />
            <br />
            Terrance has worked at KPMG and is currently pursuing an career in
            accounting and finance (seriously).
          </TeamMember>
          <TeamMember
            name="Shubham Datta"
            title="Accounting and Finance (Flow 1.0)"
            linkedin="http://www.linkedin.com/in/shubhamdatta"
            twitter="https://twitter.com/shubham"
            photo={ShubhamImg}
          >
            Shubham Datta wakes up each day with a mission to stop
            procrastinating tomorrow.
            <br />
            <br />
            He enjoys meeting and talking to new people everyday, and so he
            takes care of the business development side of Flow.
            <br />
            <br />
            Shubham has worked at KPMG and is currently pursuing a career in
            accounting and finance.
          </TeamMember>
        </PageBodyParagraph>
        <PageBodyHeader>Flow 1.0 Contributors</PageBodyHeader>
        <ul>
          <Contributor
            name="Kartik Talwar"
            about="http://kartikt.com/"
            gh="KartikTalwar"
          />
          <Contributor
            name="Ted Ying"
            about="https://github.com/yingted"
            gh="yingted"
          />
          <Contributor
            name="Gabriel Wong"
            about="https://www.gabrielwong.net/"
            gh="gabrielwong"
          />
          <Contributor
            name="Konrad Listwan-Ciesielski"
            about="https://github.com/klistwan/"
            gh="klistwan"
          />
          <Contributor
            name="Andy Zhang"
            about="http://andyzhang.net/"
            gh="andyzg"
          />
          <Contributor
            name="Mario Lamontagne"
            about="http://andyzhang.net/"
            gh="mario54"
          />
          <Contributor
            name="Jeff Gulbronson"
            about="https://github.com/JGulbronson"
            gh="JGulbronson"
          />
          <Contributor
            name="Ryan De Villa"
            about="https://github.com/ryandv"
            gh="ryandv"
          />
          <Contributor
            name="Joshua Kalpin"
            about="https://github.com/ryandv"
            gh="Kapin"
          />
          <Contributor
            name="Theo Belaire"
            about="https://github.com/ryandv"
            gh="tbelaire"
          />
          <Contributor
            name="George Ke"
            about="https://georgeke.github.io/"
            gh="georgeke"
          />
          <Contributor
            name="Charles Qi"
            about="https://github.com/ccqi"
            gh="ccqi"
          />
          <Contributor
            name="Saksham Sachdev"
            about="https://github.com/sachdevs"
            gh="sachdevs"
          />
        </ul>
      </PageBody>
    </PageContentWrapper>
  </PageWrapper>
);

export default AboutPage;

import React from 'react';

/* Styled Components */
import { LastUpdatedText, LastUpdatedLink } from './styles/LastUpdatedSchedule';

/* Utils */
import { splitCourseCode } from '../../utils/Misc';

const LastUpdatedSchedule = ({
  margin = '8px 0 0 0',
  courseCode = null,
  term = null,
  updatedAt = null,
}) => {
  const defaultLink = 'http://www.adm.uwaterloo.ca/infocour/CIR/SA/index.html';
  const [courseLetters, courseNum] = splitCourseCode(courseCode);
  const courseLevel =
    courseCode &&
    (['1', '2', '3', '4', '5'].includes(courseNum[0]) || courseNum.length < 3)
      ? 'under'
      : 'grad';
  const link =
    courseCode && term
      ? `http://www.adm.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl?level=${courseLevel}&sess=${term}&subject=${courseLetters}&cournum=${courseNum.toUpperCase()}`
      : defaultLink;

  return (
    <LastUpdatedText margin={margin}>
      Last updated {updatedAt.fromNow()} from{' '}
      <LastUpdatedLink href={link} target="_blank">
        adm.uwaterloo.ca
      </LastUpdatedLink>
    </LastUpdatedText>
  );
};

export default LastUpdatedSchedule;

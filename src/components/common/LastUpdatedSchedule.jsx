import React from 'react';
import moment from 'moment';
import { useQuery } from 'react-apollo';

/* Styled Components */
import { LastUpdatedText, LastUpdatedLink } from './styles/LastUpdatedSchedule';

/* GraphQL */
import { UPDATE_TIME_QUERY } from '../../graphql/queries/common/UpdateTime';

/* Utils */
import { splitCourseCode } from '../../utils/Misc';

const LastUpdatedSchedule = ({
  margin = '8px 0 0 0',
  courseCode = null,
  term = null,
}) => {
  const { data, loading } = useQuery(UPDATE_TIME_QUERY);

  let updatedTime = null;
  if (!loading && data) {
    data.update_time.forEach(update => {
      if (!updatedTime || moment(update.time).isAfter(moment(updatedTime))) {
        updatedTime = update.time;
      }
    });
  }

  const defaultLink = 'http://www.adm.uwaterloo.ca/infocour/CIR/SA/index.html';
  const [courseLetters, courseNum] = splitCourseCode(courseCode);
  const courseLevel =
    courseCode &&
    (['1', '2', '3', '4', '5'].includes(courseNum[0]) || courseNum.length < 3)
      ? 'under'
      : 'grad';
  const link =
    courseCode && term
      ? `http://www.adm.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl?level=${courseLevel}&sess=${term}&subject=${courseLetters}&cournum=${courseNum}`
      : defaultLink;

  return (
    <LastUpdatedText margin={margin}>
      Last updated {updatedTime && moment(data.update_time[0].time).fromNow()}{' '}
      from{' '}
      <LastUpdatedLink href={link} target="_blank">
        adm.uwaterloo.ca
      </LastUpdatedLink>
    </LastUpdatedText>
  );
};

export default LastUpdatedSchedule;

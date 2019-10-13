import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* Route Getters */
import { getCoursePageRoute } from '../../../Routes';

/* Styled Components */
import {
  CourseExtraInfoWrapper,
  Header,
  LineOfText,
  CourseText,
  TextbookText,
  GreyText,
} from './styles/CourseExtraInfo';

const processCourseCode = code => _.toUpper(code);

const CourseExtraInfo = ({ prereqs, postreqs, textbooks, courseCode }) => {
  return (
    <CourseExtraInfoWrapper>
      <Header>{`${processCourseCode(courseCode)} prerequisites`}</Header>
      {prereqs.map(course => (
        <LineOfText>
          <CourseText to={getCoursePageRoute(course.course.code)}>
            {`${processCourseCode(course.course.code)} - ${course.course.name}`}
          </CourseText>
        </LineOfText>
      ))}
      {prereqs.length == 0 && (
        <LineOfText>
          <GreyText>No Prerequisites</GreyText>
        </LineOfText>
      )}
      <Header>{`${processCourseCode(courseCode)} leads to`}</Header>
      {postreqs.map(course => (
        <LineOfText>
          <CourseText to={getCoursePageRoute(course.course.code)}>
            {`${processCourseCode(course.course.code)} - ${course.course.name}`}
          </CourseText>
        </LineOfText>
      ))}
      {postreqs.length == 0 && (
        <LineOfText>
          <GreyText>Nothing</GreyText>
        </LineOfText>
      )}
      <Header>Relevant textbooks</Header>
      {textbooks &&
        textbooks.map(book => (
          <LineOfText>
            <TextbookText>{book}</TextbookText>
          </LineOfText>
        ))}
      {(!textbooks || textbooks.length == 0) && (
        <LineOfText>
          <GreyText>None</GreyText>
        </LineOfText>
      )}
    </CourseExtraInfoWrapper>
  );
};

CourseExtraInfo.propTypes = {
  prereqs: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  postreqs: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  textbooks: PropTypes.object,
};

export default CourseExtraInfo;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ShortlistBoxWrapper,
  ShortlistHeading,
  ShortlistContentWrapper,
  ShortlistCourse,
  ShortListCourseText,
  ShortlistCourseCode,
  ShortlistCourseName
} from './styles/ShortlistBox';

/* Child Components */
import CollapseableContainer from '../../components/display/CollapseableContainer';
import ShortlistStar from '../../components/input/ShortlistStar';

/* Selectors */
import { getIsBrowserDesktop } from '../../data/reducers/BrowserReducer';

import { splitCourseCode } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

const mapStateToProps = state => ({
  isBrowserDesktop: getIsBrowserDesktop(state)
});

const ShortlistBox = ({ shortlistCourses, isBrowserDesktop }) => {
  const shorlistContent = (
    <>
      {shortlistCourses.map((course, idx) => (
        <ShortlistCourse key={idx}>
          <ShortlistStar initialState={true} courseID={course.course.id} />
          <ShortListCourseText>
            <ShortlistCourseCode to={getCoursePageRoute(course.course.code)}>
              {splitCourseCode(course.course.code)}
            </ShortlistCourseCode>
            <ShortlistCourseName>{course.course.name}</ShortlistCourseName>
          </ShortListCourseText>
        </ShortlistCourse>
      ))}
      {shortlistCourses.length === 0 ? (
        <ShortlistCourse>
          No shortlisted courses found
        </ShortlistCourse>
      ) : null}
    </>
  );

  return isBrowserDesktop ? (
    <ShortlistBoxWrapper>
      <ShortlistHeading>Shortlist</ShortlistHeading>
      <ShortlistContentWrapper>
        {shorlistContent}
      </ShortlistContentWrapper>
    </ShortlistBoxWrapper>
  ) : (
    <CollapseableContainer title="Shortlist" centerHeader={false}>
      {shorlistContent}
    </CollapseableContainer>
  );
};

ShortlistBox.propTypes = {
  shortlistCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(ShortlistBox);

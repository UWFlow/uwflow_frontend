import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Styled Components */

/* Child Components */
import CollapsibleContainer from 'components/display/CollapsibleContainer';
import ShortlistStar from 'components/input/ShortlistStar';

/* Selectors */
import { getIsBrowserDesktop } from 'data/reducers/RootReducer';

import { formatCourseCode } from 'utils/Misc';
import { getCoursePageRoute } from 'Routes';
import {
  ShortlistBoxWrapper,
  ShortlistHeading,
  ShortlistContentWrapper,
  ShortlistCourse,
  ShortListCourseText,
  ShortlistCourseCode,
  ShortlistCourseName,
  ShortlistCoursePlaceholder,
} from './styles/ShortlistBox';

const mapStateToProps = (state) => ({
  isBrowserDesktop: getIsBrowserDesktop(state),
});

const ShortlistBox = ({ shortlistCourses, isBrowserDesktop }) => {
  const sortedShortlist = shortlistCourses.sort(
    (a, b) => (a.course.code > b.course.code) - (a.course.code < b.course.code),
  );

  const shorlistContent = (
    <>
      {sortedShortlist.map((entry, idx) => (
        <ShortlistCourse key={idx}>
          <ShortlistStar
            key={entry.course.id}
            initialState={true}
            courseID={entry.course.id}
            courseCode={entry.course.code}
          />
          <ShortListCourseText>
            <ShortlistCourseCode to={getCoursePageRoute(entry.course.code)}>
              {formatCourseCode(entry.course.code)}
            </ShortlistCourseCode>
            <ShortlistCourseName>{entry.course.name}</ShortlistCourseName>
          </ShortListCourseText>
        </ShortlistCourse>
      ))}
      {shortlistCourses.length === 0 ? (
        <ShortlistCourse>
          <ShortlistCoursePlaceholder>
            No favourite courses found
          </ShortlistCoursePlaceholder>
        </ShortlistCourse>
      ) : null}
    </>
  );

  return isBrowserDesktop ? (
    <ShortlistBoxWrapper>
      <ShortlistHeading>Favourites</ShortlistHeading>
      <ShortlistContentWrapper>{shorlistContent}</ShortlistContentWrapper>
    </ShortlistBoxWrapper>
  ) : (
    <CollapsibleContainer
      title="Favourites"
      centerHeader={false}
      margin="0 0 32px 0"
    >
      {shorlistContent}
    </CollapsibleContainer>
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

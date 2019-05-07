import React from 'react';
import { connect } from 'react-redux';

/* Selectors */
import {
  getProfInfo,
  getProfRatings,
} from '../../../data/reducers/ProfReducer';

/* Styled Components */
import {
  ProfInfoBoxWrapper,
  InfoSection,
  ProfPicture,
  ProfInfo,
  ProfName,
  CoursesTaughtWrapper,
  RatingsSection,
} from './styles/ProfInfoBox';

/* Child Components */
import RatingBox from '../common/RatingBox';

const mapStateToProps = (state, { profID }) => ({
  info: getProfInfo(state, profID),
  ratings: getProfRatings(state, profID),
});

const ProfInfoBox = ({ info, ratings }) => {
  return info ? (
    <ProfInfoBoxWrapper>
      <InfoSection>
        <ProfPicture />
        <ProfInfo>
          <ProfName>{info.profName}</ProfName>
          <CoursesTaughtWrapper>
            Teaches{' '}
            {info.coursesTaught.length > 0
              ? info.coursesTaught.reduce(
                  (str, course, ind) =>
                    ind == 0 ? course : `${str}, ${course}`,
                  '',
                )
              : 'nothing apparently'}
          </CoursesTaughtWrapper>
        </ProfInfo>
      </InfoSection>
      <RatingsSection>
        <RatingBox
          numReviews={info}
          percentages={[
            {
              displayName: 'Likes',
              for: ratings.likes,
              against: ratings.dislikes,
            },
            {
              displayName: 'Clear',
              for: ratings.clear,
              against: ratings.unclear,
            },
            {
              displayName: 'Engaging',
              for: ratings.engaging,
              against: ratings.unengaging,
            },
          ]}
        />
      </RatingsSection>
    </ProfInfoBoxWrapper>
  ) : null;
};

export default connect(mapStateToProps)(ProfInfoBox);

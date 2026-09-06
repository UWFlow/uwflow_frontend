import { SwapCourseSectionFragment } from 'generated/graphql';

import {
  withoutScheduleAddition,
  withScheduleAddition,
} from './scheduleAdditions';
import { DisplayedTerm } from './useScheduleSwaps';

const section = (
  id: number,
  courseCode: string,
  sectionName: string,
): SwapCourseSectionFragment =>
  ({
    id,
    section_name: sectionName,
    course: { id: 1, code: courseCode, name: 'Course name' },
  } as SwapCourseSectionFragment);

describe('schedule additions', () => {
  it('replaces a prior choice for the same course component', () => {
    const lectureOne = section(1, 'ece358', 'LEC 001');
    const lectureTwo = section(2, 'ece358', 'LEC 002');
    const tutorial = section(3, 'ece358', 'TUT 101');

    let additions = withScheduleAddition({}, DisplayedTerm.Current, lectureOne);
    additions = withScheduleAddition(
      additions,
      DisplayedTerm.Current,
      tutorial,
    );
    additions = withScheduleAddition(
      additions,
      DisplayedTerm.Current,
      lectureTwo,
    );

    expect(additions[DisplayedTerm.Current]).toEqual([tutorial, lectureTwo]);
  });

  it('keeps additions in other displayed terms untouched', () => {
    const currentLecture = section(1, 'ece358', 'LEC 001');
    const nextLecture = section(2, 'ece358', 'LEC 002');
    const additions = withScheduleAddition(
      withScheduleAddition({}, DisplayedTerm.Current, currentLecture),
      DisplayedTerm.Next,
      nextLecture,
    );

    expect(additions[DisplayedTerm.Current]).toEqual([currentLecture]);
    expect(additions[DisplayedTerm.Next]).toEqual([nextLecture]);
  });

  it('removes one addition and cleans up an empty term', () => {
    const lecture = section(1, 'ece358', 'LEC 001');
    const additions = withScheduleAddition({}, DisplayedTerm.Current, lecture);

    expect(
      withoutScheduleAddition(additions, DisplayedTerm.Current, lecture.id),
    ).toEqual({});
  });
});

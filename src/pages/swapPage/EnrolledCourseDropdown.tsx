import React from 'react';

import { cn } from 'lib/utils';
import { formatCourseCode } from 'utils/Misc';

export type EnrolledCourse = {
  code: string;
  name: string;
};

type EnrolledCourseDropdownProps = {
  courses: EnrolledCourse[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onClose: () => void;
};

// Lightweight dropdown over the courses already in the user's schedule. Unlike
// CourseSearchDropdown (which searches every course in the term via GraphQL),
// this list is small and comes straight from the loaded schedule, so there's
// no search box, query, or virtualization.
const EnrolledCourseDropdown = ({
  courses,
  selectedCode,
  onSelect,
  onClose,
}: EnrolledCourseDropdownProps) => (
  <>
    <div className="fixed inset-0 z-[199]" onClick={onClose} />
    <div className="absolute left-0 top-[calc(100%+8px)] z-[200] flex max-h-[360px] min-w-[240px] flex-col overflow-hidden rounded border border-solid border-light3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
      <div className="overflow-y-auto">
        {courses.map((course) => (
          <button
            key={course.code}
            type="button"
            className={cn(
              'flex w-full cursor-pointer items-center border-0 border-b border-solid border-light2 px-3.5 py-2.5 text-left font-inter last:border-b-0 hover:bg-light1',
              course.code === selectedCode ? 'bg-[#eef4ff]' : 'bg-transparent',
            )}
            onClick={() => onSelect(course.code)}
          >
            <span className="shrink-0 text-[13px] font-bold text-courses">
              {formatCourseCode(course.code)}
            </span>
            <span className="ml-2 min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-dark3">
              {course.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  </>
);

export default EnrolledCourseDropdown;

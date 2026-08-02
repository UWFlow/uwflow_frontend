import React, { useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import useOnClickOutside from 'use-onclickoutside';

import { cn } from 'lib/utils';
import { formatCourseCode } from 'utils/Misc';

export type EnrolledCourse = {
  code: string;
  name: string;
};

type EnrolledCourseDropdownProps = {
  courses: EnrolledCourse[];
  selectedCode: string;
  onSelect: (code: string) => void;
};

// Lightweight dropdown over the courses already in the user's schedule. Unlike
// CourseSearchDropdown (which searches every course in the term via GraphQL),
// this list is small and comes straight from the loaded schedule, so there's
// no search box, query, or virtualization. Owns its own open state — same
// pattern as SearchBar / DropdownList.
const EnrolledCourseDropdown = ({
  courses,
  selectedCode,
  onSelect,
}: EnrolledCourseDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative min-w-0" ref={ref}>
      <button
        aria-expanded={open}
        className="flex h-8 min-w-0 max-w-full cursor-pointer items-center gap-1 border-none bg-transparent p-0 font-inter text-sm font-semibold text-courses outline-none hover:underline"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="truncate">{formatCourseCode(selectedCode)}</span>
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 text-courses"
          size={14}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[200] flex max-h-[360px] min-w-[240px] flex-col overflow-hidden rounded border border-solid border-light3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <div className="overflow-y-auto">
            {courses.map((course) => (
              <button
                key={course.code}
                type="button"
                className={cn(
                  'flex w-full cursor-pointer items-center border-0 border-b border-solid border-light2 px-3.5 py-2.5 text-left font-inter last:border-b-0 hover:bg-light1',
                  course.code === selectedCode
                    ? 'bg-[#eef4ff]'
                    : 'bg-transparent',
                )}
                onClick={() => {
                  onSelect(course.code);
                  setOpen(false);
                }}
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
      )}
    </div>
  );
};

export default EnrolledCourseDropdown;

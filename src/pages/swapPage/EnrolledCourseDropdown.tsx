import React from 'react';
import { ChevronDown } from 'react-feather';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
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
// no search box, query, or virtualization. Open state, outside-click/Escape
// dismissal and menu a11y all come from the shared DropdownMenu primitive.
const EnrolledCourseDropdown = ({
  courses,
  selectedCode,
  onSelect,
}: EnrolledCourseDropdownProps) => (
  // Non-modal: Radix's modal mode scroll-locks the body, which would shift the
  // page the moment the menu opens. The toolbar dropdown never warranted that.
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <button
        className="flex h-8 min-w-0 max-w-full cursor-pointer items-center gap-1 border-none bg-transparent p-0 font-inter text-sm font-semibold text-courses outline-none hover:underline"
        type="button"
      >
        <span className="truncate">{formatCourseCode(selectedCode)}</span>
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 text-courses"
          size={14}
        />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      className="max-h-[360px] min-w-[240px] p-0"
      sideOffset={8}
    >
      {courses.map((course) => (
        <DropdownMenuItem
          key={course.code}
          className={cn(
            'rounded-none border-0 border-b border-solid border-light2 px-3.5 py-2.5 last:border-b-0',
            course.code === selectedCode && 'bg-[#eef4ff]',
          )}
          onSelect={() => onSelect(course.code)}
        >
          <span className="shrink-0 text-[13px] font-bold text-courses">
            {formatCourseCode(course.code)}
          </span>
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-dark3">
            {course.name}
          </span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default EnrolledCourseDropdown;

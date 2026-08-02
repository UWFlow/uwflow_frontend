import React from 'react';
import { ChevronDown } from 'react-feather';

import { formatCourseCode } from 'utils/Misc';

type CourseDropdownTriggerProps = {
  code: string;
  open: boolean;
  onClick: () => void;
};

// The course-code button that opens either swap dropdown. Both dropdowns render
// the same trigger, so it lives here rather than being copied into each.
const CourseDropdownTrigger = ({
  code,
  open,
  onClick,
}: CourseDropdownTriggerProps) => (
  <button
    aria-expanded={open}
    aria-haspopup="true"
    className="flex h-8 min-w-0 max-w-full cursor-pointer items-center gap-1 border-none bg-transparent p-0 font-inter text-sm font-semibold text-courses outline-none hover:underline"
    onClick={onClick}
    type="button"
  >
    <span className="truncate">{formatCourseCode(code)}</span>
    <ChevronDown
      aria-hidden="true"
      className="shrink-0 text-courses"
      size={14}
    />
  </button>
);

export default CourseDropdownTrigger;

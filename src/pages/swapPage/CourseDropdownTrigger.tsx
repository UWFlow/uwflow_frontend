import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'react-feather';

import { formatCourseCode } from 'utils/Misc';

type CourseDropdownTriggerProps = {
  code: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// The course-code button that opens either swap dropdown, plus the open/close
// affordances that go with it: clicking toggles, and Escape closes while open
// so keyboard users aren't stuck with the pointer-only backdrop click. Both
// dropdowns render this rather than copying the button and the key handling.
const CourseDropdownTrigger = ({
  code,
  open,
  onOpen,
  onClose,
}: CourseDropdownTriggerProps) => {
  // Held in a ref so callers don't have to memoize the handler just to stop
  // the listener rebinding on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <button
      aria-expanded={open}
      aria-haspopup="true"
      className="flex h-8 min-w-0 max-w-full cursor-pointer items-center gap-1 border-none bg-transparent p-0 font-inter text-sm font-semibold text-courses outline-none hover:underline"
      onClick={() => (open ? onClose() : onOpen())}
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
};

export default CourseDropdownTrigger;

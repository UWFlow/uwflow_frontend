import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-apollo';

import { COURSE_DROPDOWN_TERM_QUERY } from 'graphql/queries/course/SwapCourse';
import { formatCourseCode } from 'utils/Misc';

type CourseItem = { code: string; name: string };
type CourseDropdownQuery = {
  course: Array<{ code: string | null; name: string | null }>;
};

type CourseSearchDropdownProps = {
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onClose: () => void;
  termId: number;
};

const CourseSearchDropdown = ({
  selectedCode,
  onSelect,
  onClose,
  termId,
}: CourseSearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { data, loading } = useQuery<CourseDropdownQuery>(
    COURSE_DROPDOWN_TERM_QUERY,
    {
      variables: { termId },
    },
  );

  const allCourses: CourseItem[] = (data?.course ?? []).filter(
    (c): c is CourseItem => !!c.code && !!c.name,
  );

  const trimmed = searchQuery.trim().toLowerCase();
  const filteredCourses = trimmed
    ? allCourses.filter(
        (c) =>
          c.code.toLowerCase().includes(trimmed) ||
          c.name.toLowerCase().includes(trimmed),
      )
    : allCourses;

  return (
    <>
      <div className="fixed inset-0 z-[199]" onClick={onClose} />
      <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-md shadow-lg z-[200] min-w-[300px] max-h-[360px] overflow-hidden flex flex-col">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search courses…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full box-border px-3.5 py-2.5 border-none border-b border-gray-200 text-sm outline-none bg-transparent shrink-0 placeholder-gray-400"
          style={{ borderBottom: '1px solid #e5e7eb' }}
        />
        <ul className="overflow-y-auto flex-1 m-0 p-0 list-none">
          {loading && (
            <li className="px-3.5 py-4 text-[13px] text-gray-400 text-center">
              Loading courses…
            </li>
          )}
          {!loading && filteredCourses.length === 0 && (
            <li className="px-3.5 py-4 text-[13px] text-gray-400 text-center">
              No courses found for &quot;{searchQuery}&quot;
            </li>
          )}
          {!loading &&
            filteredCourses.map((course) => (
              <li key={course.code}>
                <button
                  type="button"
                  className={[
                    'flex items-center w-full px-3.5 py-2.5 border-none border-b border-gray-100 last:border-b-0 text-sm text-gray-900 cursor-pointer text-left hover:bg-gray-50',
                    course.code === selectedCode
                      ? 'bg-blue-50'
                      : 'bg-transparent',
                  ].join(' ')}
                  onClick={() => onSelect(course.code)}
                >
                  <span className="font-bold text-[13px] text-blue-600 shrink-0">
                    {formatCourseCode(course.code)}
                  </span>
                  <span className="text-xs text-gray-400 flex-1 min-w-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    {course.name}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CourseSearchDropdown;

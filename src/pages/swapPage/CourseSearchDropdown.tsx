import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useQuery } from '@apollo/client';
import fuzzysort from 'fuzzysort';

import { COURSE_DROPDOWN_TERM_QUERY } from 'graphql/queries/course/SwapCourse';
import { formatCourseCode } from 'utils/Misc';

import {
  DropdownCourseCode,
  DropdownCourseName,
  DropdownEmptyState,
  SwapDropdownItem,
  SwapDropdownList,
  SwapDropdownOverlay,
  SwapDropdownSearchInput,
  SwapDropdownWrapper,
} from './styles/SwapCalendar';

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

type RowData = {
  courses: CourseItem[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
};

const ITEM_HEIGHT = 40;
const MAX_LIST_HEIGHT = 316;

const CourseRow = ({
  index,
  style,
  data,
}: ListChildComponentProps<RowData>) => {
  const { courses, selectedCode, onSelect } = data;
  const course = courses[index];
  return (
    <SwapDropdownItem
      style={style}
      isSelected={course.code === selectedCode}
      isEnrolled={false}
      onClick={() => onSelect(course.code)}
    >
      <DropdownCourseCode>{formatCourseCode(course.code)}</DropdownCourseCode>
      <DropdownCourseName>{course.name}</DropdownCourseName>
    </SwapDropdownItem>
  );
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
    { variables: { termId } },
  );

  const allCourses: CourseItem[] = (data?.course ?? []).filter(
    (c): c is CourseItem => !!c.code && !!c.name,
  );

  const trimmed = searchQuery.trim();
  const filteredCourses: CourseItem[] = trimmed
    ? fuzzysort
        .go(trimmed, allCourses, {
          keys: ['code', 'name'],
          threshold: -10000,
          allowTypo: true,
        })
        .map((r) => r.obj)
    : allCourses;

  const itemData: RowData = {
    courses: filteredCourses,
    selectedCode,
    onSelect,
  };
  const listHeight = Math.min(
    filteredCourses.length * ITEM_HEIGHT,
    MAX_LIST_HEIGHT,
  );

  const renderBody = () => {
    if (loading) {
      return <DropdownEmptyState>Loading courses…</DropdownEmptyState>;
    }
    if (filteredCourses.length === 0) {
      return (
        <DropdownEmptyState>
          No courses found for &quot;{searchQuery}&quot;
        </DropdownEmptyState>
      );
    }
    return (
      <FixedSizeList
        height={listHeight}
        itemCount={filteredCourses.length}
        itemSize={ITEM_HEIGHT}
        width="100%"
        itemData={itemData}
      >
        {CourseRow}
      </FixedSizeList>
    );
  };

  return (
    <>
      <SwapDropdownOverlay onClick={onClose} />
      <SwapDropdownWrapper>
        <SwapDropdownSearchInput
          ref={inputRef}
          placeholder="Search courses…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SwapDropdownList>{renderBody()}</SwapDropdownList>
      </SwapDropdownWrapper>
    </>
  );
};

export default CourseSearchDropdown;

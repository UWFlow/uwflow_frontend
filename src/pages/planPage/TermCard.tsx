import React, { DragEvent, useRef, useState } from 'react';
import { AlertTriangle, Check, Menu, Plus, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { getCoursePageRoute } from 'Routes';

import CourseSearchDropdown from 'components/input/CourseSearchDropdown';
import { cn } from 'lib/utils';
import { formatCourseCode, termCodeToDate } from 'utils/Misc';

import { PlannerTerm } from './planner';

const DRAG_MIME = 'application/x-uwflow-plan-course';

type TermCardProps = {
  term: PlannerTerm;
  // "needs CODE" prereq warnings keyed by `${termId}-${courseId}`
  warnings: Map<string, string>;
  onAddCourse: (termId: number, code: string) => void;
  onRemoveCourse: (termId: number, courseId: number) => void;
  onMoveCourse: (
    courseId: number,
    fromTermId: number,
    toTermId: number,
  ) => void;
};

const TermCard = ({
  term,
  warnings,
  onAddCourse,
  onRemoveCourse,
  onMoveCourse,
}: TermCardProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  // dragenter/dragleave fire for every child; count them so the highlight
  // doesn't flicker while dragging across course rows.
  const dragDepth = useRef(0);

  const totalUnits = term.courses.reduce(
    (sum, course) => sum + course.units,
    0,
  );

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragDepth.current = 0;
    setDragOver(false);
    try {
      const payload = JSON.parse(e.dataTransfer.getData(DRAG_MIME));
      onMoveCourse(payload.courseId, payload.fromTermId, term.termId);
    } catch {
      // Not one of our drags; ignore.
    }
  };

  return (
    <div
      className={cn(
        'flex min-h-[220px] flex-col rounded-lg bg-white p-md shadow-box',
        !term.taken && dragOver && 'ring-2 ring-primary',
      )}
      onDragOver={(e) => {
        if (!term.taken && e.dataTransfer.types.includes(DRAG_MIME)) {
          e.preventDefault();
        }
      }}
      onDragEnter={(e) => {
        if (term.taken || !e.dataTransfer.types.includes(DRAG_MIME)) return;
        dragDepth.current += 1;
        setDragOver(true);
      }}
      onDragLeave={() => {
        if (term.taken) return;
        dragDepth.current = Math.max(0, dragDepth.current - 1);
        if (dragDepth.current === 0) setDragOver(false);
      }}
      onDrop={term.taken ? undefined : handleDrop}
    >
      <div className="mb-md flex items-center gap-sm">
        {term.level && (
          <span className="text-lg font-extrabold text-dark1">
            {term.level}
          </span>
        )}
        <span className="text-xs text-dark3">
          {termCodeToDate(term.termId)}
        </span>
        {term.taken && (
          <span className="flex items-center gap-xs text-xs font-semibold text-professors">
            <Check size={12} strokeWidth={3} />
            taken
          </span>
        )}
        <span
          className={cn(
            'ml-auto whitespace-nowrap rounded-full px-sm py-xs text-xs font-semibold',
            term.taken
              ? 'bg-professors/10 text-professors'
              : 'bg-accent/20 text-dark2',
          )}
        >
          {totalUnits.toFixed(1)} units
        </span>
      </div>

      <div className="flex flex-col gap-sm">
        {term.courses.map((course) => {
          const warning = warnings.get(`${term.termId}-${course.courseId}`);
          return (
            <div
              key={course.courseId}
              draggable={!term.taken}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  DRAG_MIME,
                  JSON.stringify({
                    courseId: course.courseId,
                    fromTermId: term.termId,
                  }),
                );
                e.dataTransfer.effectAllowed = 'move';
              }}
              className={cn(
                'flex items-center gap-sm rounded-card border border-solid bg-white px-sm py-sm',
                warning ? 'border-courses' : 'border-light3',
                !term.taken && 'cursor-grab active:cursor-grabbing',
              )}
            >
              {!term.taken && (
                <Menu size={12} className="shrink-0 text-light4" />
              )}
              <div className="min-w-0 flex-1">
                <Link
                  to={getCoursePageRoute(course.code)}
                  className="text-sm font-semibold text-courses no-underline hover:underline"
                >
                  {formatCourseCode(course.code)}
                </Link>
                {warning && (
                  <div className="flex items-center gap-xs text-xs font-semibold text-red">
                    <AlertTriangle size={11} />
                    needs {formatCourseCode(warning)}
                  </div>
                )}
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-dark3">
                  {course.name}
                </div>
              </div>
              {!term.taken && (
                <button
                  type="button"
                  aria-label={`Remove ${formatCourseCode(course.code)}`}
                  className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-dark3 hover:text-red"
                  onClick={() => onRemoveCourse(term.termId, course.courseId)}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          );
        })}

        {!term.taken && (
          <div className="relative">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-xs rounded-card border border-dashed border-light4 bg-transparent py-sm text-sm text-dark2 hover:border-primary hover:text-primary"
              onClick={() => setSearchOpen(true)}
            >
              <Plus size={14} />
              Add course
            </button>
            {searchOpen && (
              <CourseSearchDropdown
                selectedCode={null}
                onSelect={(code) => {
                  setSearchOpen(false);
                  onAddCourse(term.termId, code);
                }}
                onClose={() => setSearchOpen(false)}
                positionClasses="left-0 top-[calc(100%+4px)]"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TermCard;

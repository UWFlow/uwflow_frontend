import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Lock } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';

import LoadingSpinner from 'components/display/LoadingSpinner';
import TranscriptUploadModalContent from 'components/upload/TranscriptUploadModalContent';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import {
  DELETE_USER_COURSE_PLAN,
  INSERT_USER_COURSE_PLAN,
  MOVE_USER_COURSE_PLAN,
} from 'graphql/mutations/CoursePlan';
import {
  COURSE_DROPDOWN_ALL_QUERY,
  CourseDropdownAllQuery,
  GET_PLANNER_DATA,
  PlannerDataQuery,
  PlannerDataQueryVariables,
} from 'graphql/queries/planner/Planner';
import useModal from 'hooks/useModal';
import { cn } from 'lib/utils';
import { getUserId } from 'utils/Auth';
import { loadTranscriptGrades } from 'utils/Gpa';
import { formatCourseCode, getCurrentTermCode } from 'utils/Misc';

import ChecklistSidebar from './ChecklistSidebar';
import GpaCard from './GpaCard';
import {
  buildTerms,
  computePrereqWarnings,
  PlanRow,
  toPlanRows,
} from './planner';
import TermCard from './TermCard';

const planPageWrapperClasses = 'min-h-page w-full bg-light1 pb-xl';

const PlanPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [openModal] = useModal();
  const userId = getUserId();

  const { loading, data, refetch } = useQuery<
    PlannerDataQuery,
    PlannerDataQueryVariables
  >(GET_PLANNER_DATA, { variables: { id: userId }, skip: !isLoggedIn });
  const allCoursesQuery = useQuery<CourseDropdownAllQuery>(
    COURSE_DROPDOWN_ALL_QUERY,
    { skip: !isLoggedIn },
  );

  const [insertPlan] = useMutation(INSERT_USER_COURSE_PLAN);
  const [deletePlan] = useMutation(DELETE_USER_COURSE_PLAN);
  const [movePlan] = useMutation(MOVE_USER_COURSE_PLAN);

  // Plan rows are edited optimistically and re-synced whenever the query
  // refetches (mutations refetch on error, adds refetch to pick up prereqs).
  const [planRows, setPlanRows] = useState<PlanRow[]>([]);
  useEffect(() => {
    if (data) setPlanRows(toPlanRows(data.user_course_plan));
  }, [data]);

  // Grades live only in localStorage; bump gradeVersion to re-read after an
  // upload.
  const [gradeVersion, setGradeVersion] = useState(0);
  const gradeStore = useMemo(
    () =>
      isLoggedIn && gradeVersion >= 0 ? loadTranscriptGrades(userId) : null,
    [isLoggedIn, userId, gradeVersion],
  );

  const checklistStorageKey = `plan_checklists_${userId}`;
  const [selectedChecklists, setSelectedChecklists] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(checklistStorageKey) || '[]');
    } catch {
      return [];
    }
  });
  const selectChecklists = (ids: number[]) => {
    setSelectedChecklists(ids);
    localStorage.setItem(checklistStorageKey, JSON.stringify(ids));
  };

  const terms = useMemo(
    () =>
      data
        ? buildTerms(
            data.user_course_taken,
            planRows,
            getCurrentTermCode(),
            gradeStore,
          )
        : [],
    [data, planRows, gradeStore],
  );
  const warnings = useMemo(() => computePrereqWarnings(terms), [terms]);

  const haveCodes = useMemo(
    () =>
      new Set(
        terms.flatMap((term) => term.courses.map((course) => course.code)),
      ),
    [terms],
  );

  const onMutationError = () => {
    toast('Failed to save your plan — please try again');
    refetch();
  };

  const handleAddCourse = (termId: number, code: string) => {
    if (haveCodes.has(code)) {
      toast(`${formatCourseCode(code)} is already in your plan`);
      return;
    }
    const course = allCoursesQuery.data?.course.find((c) => c.code === code);
    if (!course) return;
    setPlanRows((rows) => [
      ...rows,
      { termId, courseId: course.id, code, name: course.name, prereqs: [] },
    ]);
    insertPlan({
      variables: { user_id: userId, course_id: course.id, term_id: termId },
    })
      // Refetch to pick up the new course's prerequisites for warnings.
      .then(() => refetch())
      .catch(onMutationError);
  };

  const handleRemoveCourse = (termId: number, courseId: number) => {
    setPlanRows((rows) =>
      rows.filter(
        (row) => !(row.termId === termId && row.courseId === courseId),
      ),
    );
    deletePlan({ variables: { course_id: courseId, term_id: termId } }).catch(
      onMutationError,
    );
  };

  const handleMoveCourse = (
    courseId: number,
    fromTermId: number,
    toTermId: number,
  ) => {
    if (fromTermId === toTermId) return;
    setPlanRows((rows) =>
      rows.map((row) =>
        row.termId === fromTermId && row.courseId === courseId
          ? { ...row, termId: toTermId }
          : row,
      ),
    );
    movePlan({
      variables: {
        user_id: userId,
        course_id: courseId,
        from_term_id: fromTermId,
        to_term_id: toTermId,
      },
    }).catch(onMutationError);
  };

  const totalUnits = terms.reduce(
    (sum, term) =>
      sum + term.courses.reduce((termSum, course) => termSum + course.units, 0),
    0,
  );
  const totalCourses = terms.reduce(
    (sum, term) => sum + term.courses.length,
    0,
  );
  const hasTranscript = (data?.user_course_taken.length ?? 0) > 0;
  const program = data?.user[0]?.program;

  const helmet = (
    <Helmet>
      <title>Plan - UW Flow</title>
      <meta
        name="description"
        content="Plan your degree term by term: import your transcript, check prerequisites and degree requirements, and calculate your GPA."
      />
    </Helmet>
  );

  if (!isLoggedIn) {
    return (
      <div className={planPageWrapperClasses}>
        {helmet}
        <div className="flex justify-center pt-[150px]">
          <div className="flex max-w-[400px] flex-col items-center gap-3 rounded bg-white px-12 py-10 text-center shadow-[0_8px_32px_rgba(23,43,77,0.16)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-light2 text-dark2">
              <Lock size={24} />
            </div>
            <h2 className="mb-0 mt-1 text-xl font-bold text-dark1">
              Log in to plan your degree
            </h2>
            <p className="m-0 text-sm leading-normal text-dark2">
              Import your transcript to see the courses you&apos;ve taken, plan
              future terms, track degree requirements, and calculate your GPA.
            </p>
            <button
              type="button"
              className="mt-2 cursor-pointer rounded border-none bg-accent px-7 py-3 text-[15px] font-semibold text-dark1 transition-[filter] duration-100 ease-in hover:brightness-95"
              onClick={() => openModal(AUTH_MODAL)}
            >
              Log in to continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className={planPageWrapperClasses}>
        {helmet}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={planPageWrapperClasses}>
      {helmet}

      <div className="bg-dark1 px-page py-lg text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-lg">
          <div className="min-w-0 flex-1">
            <div className="mb-xs flex items-center gap-xs text-xs text-light4">
              <BookOpen size={14} />
              Course planner
            </div>
            <h1 className="m-0 text-2xl font-extrabold">
              {program || 'Your degree'}
            </h1>
            <p className="m-0 mt-xs text-sm text-light4">
              Drag courses between terms · add from search · we check
              prerequisites as you go
            </p>
          </div>
          <div className="flex gap-lg">
            {[
              [totalUnits.toFixed(1), 'units planned'],
              [String(totalCourses), 'courses'],
              [String(terms.length), 'terms'],
            ].map(([value, label]) => (
              <div key={label} className="text-right">
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-xs text-light4">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] animate-fade-in flex-col gap-md px-md pt-md desktop:flex-row">
        <div className="grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-md">
          {terms.map((term) => (
            <TermCard
              key={term.termId}
              term={term}
              warnings={warnings}
              onAddCourse={handleAddCourse}
              onRemoveCourse={handleRemoveCourse}
              onMoveCourse={handleMoveCourse}
            />
          ))}
        </div>
        <div className="flex w-full shrink-0 flex-col gap-md desktop:w-[320px]">
          <GpaCard
            gradeStore={gradeStore}
            onAfterUploadSuccess={() => {
              setGradeVersion((version) => version + 1);
              refetch();
            }}
          />
          <ChecklistSidebar
            checklists={data.checklist}
            selectedIds={selectedChecklists}
            haveCodes={haveCodes}
            onSelect={selectChecklists}
          />
        </div>
      </div>

      {/* First visit: prompt for a transcript import, like the swap page. */}
      <div
        className={cn(
          'fixed inset-0 z-10 box-border flex items-start justify-center overflow-y-auto bg-white/55 backdrop-blur [transition:opacity_0.4s_ease]',
          !hasTranscript
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        {!hasTranscript && (
          <div className="mt-[150px] flex justify-center">
            <TranscriptUploadModalContent
              onAfterUploadSuccess={() => {
                setGradeVersion((version) => version + 1);
                refetch();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanPage;

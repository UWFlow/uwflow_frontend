import { isCurrentTerm, secsToTime, processDateString } from './Misc';

export const processSectionExams = (sections: any, courseCode: any): any => {
  const groupedExams = sections.reduce((groups: any, section: any) => {
    if (!isCurrentTerm(section.term_id)) {
      return groups;
    }
    section.exams.forEach((exam: any) => {
      const examKey = `${courseCode}${exam.is_tba}${exam.location}${exam.date}${exam.start_seconds}${exam.end_seconds}`;
      if (examKey in groups) {
        groups[examKey].sections.push(section.section_name);
      } else {
        groups[examKey] = {
          code: courseCode,
          sections: [section.section_name],
          time: `${secsToTime(exam.start_seconds)} - ${secsToTime(
            exam.end_seconds,
          )}`,
          date: `${processDateString(exam.date)}`,
          location: exam.location,
        };
      }
    });
    return groups;
  }, {});
  return Object.values(groupedExams);
};

export const processMultipleCourseExams = (courses: any) =>
  courses.reduce((allExams: any, course: any) => {
    if (course.sections && course.sections.length > 0) {
      const groupedExams = processSectionExams(course.sections, course.code);
      groupedExams.map((exam: any) => allExams.push(exam));
    }
    return allExams;
  }, []);

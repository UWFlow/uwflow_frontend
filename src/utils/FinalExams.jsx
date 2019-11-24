import { isCurrentTerm, secsToTime, processDateString } from './Misc';

export const processSectionExams = (sections, courseCode) => {
  const groupedExams = sections.reduce((groups, section) => {
    if (!isCurrentTerm(section.term)) {
      return groups;
    }
    section.exams.forEach(exam => {
      const examKey = `${courseCode}${exam.is_tba}${exam.location}${exam.date}${exam.start_seconds}${exam.end_seconds}`;
      if (examKey in groups) {
        groups[examKey].sections.push(section.section);
      } else {
        groups[examKey] = {
          code: courseCode,
          sections: [section.section],
          time: `${secsToTime(exam.start_seconds)} - ${secsToTime(exam.end_seconds)}`,
          date: `${processDateString(exam.date)}`,
          location: exam.location,
        }
      }
    });
    return groups;
  }, {});
  return Object.values(groupedExams);
};

export const processMultipleCourseExams = courses => courses.reduce((allExams, course) => {
  if (course.sections && course.sections.length > 0) {
    const groupedExams = processSectionExams(course.sections, course.code);
    groupedExams.map(exam => allExams.push(exam));
  }
  return allExams;
}, []);

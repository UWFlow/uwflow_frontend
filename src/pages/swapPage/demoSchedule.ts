import { UserScheduleFragment } from 'generated/graphql';

// Sample schedule rendered behind the logged-out lock overlay so the page
// doesn't look empty. Dated "today" so it always lands in the current term
// tab, and given negative ids so it can never collide with real sections.
const today = new Date().toISOString().slice(0, 10);

const hour = (h: number, m = 0) => h * 3600 + m * 60;

const demoSection = (
  id: number,
  code: string,
  name: string,
  sectionName: string,
  location: string,
  days: string[],
  startSeconds: number,
  endSeconds: number,
) => ({
  section: {
    id,
    exams: [],
    meetings: [
      {
        days,
        end_date: today,
        end_seconds: endSeconds,
        is_cancelled: false,
        location,
        prof: null,
        section_id: id,
        start_date: today,
        start_seconds: startSeconds,
      },
    ],
    section_name: sectionName,
    course: { id, name, code },
  },
});

const DEMO_SCHEDULE = [
  demoSection(
    -1,
    'math239',
    'Introduction to Combinatorics',
    'LEC 001',
    'MC 2017',
    ['M', 'W', 'F'],
    hour(9, 30),
    hour(10, 20),
  ),
  demoSection(
    -2,
    'cs240',
    'Data Structures and Data Management',
    'LEC 001',
    'DC 1351',
    ['T', 'Th'],
    hour(9, 30),
    hour(10, 20),
  ),
  demoSection(
    -3,
    'stat231',
    'Statistics',
    'LEC 002',
    'MC 4045',
    ['T', 'Th'],
    hour(10, 30),
    hour(11, 20),
  ),
  demoSection(
    -4,
    'cs241',
    'Foundations of Sequential Programs',
    'LEC 001',
    'MC 4045',
    ['M', 'W', 'F'],
    hour(11, 30),
    hour(12, 20),
  ),
  demoSection(
    -5,
    'fine100',
    'Fundamentals of Art and Design',
    'LEC 001',
    'ML 246',
    ['T'],
    hour(13, 30),
    hour(14, 50),
  ),
] as unknown as UserScheduleFragment['schedule'];

export default DEMO_SCHEDULE;

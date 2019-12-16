import fuzzysort from 'fuzzysort';
import LZString from 'lz-string';
import { SEARCH_DATA_ENDPOINT, BACKEND_ENDPOINT } from '../constants/Api';
import { splitCourseCode } from '../utils/Misc';

const RATING_MULTIPLIER = 0.1;
const MAX_AUTOCOMPLETE_LENGTH = 50;

const searchOptions = {
  threshold: -1000,
  allowTypo: true,
};

const courseOptions = {
  ...searchOptions,
  keys: ['fullText', 'code', 'profs'],
  scoreFn: a =>
    Math.max(
      a[0] ? a[0].score : -10000,
      a[1] ? a[1].score : -10000,
      a[2] ? a[2].score - 50 : -10000,
    ),
};

const profOptions = {
  ...searchOptions,
  keys: ['name', 'courses'],
  scoreFn: a =>
    Math.max(a[0] ? a[0].score : -10000, a[1] ? a[1].score - 50 : -10000),
};

const courseCodeOptions = {
  ...searchOptions,
  key: 'code',
};

const weightByRatings = results =>
  results.sort((a, b) => {
    const ratingDifference = b.obj.rating_count - a.obj.rating_count;
    return a.score === b.score
      ? ratingDifference
      : b.score - a.score + ratingDifference * RATING_MULTIPLIER;
  });

class SearchClient {
  constructor() {
    this.courses = [];
    this.profs = [];
    this.courseCodes = [];
  }

  autocomplete(query = '') {
    if (query.length === 0) {
      return { courseResults: [], profResults: [], courseCodeResults: [] };
    }

    if (query.length > MAX_AUTOCOMPLETE_LENGTH) {
      query = query.slice(0, MAX_AUTOCOMPLETE_LENGTH);
    }

    const parsedQuery = query
      .split(' ')
      .map(term => splitCourseCode(term))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    let courseResults = fuzzysort.go(parsedQuery, this.courses, courseOptions);
    let profResults = fuzzysort.go(parsedQuery, this.profs, profOptions);
    let courseCodeResults = fuzzysort.go(
      parsedQuery,
      this.courseCodes,
      courseCodeOptions,
    );

    if (courseCodeResults.length === 0) {
      courseCodeResults = fuzzysort.go(
        parsedQuery.split(' ')[0],
        this.courseCodes,
        courseCodeOptions,
      );
    }

    // reranking by rating count
    courseResults = weightByRatings(courseResults).slice(0, 4);
    profResults = weightByRatings(profResults).slice(0, 2);
    courseCodeResults = weightByRatings(courseCodeResults).slice(0, 2);

    return {
      courseResults: courseResults.map(res => res.obj),
      profResults: profResults.map(res => res.obj),
      courseCodeResults: courseCodeResults.map(res => res.obj),
    };
  }

  async buildIndices(searchData, lastIndexedDate) {
    let parsedSearchData;
    let indexedDate = lastIndexedDate;

    // fetch data if not passed in from localstorage
    if (searchData === null) {
      const response = await fetch(
        `${BACKEND_ENDPOINT}${SEARCH_DATA_ENDPOINT}`,
      );
      parsedSearchData = await response.json();
      indexedDate = Date();
    } else {
      parsedSearchData = JSON.parse(LZString.decompressFromUTF16(searchData));
    }

    // parse data
    let courseCodeSet = new Set([]);
    let courseCodeRatings = {};

    const courses = parsedSearchData.courses.map(course => {
      const courseLetters = splitCourseCode(course.code).split(' ')[0];
      courseCodeSet.add(courseLetters);

      // total number of ratings for reranking during search
      if (!courseCodeRatings.hasOwnProperty(courseLetters)) {
        courseCodeRatings[courseLetters] = 0;
      }
      courseCodeRatings[courseLetters] += course.rating_count;

      return {
        ...course,
        code: splitCourseCode(course.code),
        fullText: `${splitCourseCode(course.code)} — ${course.name}`,
        profs: course.profs === null ? '' : course.profs.join(' '),
      };
    });

    const profs = parsedSearchData.profs.map(prof => {
      return {
        ...prof,
        courses:
          prof.courses === null
            ? ''
            : prof.courses.map(course => splitCourseCode(course)).join(' '),
      };
    });

    const courseCodes = Array.from(courseCodeSet).map(code =>
      Object({ code, rating_count: courseCodeRatings[code] }),
    );

    // swap old indices with new
    this.courses = courses;
    this.profs = profs;
    this.courseCodes = courseCodes;

    // return compressed raw data for localstorage
    return [
      LZString.compressToUTF16(JSON.stringify(parsedSearchData)),
      indexedDate,
    ];
  }
}

export default SearchClient;

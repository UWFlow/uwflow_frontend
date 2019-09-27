import Fuse from 'fuse.js';
import LZString from 'lz-string';
import { SEARCH_DATA_ENDPOINT, BACKEND_ENDPOINT } from '../constants/Api';
import { SPLIT_COURSE_CODE_REGEX, splitCourseCode } from '../utils/Misc';

const indexOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.5,
  location: 0,
  distance: 1,
  maxPatternLength: 72,
  minMatchCharLength: 2
};

const courseIndexOptions = {
  ...indexOptions,
  keys: [{
    name: 'code',
    weight: 0.6
  }, {
    name: 'name',
    weight: 0.4
  }]
}

const profIndexOptions = {
  ...indexOptions,
  keys: ['name']
}

const courseCodeIndexOptions = {
  ...indexOptions,
  keys: ['code']
}

class SearchClient {
  constructor() {
    this.courseIndex = new Fuse([], courseIndexOptions);
    this.profIndex = new Fuse([], profIndexOptions);
    this.courseCodeIndex = new Fuse([], courseCodeIndexOptions);
  }

  search(query = '') {
    const splitQuery = query.match(SPLIT_COURSE_CODE_REGEX);
    const parsedQuery = splitQuery === null ? query : splitQuery.join(' ');

    const courseResults = this.courseIndex.search(parsedQuery).slice(0, 4);
    const profResults = this.profIndex.search(parsedQuery).slice(0, 2);
    const courseCodeResults = this.courseCodeIndex.search(parsedQuery).slice(0, 2);

    return {
      courseResults,
      profResults,
      courseCodeResults,
    }
  }

  async buildIndices(searchData) {
    let parsedSearchData;

    // fetch data if not passed in from localstorage
    if (searchData === null) {
      const response = await fetch(`${BACKEND_ENDPOINT}${SEARCH_DATA_ENDPOINT}`);
      parsedSearchData = await response.json();
    } else {
      parsedSearchData = JSON.parse(LZString.decompressFromUTF16(searchData));
    }

    // parse data
    let courseCodeSet = new Set([]);
    const courses = parsedSearchData.courses.map(course => {
      const courseLetters = course.code.match(SPLIT_COURSE_CODE_REGEX)[0];
      courseCodeSet.add(courseLetters);
      return {
        ...course,
        code: splitCourseCode(course.code)
      }
    });
    const profs = parsedSearchData.profs;
    const courseCodes = Array.from(courseCodeSet).map(code => Object({ code: code }));

    // build new indices
    const newCourseIndex = new Fuse(courses, courseIndexOptions);
    const newProfIndex = new Fuse(profs, profIndexOptions);
    const newCourseCodeIndex = new Fuse(courseCodes, courseCodeIndexOptions);

    // swap old indices with new
    this.courseIndex = newCourseIndex;
    this.profIndex = newProfIndex;
    this.courseCodeIndex = newCourseCodeIndex;

    // return compressed raw data for localstorage
    return LZString.compressToUTF16(JSON.stringify(parsedSearchData));
  }
}

export default SearchClient;
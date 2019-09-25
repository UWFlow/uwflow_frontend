import FlexSearch from 'flexsearch';
import LZString from 'lz-string';
import { SEARCH_DATA_ENDPOINT, BACKEND_ENDPOINT } from '../constants/Api';

const COURSE_INDEX_NAME = 'course_index';
const PROF_INDEX_NAME = 'prof_index';
const COURSE_CODE_INDEX_NAME = 'course_code_index';

const SPLIT_COURSE_CODE_REGEX = /[a-z]+|[^a-z]+/gi;

const commonIndexConfig = {
  encode: 'advanced',
  tokenize: 'forward',
  cache: true,
  threshold: 0,
  resolution: 9,
}

const initCourseIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: 'id',
      field: {
        code: {
          tokenize: 'reverse',
          boost: 2
        },
        name: {},
        profs: {}
      }
    }
  });
}

const initProfIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: 'id',
      field: {
        name: {},
        courses: {}
      }
    }
  });
}

const initCourseCodeIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: 'code',
      field: {
        code: {}
      }
    }
  });
}

class SearchClient {
  constructor() {
    console.log("BUILDING!");
    this.courseIndex = initCourseIndex();
    this.profIndex = initProfIndex();
    this.courseCodeIndex = initCourseCodeIndex();
    this.buildIndices();
  }

  search(query = '', bool = 'or', suggest = true, limit = 5) {
    console.log("SEARCHING!");

    const parsedQuery = query === ''
      ? query : query.match(SPLIT_COURSE_CODE_REGEX).join(' ');


    const courseResults = this.courseIndex.search(parsedQuery, {
      field: ['code', 'name', 'profs'],
      bool,
      limit,
    });

    const profResults = this.profIndex.search(parsedQuery, {
      field: ['name', 'courses'],
      bool,
      limit,
    });

    const courseCodeResults = this.courseCodeIndex.search(parsedQuery, {
      field: ['code'],
      bool,
      suggest,
      limit,
    });

    const results = {
      courseResults,
      profResults,
      courseCodeResults,
    }

    return results;
  }

  async buildIndices() {
    localStorage.clear();
    const newCourseIndex = initCourseIndex();
    const newProfIndex = initProfIndex();
    const newCourseCodeIndex = initCourseCodeIndex();

    if (localStorage.getItem(COURSE_INDEX_NAME) === null
        || localStorage.getItem(PROF_INDEX_NAME) === null
        || localStorage.getItem(COURSE_CODE_INDEX_NAME) === null
    ) {
      const response = await fetch(`${BACKEND_ENDPOINT}${SEARCH_DATA_ENDPOINT}`);
      const data = await response.json();

      // build new indices
      let courseCodeSet = new Set([]);
      data.courses.map(course => {
        const splitCourseCode = course.code.match(SPLIT_COURSE_CODE_REGEX);
        const courseLetters = splitCourseCode[0];
        courseCodeSet.add(courseLetters);
      });

      newCourseIndex.add(data.courses);
      newProfIndex.add(data.profs);
      newCourseCodeIndex.add(Array.from(courseCodeSet).map(code => {
        return {
          id: code,
          code: code
        }
      }));

      localStorage.setItem(COURSE_INDEX_NAME, LZString.compressToUTF16(newCourseIndex.export()));
      localStorage.setItem(PROF_INDEX_NAME, LZString.compressToUTF16(newProfIndex.export()));
      localStorage.setItem(COURSE_CODE_INDEX_NAME, LZString.compressToUTF16(newCourseCodeIndex.export()));
    } else {
      newCourseIndex.import(LZString.decompressFromUTF16(localStorage.getItem(COURSE_INDEX_NAME)));
      newProfIndex.import(LZString.decompressFromUTF16(localStorage.getItem(PROF_INDEX_NAME)));
      newCourseCodeIndex.import(LZString.decompressFromUTF16(localStorage.getItem(COURSE_CODE_INDEX_NAME)));
    }

    // swap old indices with new
    this.courseIndex = newCourseIndex;
    this.profIndex = newProfIndex;
    this.courseCodeIndex = newCourseCodeIndex;
  }
}

export default SearchClient;
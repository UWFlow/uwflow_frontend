import FlexSearch from 'flexsearch';
import LZString from 'lz-string';
import { SEARCH_DATA_ENDPOINT, BACKEND_ENDPOINT } from '../constants/Api';
import { SPLIT_COURSE_CODE_REGEX, splitCourseCode } from '../utils/Misc';

const commonIndexConfig = {
  encode: 'advanced',
  tokenize: 'forward',
  cache: true,
  threshold: 0,
  resolution: 9,
}

export const initCourseIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: 'id',
      field: {
        code: {
          boost: 2
        },
        name: {},
        profs: {}
      }
    }
  });
}

export const initProfIndex = () => {
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

export const initCourseCodeIndex = () => {
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
    this.courseIndex = initCourseIndex();
    this.profIndex = initProfIndex();
    this.courseCodeIndex = initCourseCodeIndex();
  }

  search(query = '', bool = 'or') {
    const parsedQuery = query === ''
      ? query : query.match(SPLIT_COURSE_CODE_REGEX).join(' ');

    const courseResults = this.courseIndex.search(parsedQuery, {
      field: ['code', 'name', 'profs'],
      bool,
      limit: 4,
    });

    const profResults = this.profIndex.search(parsedQuery, {
      field: ['name', 'courses'],
      bool,
      limit: 2,
    });

    const courseCodeResults = this.courseCodeIndex.search(parsedQuery, {
      field: ['code'],
      suggest: true,
      limit: 2,
    });

    const results = {
      courseResults,
      profResults,
      courseCodeResults,
    }

    return results;
  }

  async buildIndices(searchData) {
    const newCourseIndex = initCourseIndex();
    const newProfIndex = initProfIndex();
    const newCourseCodeIndex = initCourseCodeIndex();
    let parsedSearchData;

    // fetch data if not passed in from localstorage
    if (searchData === null) {
      const response = await fetch(`${BACKEND_ENDPOINT}${SEARCH_DATA_ENDPOINT}`);
      parsedSearchData = await response.json();
    } else {
      parsedSearchData = JSON.parse(LZString.decompressFromUTF16(searchData));
    }

    // build new indices
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

    newCourseIndex.add(courses);
    newProfIndex.add(profs);
    newCourseCodeIndex.add(Array.from(courseCodeSet).map(code => Object({ id: code, code: code })));

    // swap old indices with new
    this.courseIndex = newCourseIndex;
    this.profIndex = newProfIndex;
    this.courseCodeIndex = newCourseCodeIndex;

    // return compressed raw data for localstorage
    return LZString.compressToUTF16(JSON.stringify(parsedSearchData));
  }
}

export default SearchClient;
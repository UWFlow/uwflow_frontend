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
      limit: 1,
    });

    const results = {
      courseResults,
      profResults,
      courseCodeResults,
    }

    return results;
  }

  async buildIndices(indices) {
    const newCourseIndex = initCourseIndex();
    const newProfIndex = initProfIndex();
    const newCourseCodeIndex = initCourseCodeIndex();

    if (indices.courseIndex === null
        || indices.profIndex === null
        || indices.courseCodeIndex === null
    ) {
      const response = await fetch(`${BACKEND_ENDPOINT}${SEARCH_DATA_ENDPOINT}`);
      const data = await response.json();

      // build new indices
      let courseCodeSet = new Set([]);
      const courses = data.courses.map(course => {
        const courseLetters = course.code.match(SPLIT_COURSE_CODE_REGEX)[0];
        courseCodeSet.add(courseLetters);

        return {
          ...course,
          code: splitCourseCode(course.code)
        }
      });
      const profs = data.profs;

      newCourseIndex.add(courses);
      newProfIndex.add(profs);
      newCourseCodeIndex.add(Array.from(courseCodeSet).map(code => Object({ id: code, code: code })));
    } else {
      newCourseIndex.import(LZString.decompressFromUTF16(indices.courseIndex));
      newProfIndex.import(LZString.decompressFromUTF16(indices.profIndex));
      newCourseCodeIndex.import(LZString.decompressFromUTF16(indices.courseCodeIndex));
    }

    // swap old indices with new
    this.courseIndex = newCourseIndex;
    this.profIndex = newProfIndex;
    this.courseCodeIndex = newCourseCodeIndex;

    return {
      courseIndex: LZString.compressToUTF16(this.courseIndex.export()),
      profIndex: LZString.compressToUTF16(this.profIndex.export()),
      courseCodeIndex: LZString.compressToUTF16(this.courseCodeIndex.export())
    }
  }
}

export default SearchClient;
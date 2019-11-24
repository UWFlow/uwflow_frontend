import MiniSearch from 'minisearch/src/MiniSearch';
import LZString from 'lz-string';
import { SEARCH_DATA_ENDPOINT, BACKEND_ENDPOINT } from '../constants/Api';
import { splitCourseCode } from '../utils/Misc';

const MAX_AUTOCOMPLETE_LENGTH = 50;

const searchOptions = {
  fuzzy: 0,
  prefix: true,
};

const courseIndexOptions = {
  searchOptions: {
    ...searchOptions,
    boost: { code: 100 },
  },
  fields: ['code', 'name', 'profs'],
  storeFields: ['code', 'name', 'profs'],
}

const profIndexOptions = {
  searchOptions: {
    ...searchOptions,
    boost: { name: 100 },
  },
  fields: ['name', 'courses'],
  storeFields: ['code', 'name', 'courses'],
};

const courseCodeIndexOptions = {
  searchOptions,
  fields: ['code'],
  storeFields: ['code'],
};

class SearchClient {
  constructor() {
    this.built = false;
    this.courseIndex = new MiniSearch(courseIndexOptions);
    this.profIndex = new MiniSearch(profIndexOptions);
    this.courseCodeIndex = new MiniSearch(courseCodeIndexOptions);
  }

  autocomplete(query = '') {
    if (query.length === 1) {
      return { courseResults: [], profResults: [], courseCodeResults: [] };
    }

    if (query.length > MAX_AUTOCOMPLETE_LENGTH) {
      query = query.slice(0, MAX_AUTOCOMPLETE_LENGTH);
    }

    const parsedQuery = query
      .split(' ')
      .map(term => splitCourseCode(term))
      .join(' ');

    const courseResults = this.courseIndex.search(parsedQuery).slice(0, 4);
    const profResults = this.profIndex.search(parsedQuery).slice(0, 2);
    const courseCodeResults = this.courseCodeIndex
      .search(parsedQuery)
      .slice(0, 2);

    return {
      courseResults,
      profResults,
      courseCodeResults,
    };
  }

  async buildIndices(searchData) {
    let parsedSearchData;
    const newCourseIndex = new MiniSearch(courseIndexOptions);
    const newProfIndex = new MiniSearch(profIndexOptions);
    const newCourseCodeIndex = new MiniSearch(courseCodeIndexOptions);

    // fetch data if not passed in from localstorage
    if (searchData === null) {
      const response = await fetch(
        `${BACKEND_ENDPOINT}${SEARCH_DATA_ENDPOINT}`,
      );
      parsedSearchData = await response.json();
    } else {
      parsedSearchData = JSON.parse(LZString.decompressFromUTF16(searchData));
    }

    // parse data
    let courseCodeSet = new Set([]);

    const courses = parsedSearchData.courses.map(course => {
      const courseLetters = splitCourseCode(course.code).split(' ')[0];
      courseCodeSet.add(courseLetters);
      return {
        ...course,
        code: splitCourseCode(course.code),
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

    const courseCodes = Array.from(courseCodeSet).map((code, idx) =>
      Object({ id: idx, code }),
    );

    // build new indices
    newCourseIndex.addAll(courses);
    newProfIndex.addAll(profs);
    newCourseCodeIndex.addAll(courseCodes);

    // swap old indices with new
    this.courseIndex = newCourseIndex;
    this.profIndex = newProfIndex;
    this.courseCodeIndex = newCourseCodeIndex;
    this.built = true;

    // return compressed raw data for localstorage
    return LZString.compressToUTF16(JSON.stringify(parsedSearchData));
  }
}

export default SearchClient;

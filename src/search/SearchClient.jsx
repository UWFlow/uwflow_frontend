import FlexSearch from 'flexsearch';
import { GET_SEARCH_INDEX_DATA } from '../graphql/queries/search/SearchIndex';

const commonIndexConfig = {
  encode: "advanced",
  tokenize: "forward",
  cache: true,
  threshold: 0,
  resolution: 9,
}

const COURSE_INDEX_NAME = 'course_index';
const PROF_INDEX_NAME = 'prof_index';
const COURSE_CODE_INDEX_NAME = 'course_code_index';

const initCourseIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: "id",
      field: [
        "code",
        "name",
        "profs_teaching"
      ]
    }
  });
}

const initProfIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: "id",
      field: [
        "name",
        "prof_courses"
      ]
    }
  });
}

const initCourseCodeIndex = () => {
  return new FlexSearch({
    ...commonIndexConfig,
    doc: {
      id: "code",
      field: ["code"]
    }
  });
}

let courseIndex = null;
let profIndex = null;
let courseCodeIndex = null;

class SearchClient {
  constructor(apolloClient) {
    this.buildIndices(apolloClient);
  }

  search = (query, suggest = true) => {
    const courseResults = courseIndex && courseIndex.search(query, {
      field: ["code", "name", "profs_teaching"],
      bool: "or",
      suggest
    });
    const profResults = profIndex && profIndex.search(query, {
      field: ["name", "prof_courses"],
      bool: "or",
      suggest
    });
    const courseCodeResults = courseCodeIndex && courseCodeIndex.search(query, {
      field: ["code"],
      suggest
    });

    const results = {
      courseResults,
      profResults,
      courseCodeResults,
    }

    return results;
  }

  buildIndices = async (apolloClient) => {
    console.time('build');
    const newCourseIndex = initCourseIndex();
    const newProfIndex = initProfIndex();
    const newCourseCodeIndex = initCourseCodeIndex();

    if (localStorage.getItem(COURSE_INDEX_NAME) === null
        || localStorage.getItem(PROF_INDEX_NAME) === null
        || localStorage.getItem(COURSE_CODE_INDEX_NAME) === null
    ) {
      const { data } = await apolloClient.query({ query: GET_SEARCH_INDEX_DATA});

      // build new indices
      let courseCodeSet = new Set([]);

      newCourseIndex.add(data.course.map(course => {
        courseCodeSet.add(course.code);
        return {
          ...course,
          profs_teaching: course.profs_teaching.map(prof => prof.name)
        }
      }));
    
      newProfIndex.add(data.prof.map(prof => {
        return {
          ...prof,
          prof_courses: prof.prof_courses.map(course => course.code)
        }
      }));

      newCourseCodeIndex.add(Array.from(courseCodeSet).map(code => {
        return {
          id: code,
          code: code
        }
      }));

      localStorage.setItem(COURSE_INDEX_NAME, newCourseIndex.export());
      localStorage.setItem(PROF_INDEX_NAME, newProfIndex.export());
      localStorage.setItem(COURSE_CODE_INDEX_NAME, newCourseCodeIndex.export());
    } else {
      newCourseIndex.import(localStorage.getItem(COURSE_INDEX_NAME));
      newProfIndex.import(localStorage.getItem(PROF_INDEX_NAME));
      newCourseCodeIndex.import(localStorage.getItem(COURSE_CODE_INDEX_NAME));
    }

    // swap old indices with new
    courseIndex = newCourseIndex;
    profIndex = newProfIndex;
    courseCodeIndex = newCourseCodeIndex;
    console.timeEnd('build');
  }
}

export default SearchClient;
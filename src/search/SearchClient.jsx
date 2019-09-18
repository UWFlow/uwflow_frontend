import FlexSearch from 'flexsearch';
import { GET_SEARCH_INDEX_DATA } from '../graphql/queries/search/SearchIndex';

const commonIndexConfig = {
  encode: "advanced",
  tokenize: "reverse",
  cache: true,
  threshold: 0,
  resolution: 9,
  depth: 3,
  cache: true,
}

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

let courseIndex = initCourseIndex();
let profIndex = initProfIndex();
let courseCodeIndex = initCourseCodeIndex();

class SearchClient {
  autocompleteSearch = () => {}

  executeSearch = () => {}

  buildIndices = async (apolloClient) => {
    console.time('fetch');
    const { data } = await apolloClient.query({ query: GET_SEARCH_INDEX_DATA});
    console.log(data);
    console.timeEnd('fetch');

    console.time('build');
    const newCourseIndex = initCourseIndex();
    const newProfIndex = initProfIndex();
    const newCourseCodeIndex = initCourseCodeIndex();

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
    }))

    // swap old indices with new
    courseIndex = newCourseIndex;
    profIndex = newProfIndex;
    courseCodeIndex = newCourseCodeIndex;
    console.timeEnd('build');

    console.log(courseCodeIndex.export());
  }
}

export default SearchClient;
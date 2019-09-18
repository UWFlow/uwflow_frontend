import FlexSearch from 'flexsearch';
import { GET_SEARCH_INDEX_DATA } from '../graphql/queries/search/SearchIndex';

const indexConfig = {
  encode: "advanced",
  tokenize: "reverse",
  cache: true,
  threshold: 0,
  resolution: 9,
  depth: 3,
  cache: true,
}

let courseIndex = new FlexSearch(indexConfig);
let profIndex = new FlexSearch(indexConfig);
let courseCodeIndex = new FlexSearch(indexConfig);

class SearchClient {
  autocompleteSearch = () => {}

  executeSearch = () => {}

  buildIndices = async (apolloClient) => {
    console.time('fetch');
    const data = await apolloClient.query({ query: GET_SEARCH_INDEX_DATA});
    console.log(data);
    console.timeEnd('fetch');

    console.time('build');
    const newCourseIndex = new FlexSearch(indexConfig);
    const newProfIndex = new FlexSearch(indexConfig);
    const newCourseCodeIndex = new FlexSearch(indexConfig);


    courseIndex = newCourseIndex;
    profIndex = newProfIndex;
    courseCodeIndex = newCourseCodeIndex;
    console.timeEnd('build');
  }
}

export default SearchClient;
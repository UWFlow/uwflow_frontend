import FlexSearch from 'flexsearch';

const indexConfig = {
  encode: "advanced",
  tokenize: "forward",
  cache: true,
  threshold: 0,
  resolution: 9,
  depth: 3
}

const courseIndex = new FlexSearch(indexConfig);
const profIndex = new FlexSearch(indexConfig);

class SearchClient {
  autocompleteSearch = () => {}

  executeSearch = () => {}

  buildIndices = async () => {

  }
}

export default SearchClient;
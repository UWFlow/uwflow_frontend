import SearchClient from './SearchClient.js';

const client = new SearchClient();

// eslint-disable-next-line no-restricted-globals
self.onmessage = async event => {
  const { type } = event.data;
  switch (type) {
    case 'autocomplete':
      const query = event.data.query;
      const results = client.autocomplete(query);
      postMessage({ type: 'autocomplete', results });
      break;
    case 'build':
      const [searchData, lastIndexedDate] = await client.buildIndices(
        event.data.searchData,
        event.data.lastIndexedDate,
      );
      postMessage({ type: 'data', searchData, lastIndexedDate });
      break;
    default:
      break;
  }
};

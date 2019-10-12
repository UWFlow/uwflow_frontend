import SearchClient from './SearchClient.js';

const client = new SearchClient();

self.onmessage = async event => {
    const { type } = event.data;
    let query, results = null;
    switch(type) {
        case 'code_search':
            query = event.data.query;
            results = client.codeSearch(query);
            postMessage({ type: 'code_search', results });
            break;
        case 'search':
            query = event.data.query;
            results = client.search(query);
            postMessage({ type: 'search', results });
            break;
        case 'autocomplete':
            query = event.data.query;
            results = client.autocomplete(query);
            postMessage({ type: 'autocomplete', results });
            break;
        case 'build':
            const searchData = await client.buildIndices(event.data.searchData);
            postMessage({ type: 'data', searchData })
            break;
        default:
            break;
    }
};

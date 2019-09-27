import SearchClient from './SearchClient.js';

const client = new SearchClient();

self.onmessage = async event => {
    const { type } = event.data;
    switch(type) {
        case 'search':
            const { query } = event.data;
            const results = client.search(query);
            postMessage({ type: 'search', results });
            break;
        case 'build':
            const searchData = await client.buildIndices(event.data.searchData);
            postMessage({ type: 'data', searchData })
            break;
        default:
            break;
    }
};

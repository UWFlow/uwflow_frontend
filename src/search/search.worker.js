import SearchClient from './SearchClient.js';

const client = new SearchClient();

self.onmessage = async event => {
    const { type } = event.data;
    switch(type) {
        case 'autocomplete':
            const { query } = event.data;
            const results = client.autocomplete(query);
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

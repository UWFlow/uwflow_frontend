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
            const indices = await client.buildIndices(event.data.indices);
            postMessage({ type: 'indices', indices })
            break;
        default:
            break;
    }
};

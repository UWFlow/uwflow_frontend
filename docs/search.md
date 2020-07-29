# Search

## Search data indexing

The client side search works by indexing raw course and professor data from the backend into local storage. This process is performed by a background web worker in `search.worker.ts` so that this doesn't block rendering. On page load, if the raw search data already exists in local storage, then we load it into memory as an index to perform searches on. However, if the existing data is more than 12 hours old or doesn't exist, then we fetch it directly from the backend.

## Performing searches

The `SearchProvider` class provides the search worker to nested components so that they can call search functions directly. The search worker can be accessed with the `useSearchContext` hook. The `SearchBar` component implements autocomplete functionality using the worker.

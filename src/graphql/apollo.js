import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import { GRAPHQL_ENDPOINT } from '../constants/Api';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});  

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      // TODO network error
      return null;
    });
  }
  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT
});

const link = ApolloLink.from([
  authLink,
  errorLink,
  httpLink // terminating link must be added last
]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;

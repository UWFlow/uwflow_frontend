import { BACKEND_ENDPOINT, AUTH_DICT } from '../constants/Api';

export const queryBackend = query => {
  return fetch(BACKEND_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      query,
    }),
    headers: {
      'Content-type': 'application/json',
      ...AUTH_DICT,
    },
  })
    .then(resp => {
      return resp.json();
    })
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export const externalCall = (endpoint, data) =>
  fetch({
    method: 'post',
    url: endpoint,
    data: JSON.stringify(data),
  });

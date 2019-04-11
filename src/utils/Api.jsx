import qs from 'qs';
import { forEach } from 'lodash';

export const post = (endpoint, data) => {
  return fetch(endpoint, {
    method: 'POST',
    body: qs.stringify(data, { arrayFormat: 'brackets' }),
  });
};

export const get = endpoint => {
  return fetch(endpoint, {
    method: 'GET',
  });
};

const call = (endpoint, data = {}) => {
  // Delete null values from api parameters
  forEach(data, (value, key) => {
    if (value === null) {
      delete data[key];
    }
  });

  return get(endpoint, data)
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

export default call;

export const externalCall = (endpoint, data) =>
  fetch({
    method: 'post',
    url: endpoint,
    data: JSON.stringify(data),
  });

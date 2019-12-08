// makes POST request to endpoint
// returns response body and status as array
export const makePOSTRequest = async (endpoint, data, options = {}) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: options.accept ? options.accept : 'application/json',
      ...options,
    },
    body: data,
  });
  const text = await res.text();
  const status = await res.status;
  let respJSON;
  try {
    respJSON = JSON.parse(text);
  } catch (err) {
    respJSON = {};
  }
  return [respJSON, status];
};

export const makeAuthenticatedPOSTRequest = async (
  endpoint,
  data,
  options = {},
) => {
  return makePOSTRequest(endpoint, data, {
    ...options,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
};

export const sendFile = async (endpoint, data) => {
  return makePOSTRequest(endpoint, data, {});
};

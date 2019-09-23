// makes POST request to endpoint
// returns response body and status as array
export const makePOSTRequest = async (endpoint, data, options = {}) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return [await res.json(), await res.status];
};

export const sendFile = async (endpoint, data) => {
  return makePOSTRequest(endpoint, data, {});
};

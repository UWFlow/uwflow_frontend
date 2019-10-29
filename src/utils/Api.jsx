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
  const text = await res.text();
  const status = await res.status;
  var respJSON;
  try {
    respJSON = JSON.parse(text);
  } catch (err) {
    respJSON = {};
  }
  return [respJSON, status];
};

export const sendFile = async (endpoint, data) => {
  return makePOSTRequest(endpoint, data, {});
};

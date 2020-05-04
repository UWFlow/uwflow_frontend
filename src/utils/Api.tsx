interface POSTRequestFlags {
  noStringify?: boolean;
}

// makes POST request to endpoint
// returns response body and status as array
export const makePOSTRequest = async (
  endpoint: string,
  data: any,
  options: Record<string, string> = {},
  flags: POSTRequestFlags = {},
): Promise<[JSON, number]> => {
  const processedData = flags.noStringify ? data : JSON.stringify(data);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: options.accept ? options.accept : 'application/json',
      ...options,
    },
    body: processedData,
  });
  const text = await res.text();
  const status = await res.status;
  let respJSON: JSON;
  try {
    respJSON = JSON.parse(text);
  } catch (err) {
    respJSON = JSON.parse('{}');
  }
  return [respJSON, status];
};

export const makeAuthenticatedPOSTRequest = async (
  endpoint: string,
  data: any,
  options: Record<string, string>,
  flags: POSTRequestFlags,
): Promise<[JSON, number]> => {
  return makePOSTRequest(
    endpoint,
    data,
    {
      ...options,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    flags,
  );
};

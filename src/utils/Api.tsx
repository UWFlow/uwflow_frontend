interface POSTRequestFlags {
  noStringify?: boolean;
}

/*
 * Makes POST request to endpoint and
 * returns the response body and status
 */
// TODO add a return type
export const makePOSTRequest = async (
  endpoint: string,
  data: any,
  options: Record<string, string> = {},
  flags: POSTRequestFlags = {},
): Promise<[any, number]> => {
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
  options: Record<string, string> = {},
  flags: POSTRequestFlags = { noStringify: false },
): Promise<[any, number]> => {
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

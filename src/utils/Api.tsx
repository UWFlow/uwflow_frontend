const makeRequest = async <T extends object>(
  endpoint: string,
  options: Record<string, string> = {},
  method: string,
  body?: { body: any },
): Promise<[T, number]> => {
  const res = await fetch(endpoint, {
    method,
    headers: {
      Accept: options.accept ? options.accept : 'application/json',
      ...options,
    },
    ...body,
  });

  // Return empty object if response body is empty
  const json = await res.json().catch(() => [{}, res.status]);
  const { status } = res;
  return [json, status];
};

/*
 * Makes POST request to endpoint, returns the response body and status
 */
export const makePOSTRequest = async <R, T extends object>(
  endpoint: string,
  data: R,
  options: Record<string, string> = {},
): Promise<[T, number]> => {
  const body = data instanceof FormData ? data : JSON.stringify(data);
  return makeRequest(endpoint, options, 'POST', { body });
};

/*
 * Make POST request with authorization header
 */
export const makeAuthenticatedPOSTRequest = async <R, T extends object>(
  endpoint: string,
  data: R,
  options: Record<string, string> = {},
): Promise<[T, number]> => {
  return makePOSTRequest(endpoint, data, {
    ...options,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
};

/*
 * Make GET request
 */
export const makeGETRequest = async <T extends object>(
  endpoint: string,
  options: Record<string, string> = {},
): Promise<[T, number]> => {
  return makeRequest(endpoint, options, 'GET');
};

/*
 * Makes POST request to endpoint, returns the response body and status
 */
export const makePOSTRequest = async <R, T>(
  endpoint: string,
  data: R,
  options: Record<string, string> = {},
): Promise<[T, number]> => {
  const processedData = data instanceof FormData ? data : JSON.stringify(data);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: options.accept ? options.accept : 'application/json',
      ...options,
    },
    body: processedData,
  });

  // Return empty object if response body is empty
  const json = await res.json().catch(() => [{}, res.status]);
  const { status } = res;
  return [json, status];
};

export const makeAuthenticatedPOSTRequest = async <R, T>(
  endpoint: string,
  data: R,
  options: Record<string, string> = {},
): Promise<[T, number]> => {
  return makePOSTRequest(endpoint, data, {
    ...options,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
};

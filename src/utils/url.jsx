const getParameterFromURL = (
  prefix: string,
  name: string,
  location: LocationType,
): ?string => {
  const regex = new RegExp(`[\\${prefix}&]${name}=([^&#]*)`);
  const result = regex.exec(
    `${location.pathname}${location.search}${location.hash}`,
  );
  // Hard code here to poly-fill the difference between java URLEncoder and JS decodeURI
  // java URLEncoder will replce space with plus, just manually replace it back to space
  return result
    ? decodeURIComponent(replace(result[1], new RegExp('\\+', 'g'), ' '))
    : null;
};
/* Get a URL parameter from the URL hash */
export const getHashParameter = (name, location): ?string =>
  getParameterFromURL('#', name, location);

export const getUrlParameter = (name, location): ?string =>
  getParameterFromURL('?', name, location);

export const removeUrlParameter = (name: string, history: HistoryType) => {
  const search = history.location.search
    .slice(1)
    .split('&')
    .filter(param => param.split('=')[0] !== name)
    .join('&');

  history.replace({ ...history.location, search });
};

export const addUrlParameter = (
  name: string,
  value: string,
  history: HistoryType,
) => {
  const search = `${history.location.search
    .slice(1)
    .split('&')
    .filter(param => param.split('=')[0] !== name)
    .join('&')}&${name}=${value}`;

  history.replace({ ...history.location, search });
};

export const externalCall = (endpoint, data) =>
  fetch({
    method: 'post',
    url: endpoint,
    data: JSON.stringify(data),
  });

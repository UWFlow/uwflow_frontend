export default () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.addEventListener('message', _ => {
    postMessage('');
  });
};

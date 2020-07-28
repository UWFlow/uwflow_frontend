module.exports = function override(config, _) {
  config.output.globalObject = 'this';
  return config;
};

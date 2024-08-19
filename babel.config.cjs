module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["@babel/preset-env", "@babel/react"],
    plugins: ["@babel/plugin-transform-runtime"],
    compact: false,
    sourceType: "unambiguous",
  };
};

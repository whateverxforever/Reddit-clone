module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: ["error", "single", "double"],
  },
};

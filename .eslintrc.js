module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // indent: ['warn', 2],
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: 'off',
    semi: ['error', 'always'],
    'no-console': 'off'
  }
};

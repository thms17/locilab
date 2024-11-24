module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-extra-semi': 'off',
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': 'off',
  },
}

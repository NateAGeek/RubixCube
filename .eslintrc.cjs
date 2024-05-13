module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': ['plugin:react/recommended', 'google', 'plugin:storybook/recommended'],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': ['react', '@typescript-eslint', 'prettier'],
  'rules': {
    'max-len': [1, 128, 2],
    'indent': ['error', 2],
    'no-unused-vars': 'warn',
    'require-jsdoc': 'warn',
    'camelcase': 'off',
  },
};

module.exports = {
  root: true,
  // extends: ['plugin:react/jsx-runtime', '@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react/react-in-jsx-scope': 'off',
        'eol-last': ['error', 'never'],
      },
    },
  ],
};

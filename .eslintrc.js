module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'detox'],
  overrides: [
    {
      files: ['*.e2e.js'],
      env: {
        'detox/detox': true,
        jest: true,
        'jest/globals': true,
      },
    },
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['SafeAreaView'],
            message:
              'Import SafeAreaView from react-native-safe-area-context instead',
          },
          {
            name: 'react-navigation',
            importNames: ['SafeAreaView'],
            message:
              'Import SafeAreaView from react-native-safe-area-context instead',
          },
          {
            name: '@react-navigation/core',
            importNames: ['useNavigation'],
            message: 'Import useNavigation from @react-navigation/native',
          },
        ],
      },
    ],
    'spaced-comment': ['warn', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: '*', prev: 'multiline-const' },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};

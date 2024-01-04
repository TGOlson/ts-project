/* eslint-env node */
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    // Haven't tried this one before. Seems good, but disable if it's too strict.
    'plugin:@typescript-eslint/stylistic',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ["dist/**/*"],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    // Used on previous projects. Don't need these rules, but some may be preventing bugs?
    // 'semi': 'off',
    // '@typescript-eslint/non-nullable-type-assertion-style': 'off',
  },
};

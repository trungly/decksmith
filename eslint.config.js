import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
  },
  // Svelte 5 rune files (.svelte.ts) need the TypeScript parser explicitly
  {
    files: ['**/*.svelte.ts'],
    languageOptions: {
      parser: ts.parser,
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/valid-compile': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.svelte-kit/**'],
  },
];

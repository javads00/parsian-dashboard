// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const eslintConfig = [// ⛔️ Ignore paths
{
  ignores: [
    '**/node_modules/',
    '**/build/',
    '**/dist/',
    '**/out/',
    '**/package-lock.json',
    '**/pnpm-lock.yaml',
    '**/yarn.lock',
    '**/bun.lockb',
    '**/*.min.*',
    'tailwind.config.ts',
    '**/public/',
    '**vite.config.ts',
    'src/lib/typescript/types/database.types.ts',
    'src/lib/typescript/types/supabase.type.ts',
  ],
}, // ✅ Base ESLint + Prettier
...compat.extends('eslint:recommended', 'prettier'), // ✅ General rules
{
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    prettier,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    // 'no-console': 'warn',
    'no-alert': 'warn',
    'no-empty': 'warn',
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    // React-specific rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}, // ✅ TypeScript-specific rules
...compat.extends('plugin:@typescript-eslint/recommended', 'prettier').map((config) => ({
  ...config,
  files: ['**/*.ts?(x)'],
})), {
  files: ['.storybook/**/*.ts?(x)'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {},
  },
}, {
  files: ['**/*.ts?(x)'],
  ignores: ['.storybook/**/*'],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      project: ['./tsconfig.app.json'],
    },
  },
  plugins: {
    prettier,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
      },
    ],
    '@typescript-eslint/no-explicit-any': [
      'off',
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
}, ...storybook.configs["flat/recommended"]]

export default eslintConfig

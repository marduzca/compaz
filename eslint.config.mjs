import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ['**/build/']
}, ...fixupConfigRules(compat.extends(
  'plugin:react/recommended',
  'airbnb',
  'prettier',
  'eslint-config-prettier',
  'plugin:@typescript-eslint/recommended',
  'plugin:react-hooks/recommended',
  'plugin:jsx-a11y/recommended',
  'plugin:import/warnings',
  'plugin:storybook/recommended'
)).map(config => ({
  ...config,
  files: ['**/*.ts', '**/*.tsx']
})), {
  files: ['**/*.ts', '**/*.tsx'],

  plugins: {
    react: fixupPluginRules(react),
    '@typescript-eslint': fixupPluginRules(typescriptEslint),
    'jest-dom': jestDom,
    'testing-library': testingLibrary,
    prettier
  },

  languageOptions: {
    globals: {
      ...globals.browser
    },

    parser: tsParser,
    ecmaVersion: 12,
    sourceType: 'module',

    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },

  settings: {
    react: {
      version: 'detect'
    },

    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },

  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'src/app/**/*.spec.{ts,tsx}',
        'src/test/setupTests.ts',
        '**/*.stories.tsx',
        'cypress.config.ts'
      ]
    }],

    'prettier/prettier': ['warn', {
      singleQuote: true,
      semi: true
    }],

    'react/jsx-filename-extension': [2, {
      extensions: ['.js', ',.jsx', ',.ts', '.tsx']
    }],

    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
      tsx: 'never'
    }],

    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-shadow': 'off',
    'jsx-a11y/no-autofocus': 'off',

    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],

    'react/jsx-no-useless-fragment': ['error', {
      allowExpressions: true
    }],

    'react/jsx-no-constructed-context-values': 'off',

    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['label'],
      labelAttributes: ['htmlFor']
    }],

    'jsx-a11y/role-supports-aria-props': 'off',

    'react/no-unknown-property': ['error', {
      ignore: ['inert']
    }],

    'import/no-unresolved': ['error', {
      ignore: ['\\.svg\\?react$', '^storybook/.*$']
    }],

    'react/require-default-props': 'off',

    'storybook/use-storybook-expect': 'off',
    'storybook/prefer-pascal-case': 'off',
    'storybook/default-exports': 'off',
    'storybook/use-storybook-testing-library': 'off',
    'storybook/story-exports': 'off'
  }
}, {
  files: ['**/*Provider.tsx'],

  rules: {
    '@typescript-eslint/no-empty-function': 'off'
  }
}, {
  files: ['**/*.spec.ts*'],

  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}, {
  files: ['cypress/**/*.cy.ts'],

  rules: {
    'jest/expect-expect': 'off'
  }
}, {
  // New override for Storybook-specific rules
  files: ['src/**/*.stories.{ts,tsx}'],

  rules: {
    'storybook/use-storybook-expect': 'error',
    'storybook/prefer-pascal-case': 'error',
    'storybook/default-exports': 'error',
    'storybook/use-storybook-testing-library': 'error',
    'storybook/story-exports': 'error'
  }
}];

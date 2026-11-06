import reactX from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import importPlugin from 'eslint-plugin-import-x';
import storybook from 'eslint-plugin-storybook';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

const tsFiles = ['**/*.ts', '**/*.tsx'];
const scoped = (configs) =>
  [configs].flat().map((config) => ({ ...config, files: tsFiles }));

export default [
  {
    ignores: ['**/build/', '**/storybook-static/']
  },
  ...scoped([
    js.configs.recommended,
    reactX.configs['recommended-typescript'],
    jsxA11y.configs.recommended,
    reactHooks.configs.flat.recommended,
    importPlugin.flatConfigs.warnings,
    ...typescriptEslint.configs['flat/recommended'],
    ...storybook.configs['flat/recommended'],
    eslintConfigPrettier
  ]),
  {
    files: tsFiles,

    plugins: {
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

      'import-x/resolver': {
        typescript: true,
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },

  rules: {
    'import-x/no-extraneous-dependencies': ['error', {
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

    'import-x/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
      tsx: 'never'
    }],

    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jsx-a11y-x/click-events-have-key-events': 'off',
    'jsx-a11y-x/no-noninteractive-tabindex': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-shadow': 'off',
    'jsx-a11y-x/no-autofocus': 'off',

    '@eslint-react/jsx-no-useless-fragment': ['error', {
      allowExpressions: true
    }],

    '@eslint-react/no-unstable-context-value': 'off',
    '@eslint-react/exhaustive-deps': 'off',
    '@eslint-react/purity': 'off',

    'jsx-a11y-x/label-has-associated-control': [2, {
      labelComponents: ['label'],
      labelAttributes: ['htmlFor']
    }],

    'jsx-a11y-x/role-supports-aria-props': 'off',

    '@eslint-react/dom-no-unknown-property': ['error', {
      ignore: ['inert']
    }],

    'import-x/no-unresolved': ['error', {
      ignore: ['\\.svg\\?react$', '^storybook/.*$']
    }],

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

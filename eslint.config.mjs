import withNuxt from './.nuxt/eslint.config.mjs'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default withNuxt(
  {
    ignores: ['dist', '.nuxt', '.output', 'node_modules', '*.d.ts', 'wrangler.jsonc'],
  },
  ...vue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'warn',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  }
)

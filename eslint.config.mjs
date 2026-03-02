import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default withNuxt(
  // Ignores
  {
    ignores: ['dist', '.nuxt', '.output', 'node_modules', '*.d.ts'],
  },

  // Prettier compat (must come before custom rules to allow overrides)
  prettier,

  // TypeScript parser for standalone .ts files (Nuxt handles .vue internally)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
    },
  }
)
  // Set TS parser for <script lang="ts"> in .vue files
  .override('nuxt/vue/setup', {
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  })
  // Override Nuxt's Vue rules
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'warn',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/define-macros-order': [
        'warn',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        },
      ],
      'vue/no-unused-refs': 'warn',
      'vue/no-useless-v-bind': 'warn',
      'vue/prefer-true-attribute-shorthand': 'warn',
    },
  })
  // TypeScript + general rules (plugin must be in same config object as rules)
  .append({
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
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
  })

import js from '@eslint/js'
import globals from 'globals'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

const { flatConfig: nextFlatConfig } = nextPlugin

export default defineConfig([
  {
    ignores: ['dist/**', '.next/**', 'next-env.d.ts'],
  },
  nextFlatConfig.recommended,
  nextFlatConfig.coreWebVitals,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

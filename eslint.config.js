import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Ignora archivos
    {
      ignores: ['dist', 'node_modules']
    },

    // Configuración base
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2020,
        },
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        // Reglas de React recomendadas
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,

        // Tus reglas personalizadas
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-fallthrough': 'error',

        // Regla de react-refresh
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],

        // Desactiva la regla de react-in-jsx-scope (no necesaria en React 17+)
        'react/react-in-jsx-scope': 'off',
      },
    }
);

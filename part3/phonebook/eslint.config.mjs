import globals from "globals";
import pluginReact from "eslint-plugin-react";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  {
    ignores: ["node_modules/", "dist/", "build/", "temp/"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },

  pluginReact.configs.flat.recommended,

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
      'no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_'
        }
      ]
    }
  }
];

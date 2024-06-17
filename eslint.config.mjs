import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import { fixupPluginRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import promise from "eslint-plugin-promise";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  // react recommended,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
  },

  {
    plugins: {
      "react-hooks": fixupPluginRules(eslintPluginReactHooks),
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },

  {
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },

  {
    plugins: {
      promise,
    },
  },
];

import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: { type: {}, value: {} },
          environment: 'node',
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          ignoreCase: true,
          internalPattern: ['^~/.+'],
          maxLineLength: undefined,
          newlinesBetween: 'always',
          order: 'desc',
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: 'keep',
          type: 'line-length',
        },
      ],
      "perfectionist/sort-interfaces": ["error"],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: {},
          groups: [],
          ignoreCase: true,
          ignorePattern: [],
          order: 'desc',
          specialCharacters: 'keep',
          type: 'line-length',
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          type: "alphabetical",
        },
      ],
    },
    settings: {
      perfectionist: {
        partitionByComment: true,
        type: "recommended-line-length",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

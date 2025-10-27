const tsPlugin = require("@typescript-eslint/eslint-plugin")
const parser = require("@typescript-eslint/parser")
const prettierConfig = require("eslint-config-prettier")
const globals = require("globals")

module.exports = [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: [".eslintrc.js"],
  },
  {
    // Define environment directly without linterOptions
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
]

module.exports = {
    "root": true,
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "standard-with-typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2021,
      "sourceType": "module",
      "project": ["tsconfig.json"],
      "tsconfigRootDir": "./"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "@typescript-eslint/semi": ["error", "always"],
      "linebreak-style": ["error", "unix"],
      "prefer-const": "error",
      "@typescript-eslint/quotes": ["error", "double"],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "@typescript-eslint/space-before-function-paren": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "no-unused-vars": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "no-public",
          "overrides": {
            "parameterProperties": "explicit"
          }
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "format": ["PascalCase", "camelCase"],
          "selector": "default",
          "filter": {
            "regex": "^(Accept-Language|Content-Type)$",
            "match": false
          }
        },
        {
          "format": ["camelCase", "PascalCase"],
          "leadingUnderscore": "forbid",
          "selector": "variable"
        },
        {
          "format": ["camelCase"],
          "leadingUnderscore": "allow",
          "selector": "parameter"
        },
        {
          "format": ["PascalCase"],
          "selector": "typeLike"
        },
        {
          "selector": "function",
          "format": ["PascalCase", "camelCase"]
        },
        {
          "format": ["PascalCase"],
          "prefix": ["T", "K"],
          "selector": "typeParameter"
        },
        {
          "format": ["UPPER_CASE"],
          "selector": "enumMember"
        }
      ],
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "block-spacing": ["error", "always"],
      "complexity": [
        "error",
        {
          "max": 10
        }
      ],
      "curly": ["error", "all"],
      "max-depth": ["error", 2],
      "max-lines": ["error", 100],
      "max-lines-per-function": [
        "error",
        {
          "max": 35,
          "skipBlankLines": true,
          "skipComments": true
        }
      ],
      "max-nested-callbacks": ["error", 2],
      "max-params": ["error", 3],
      "max-statements-per-line": [
        "error",
        {
          "max": 2
        }
      ],
      "no-else-return": "error",
      "no-magic-numbers": [
        "error",
        {
          "detectObjects": false,
          "enforceConst": true,
          "ignore": [-1, 0, 1, 2, 10, 100],
          "ignoreArrayIndexes": true
        }
      ],
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 1
        }
      ],
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "one-var-declaration-per-line": ["error", "always"],
      "operator-assignment": ["error", "always"],
      "react/prop-types": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "multiline-ternary": "off",
      "@typescript-eslint/strict-boolean-expressions": "off"
    },
    "ignorePatterns": [
      "node_modules/**",
      "dist/**",
      "logs/**",
      ".trunk/**",
      "swagger-output.json"
    ]
  };
  
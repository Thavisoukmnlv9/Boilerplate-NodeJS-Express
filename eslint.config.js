const tseslint = require('typescript-eslint');
const path = require('path');

module.exports = [
  {
    files: ['src/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/logs/**',
      '**/.trunk/**',
      '**/swagger-output.json'
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    
    rules: {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      
      'max-lines-per-function': [
        'error',
        {
          'max': 35,
          'skipBlankLines': true,
          'skipComments': true
        }
      ],
      'max-depth': ['error', 2],
      'max-lines': ['error', 100],
      
    }
  }
];


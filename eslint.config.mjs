import prettier from 'eslint-plugin-prettier';
import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        languageOptions: {
            globals: globals.node,
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json']
            }
        }
    },
    pluginJs.configs.recommended,
    {
        ignores: ['./gen/*.{js,ts}'],
        files: ['**/*.{mjs,js,ts}'],
        plugins: {
            '@typescript-eslint': tseslint,
            prettier
        },
        
        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    tabWidth: 4,
                    trailingComma: 'none',
                    bracketSpacing: true,
                    printWidth: 120
                }
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^ignore',
                    ignoreRestSiblings: true
                }
            ],
            'no-unused-vars': 'off',
            'eol-last': 'error',
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1
                }
            ],
            'max-len': ['error', 120],
            'max-lines-per-function': ['error', 30],
            'object-curly-spacing': ['error', 'always'],
            quotes: ['error', 'single'],
            'quote-props': ['error', 'as-needed'],
            semi: ['error', 'always'],
            'sort-imports': 'off'
        }
    }
]

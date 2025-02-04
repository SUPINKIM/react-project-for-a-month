import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigImport from 'eslint-plugin-import';

export default [
  {
    files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['.config/', 'dist/', 'tsconfig.json'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            ['index', 'sibling'],
            'object',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    plugins: {
      import: eslintConfigImport,
    },
  },
  eslintConfigPrettier,
];

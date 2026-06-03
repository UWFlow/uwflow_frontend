module.exports = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'secretinprod',
        },
      },
    },
  ],
  documents: ['./src/**/*.tsx', './src/**/*.ts'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        // Emit a single `import * as Apollo from '@apollo/client'` instead of
        // the legacy split `@apollo/react-common` / `@apollo/react-hooks` imports.
        reactApolloVersion: 3,
        // Import `gql` from `@apollo/client` (which re-exports it) so we don't
        // depend on the separate `graphql-tag` package.
        gqlImport: '@apollo/client#gql',
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

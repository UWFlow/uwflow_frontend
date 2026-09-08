import { ApolloError } from '@apollo/client';

import { GraphQLError } from 'graphql';

import { getCreateGroupErrorMessage } from './errors';

describe('group creation errors', () => {
  it('explains that the owner must choose a different group name', () => {
    const error = new ApolloError({
      graphQLErrors: [
        new GraphQLError(
          'Uniqueness violation. duplicate key value violates unique constraint "shared_group_created_by_name_key"',
          { extensions: { code: 'constraint-violation' } },
        ),
      ],
    });

    expect(getCreateGroupErrorMessage(error)).toBe(
      'You already have a group with this name. Please choose a different name.',
    );
  });

  it('does not describe other constraint failures as duplicate names', () => {
    const error = new ApolloError({
      graphQLErrors: [
        new GraphQLError('A user cannot own more than 10 shared groups', {
          extensions: { code: 'constraint-violation' },
        }),
      ],
    });

    expect(getCreateGroupErrorMessage(error)).toBe(
      'Could not create the group.',
    );
  });

  it('keeps the fallback for network and unexpected errors', () => {
    [
      new ApolloError({ networkError: new Error('Failed to fetch') }),
      new Error('group was not created'),
      undefined,
    ].forEach((error) => {
      expect(getCreateGroupErrorMessage(error)).toBe(
        'Could not create the group.',
      );
    });
  });
});

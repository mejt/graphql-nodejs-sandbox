'use strict';

import { GraphQLList } from 'graphql';
import AuthorType from './../../../../src/graphql/type/authorType';
import AuthorsQuery from './../../../../src/graphql/root/queries/authorsQuery';

describe('AuthorsQuery', () => {
    test('should return correct name', () => {
        const name = 'authors';
        const authorsQuery = new AuthorsQuery(name);
        const result = authorsQuery.getName();

        expect(result).toEqual(name);
    });

    test('should return correct schema object', () => {
        const authorsQuery = new AuthorsQuery();
        const schema = authorsQuery.schema();

        expect(schema).toEqual(expect.objectContaining({
            type: new GraphQLList(AuthorType),
            description: 'List of all authors'
        }));
    });

    test('should invoke resolver', () => {
        const resolver = { execute: jest.fn() };
        const authorsQuery = new AuthorsQuery('author', resolver);
        const schema = authorsQuery.schema();
        schema.resolve();

        expect(resolver.execute).toHaveBeenCalled();
    });
});

'use strict';

import { GraphQLID } from 'graphql';
import AuthorType from './../../../../src/graphql/type/authorType';
import AuthorQuery from './../../../../src/graphql/root/queries/authorQuery';

describe('AuthorQuery', () => {
    test('should return correct name', () => {
        const name = 'author';
        const authorQuery = new AuthorQuery(name);
        const result = authorQuery.getName();

        expect(result).toEqual(name);
    });

    test('should return correct schema object', () => {
        const authorQuery = new AuthorQuery();
        const schema = authorQuery.schema();

        expect(schema).toEqual(expect.objectContaining({
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            description: 'Get author by ID'
        }));
    });

    test('should invoke resolver', () => {
        const resolver = { execute: jest.fn() };
        const authorQuery = new AuthorQuery('author', resolver);
        const schema = authorQuery.schema();

        const input = { id: 'test_id' };
        schema.resolve(null, input);

        expect(resolver.execute).toHaveBeenCalledWith(input.id);
    });
});

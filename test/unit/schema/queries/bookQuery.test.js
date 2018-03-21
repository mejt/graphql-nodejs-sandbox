'use strict';

import { GraphQLID } from 'graphql';
import BookType from './../../../../src/graphql/type/bookType';
import BookQuery from './../../../../src/graphql/root/queries/bookQuery';

describe('BookQuery', () => {
    test('should return correct name', () => {
        const name = 'book';
        const bookQuery = new BookQuery(name);
        const result = bookQuery.getName();

        expect(result).toEqual(name);
    });

    test('should return correct schema object', () => {
        const bookQuery = new BookQuery();
        const schema = bookQuery.schema();

        expect(schema).toEqual(expect.objectContaining({
            type: BookType,
            args: { id: { type: GraphQLID } },
            description: 'Get book by ID'
        }));
    });

    test('should invoke resolver', () => {
        const resolver = { execute: jest.fn() };
        const bookQuery = new BookQuery('book', resolver);
        const schema = bookQuery.schema();

        const input = { id: 'test_id' };
        schema.resolve(null, input);

        expect(resolver.execute).toHaveBeenCalledWith(input.id);
    });
});

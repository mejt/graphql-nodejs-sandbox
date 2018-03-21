'use strict';

import { GraphQLList } from 'graphql';
import BookType from './../../../../src/graphql/type/bookType';
import BooksQuery from './../../../../src/graphql/root/queries/booksQuery';

describe('BooksQuery', () => {
    test('should return correct name', () => {
        const name = 'books';
        const booksQuery = new BooksQuery(name);
        const result = booksQuery.getName();

        expect(result).toEqual(name);
    });

    test('should return correct schema object', () => {
        const booksQuery = new BooksQuery();
        const schema = booksQuery.schema();

        expect(schema).toEqual(expect.objectContaining({
            type: new GraphQLList(BookType),
            description: 'List of all books'
        }));
    });

    test('should invoke resolver', () => {
        const resolver = { execute: jest.fn() };
        const booksQuery = new BooksQuery('books', resolver);
        const schema = booksQuery.schema();
        schema.resolve();

        expect(resolver.execute).toHaveBeenCalled();
    });
});

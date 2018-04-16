'use strict';

import { GraphQLID, GraphQLNonNull } from 'graphql';
import bookInput from './../../../../src/graphql/input/bookInput'
import BookType from './../../../../src/graphql/type/bookType';
import AddBookMutation from './../../../../src/graphql/root/mutations/addBookMutation';

describe('AddBookMutation', () => {
    test('should return correct name', () => {
        const name = 'book';
        const addAuthorMutation = new AddBookMutation(name);
        const result = addAuthorMutation.getName();

        expect(result).toEqual(name);
    });

    test('should return correct schema object', () => {
        const addAuthorMutation = new AddBookMutation();
        const schema = addAuthorMutation.schema();

        expect(schema).toEqual(expect.objectContaining({
            type: BookType,
            args: {
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                input: { type: bookInput }
            },
            description: 'Create a new book'
        }));
    });

    test('should invoke resolver', () => {
        const resolver = { execute: jest.fn() };
        const addAuthorMutation = new AddBookMutation('author', resolver);
        const schema = addAuthorMutation.schema();

        const input = { authorId: 'test_id', input: {} };
        schema.resolve(null, input);

        expect(resolver.execute).toHaveBeenCalledWith(input.authorId, input.input);
    });
});

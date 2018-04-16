'use strict';

import { GraphQLID, GraphQLNonNull } from 'graphql';
import authorInput from './../../../../src/graphql/input/authorInput'
import AuthorType from './../../../../src/graphql/type/authorType';
import AddAuthorMutation from './../../../../src/graphql/root/mutations/addAuthorMutation';

describe('AddAuthorMutation', () => {
    test('should return correct name', () => {
        const name = 'author';
        const addAuthorMutation = new AddAuthorMutation(name);
        const result = addAuthorMutation.getName();

        expect(result).toEqual(name);
    });

    test('should return correct schema object', () => {
        const addAuthorMutation = new AddAuthorMutation();
        const schema = addAuthorMutation.schema();

        expect(schema).toEqual(expect.objectContaining({
            type: AuthorType,
            args: { input: { type: authorInput } },
            description: 'Create a new author'
        }));
    });

    test('should invoke resolver', () => {
        const resolver = { execute: jest.fn() };
        const addAuthorMutation = new AddAuthorMutation('author', resolver);
        const schema = addAuthorMutation.schema();

        const input = { input: {} };
        schema.resolve(null, input);

        expect(resolver.execute).toHaveBeenCalledWith(input.input);
    });
});

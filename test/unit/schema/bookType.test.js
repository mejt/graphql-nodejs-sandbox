'use strict';

import { GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull } from 'graphql';
import bookType from './../../../src/graphql/type/bookType';
import authorType from './../../../src/graphql/type/authorType';
import bookInput from './../../../src/graphql/input/bookInput';

describe('Book Type', () => {
    let bookTypeFields;

    beforeEach(() => {
        bookTypeFields = bookType.getFields();
    });

    test('should have id field of type ID', () => {
        expect(bookTypeFields).toHaveProperty('id', getMockedTypeObject('id', GraphQLID));
    });

    test('should have title field of type String', () => {
        expect(bookTypeFields).toHaveProperty('title', getMockedTypeObject('title'));
    });

    test('should have shortDescription field of type String', () => {
        expect(bookTypeFields).toHaveProperty('shortDescription', getMockedTypeObject('shortDescription'));
    });

    test('should have description field of type String', () => {
        expect(bookTypeFields).toHaveProperty('description', getMockedTypeObject('description'));
    });

    test('should have pages field of type Int', () => {
        expect(bookTypeFields).toHaveProperty('pages', getMockedTypeObject('pages', GraphQLInt));
    });

    test('should have releaseDate field of type String', () => {
        expect(bookTypeFields).toHaveProperty('releaseDate', getMockedTypeObject('releaseDate'));
    });

    test('should have author field of type Author', () => {
        expect(bookTypeFields).toHaveProperty('author', getMockedTypeObject('author', authorType));
    });

    function getMockedTypeObject(name, type = GraphQLString, args = [], isDeprecated = false) {
        return {
            type,
            name,
            args,
            isDeprecated
        };
    }
});

describe('Book Input', () => {
    let bookInputFields;

    beforeEach(() => {
        bookInputFields = bookInput.getFields();
    });

    test('should have title field of type String which is required', () => {
        expect(bookInputFields).toHaveProperty('title', getMockedTypeObject('title', new GraphQLNonNull(GraphQLString)));
    });

    test('should have shortDescription field of type String', () => {
        expect(bookInputFields).toHaveProperty('shortDescription', getMockedTypeObject('shortDescription'));
    });

    test('should have description field of type String', () => {
        expect(bookInputFields).toHaveProperty('description', getMockedTypeObject('description'));
    });

    test('should have pages field of type Int', () => {
        expect(bookInputFields).toHaveProperty('pages', getMockedTypeObject('pages', GraphQLInt));
    });

    test('should have releaseDate field of type String', () => {
        expect(bookInputFields).toHaveProperty('releaseDate', getMockedTypeObject('releaseDate'));
    });

    function getMockedTypeObject(name, type = GraphQLString) {
        return {
            type,
            name
        };
    }
});

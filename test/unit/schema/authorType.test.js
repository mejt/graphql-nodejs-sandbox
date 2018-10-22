'use strict';

import { GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import sexType from './../../../src/graphql/type/sexType';
import bookType from './../../../src/graphql/type/bookType';
import authorType from './../../../src/graphql/type/authorType';
import authorInput from './../../../src/graphql/input/authorInput';

describe('Author Type', () => {
    let authorTypeFields;

    beforeEach(() => {
        authorTypeFields = authorType.getFields();
    });

    test('should have id field of type ID', () => {
        expect(authorTypeFields).toHaveProperty('id', getMockedTypeObject('id', GraphQLID));
    });

    test('should have name field of type String', () => {
        expect(authorTypeFields).toHaveProperty('name', getMockedTypeObject('name'));
    });

    test('should have bio field of type String', () => {
        expect(authorTypeFields).toHaveProperty('bio', getMockedTypeObject('bio'));
    });

    test('should have birthday field of type String', () => {
        expect(authorTypeFields).toHaveProperty('birthday', getMockedTypeObject('birthday'));
    });

    test('should have sex field of type String', () => {
        expect(authorTypeFields).toHaveProperty('sex', getMockedTypeObject('sex', sexType));
    });

    test('should have sex field of type List of Books', () => {
        expect(authorTypeFields).toHaveProperty('books', getMockedTypeObject('books'), new GraphQLList(bookType));
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

describe('Author Input', () => {
    let authorInputFields;

    beforeEach(() => {
        authorInputFields = authorInput.getFields();
    });

    test('should have name field of type String which is required', () => {
        expect(authorInputFields).toHaveProperty('name', getMockedTypeObject('name', new GraphQLNonNull(GraphQLString)));
    });

    test('should have bio field of type String', () => {
        expect(authorInputFields).toHaveProperty('bio', getMockedTypeObject('bio'));
    });

    test('should have birthday field of type String', () => {
        expect(authorInputFields).toHaveProperty('birthday', getMockedTypeObject('birthday'));
    });

    test('should have sex field of type String', () => {
        expect(authorInputFields).toHaveProperty('sex', getMockedTypeObject('sex', sexType));
    });

    function getMockedTypeObject(name, type = GraphQLString) {
        return {
            type,
            name
        };
    }
});

'use strict';

import { GraphQLList } from 'graphql';

import bookType from './../../type/bookType';

export default class BooksQuery {
    constructor(name, action) {
        this._name = name;
        this._action = action;
    }

    getName() {
        return this._name;
    }

    schema() {
        return {
            type: new GraphQLList(bookType),
            description: 'List of all books',
            resolve: () => this._action.execute()
        }
    }
}

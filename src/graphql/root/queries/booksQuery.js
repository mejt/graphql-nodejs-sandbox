'use strict';

import { GraphQLList } from 'graphql';

import bookType from './../../type/bookType';

export default class BooksQuery {
    constructor(action) {
        this._action = action;
    }

    schema() {
        return {
            type: new GraphQLList(bookType),
            description: 'List of all book',
            resolve: () => this._action.execute()
        }
    }
}

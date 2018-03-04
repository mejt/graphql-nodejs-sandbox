'use strict';

import { GraphQLID } from 'graphql';

import bookType from './../../type/bookType';

export default class BookQuery {
    constructor(name, action) {
        this._name = name;
        this._action = action;
    }

    getName() {
        return this._name;
    }

    schema() {
        return {
            type: bookType,
            description: 'Get book by ID',
            args: { id: { type: GraphQLID } },
            resolve: (root, { id }) => this._action.execute(id)
        }
    }
}

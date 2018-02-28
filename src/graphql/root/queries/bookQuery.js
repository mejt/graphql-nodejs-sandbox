'use strict';

import { GraphQLID } from 'graphql';

import bookType from './../../type/bookType';

export default class BookQuery {
    constructor(action) {
        this._action = action;
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

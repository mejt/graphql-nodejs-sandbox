'use strict';

import { GraphQLID } from 'graphql';

import authorType from './../../type/authorType';

export default class AuthorQuery {
    constructor(action) {
        this._action = action;
    }

    schema() {
        return {
            type: authorType,
            description: 'Get author by ID',
            args: { id: { type: GraphQLID } },
            resolve: (root, { id }) => this._action.execute(id)
        }
    }
}

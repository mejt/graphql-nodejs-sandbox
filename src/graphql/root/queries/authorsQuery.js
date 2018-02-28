'use strict';

import { GraphQLList } from 'graphql';

import authorType from './../../type/authorType';

export default class AuthorsQuery {
    constructor(action) {
        this._action = action;
    }

    schema() {
        return {
            type: new GraphQLList(authorType),
            description: 'List of all authors',
            resolve: () => this._action.execute()
        }
    }
}

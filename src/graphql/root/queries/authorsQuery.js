'use strict';

import { GraphQLList } from 'graphql';

import authorType from './../../type/authorType';

export default class AuthorsQuery {
    constructor(name, action) {
        this._name = name;
        this._action = action;
    }

    getName() {
        return this._name;
    }

    schema() {
        return {
            type: new GraphQLList(authorType),
            description: 'List of all authors',
            resolve: () => this._action.execute()
        }
    }
}

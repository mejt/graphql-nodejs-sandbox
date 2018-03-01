'use strict';

import { GraphQLID } from 'graphql';

import authorType from './../../type/authorType';

export default class AuthorQuery {
    constructor(name, action) {
        this._name = name;
        this._action = action;
    }

    getName() {
        return this._name;
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

'use strict';

import { GraphQLID, GraphQLNonNull } from 'graphql';

import authorType from './../../type/authorType';
import bookInput from "../../input/bookInput";

export default class AddAuthorMutation {
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
            description: 'Create a new author',
            args: {
                authorId: {type: new GraphQLNonNull(GraphQLID)},
                input: { type: bookInput }
            },
            resolve: (root, { authorId, input }) => this._action.execute(authorId, input)
        }
    }
}

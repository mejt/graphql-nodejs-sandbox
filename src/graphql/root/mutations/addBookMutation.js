'use strict';

import { GraphQLID, GraphQLNonNull } from 'graphql';

import bookType from "../../type/bookType";
import bookInput from "../../input/bookInput";

export default class AddBookMutation {
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
            description: 'Create a new book',
            args: {
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                input: { type: bookInput }
            },
            resolve: (root, { authorId, input }) => this._action.execute(authorId, input)
        }
    }
}

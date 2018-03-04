'use strict';

import { GraphQLID } from 'graphql';

import authorType from './../../type/authorType';
import authorInput from "../../input/authorInput";
import bookType from "../../type/bookType";

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
            args: { input: { type: authorInput } },
            resolve: (root, { input }) => this._action.execute(input)
        }
    }
}

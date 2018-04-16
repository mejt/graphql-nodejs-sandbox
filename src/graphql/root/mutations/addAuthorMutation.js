'use strict';

import authorType from './../../type/authorType';
import authorInput from "../../input/authorInput";

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
                input: { type: authorInput }
            },
            resolve: (root, { input }) => this._action.execute(input)
        }
    }
}

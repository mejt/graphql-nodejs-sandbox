'use strict';

import { GraphQLObjectType } from 'graphql';
import _ from 'lodash';

export default class ObjectType {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._fields = [];
    }

    schema() {
        return new GraphQLObjectType({
            name: this._name,
            description: this._description,
            fields: _.reduce(this._fields, (result, field) => result[field.getName()] = field.schema(), {})
        });

    }

    addField(field) {
        this._fields.push(field);
    }
}

'use strict';

import { GraphQLSchema } from 'graphql';

import queryTypeFactory from './root/queryTypeFactory';
import mutationTypeFactory from "./root/mutationTypeFactory";

export default class SchemaFactory {
    constructor(authorsDao, booksDao) {
        this._authorsDao = authorsDao;
        this._booksDao = booksDao;
    }

    create() {
        return new GraphQLSchema({
            query: queryTypeFactory(this._authorsDao, this._booksDao),
            mutation: mutationTypeFactory(this._authorsDao, this._booksDao)
        });
    }
}

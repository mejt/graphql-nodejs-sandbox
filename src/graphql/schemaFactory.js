'use strict';

import { GraphQLSchema } from 'graphql';

import queryTypeFactory from './root/queryTypeFactory';

export default class SchemaFactory {
    constructor(authorsDao, booksDao) {
        this._authorsDao = authorsDao;
        this._booksDao = booksDao;
    }

    create() {
        return new GraphQLSchema({
            query: queryTypeFactory(this._authorsDao, this._booksDao)
        });
    }
}

'use strict';

import { GraphQLSchema } from 'graphql';

import queryTypeFactory from './root/queryTypeFactory';
import mutationTypeFactory from "./root/mutationTypeFactory";

export default class SchemaFactory {
    constructor(authorsDao, booksDao) {
        this._queryFactory = queryTypeFactory(authorsDao, booksDao);
        this._mutationFactory = mutationTypeFactory(authorsDao, booksDao);
    }

    create() {
        return new GraphQLSchema({
            query: this._queryFactory(),
            mutation: this._mutationFactory()
        });
    }
}

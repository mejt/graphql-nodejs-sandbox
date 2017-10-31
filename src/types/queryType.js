'use strict';

import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';

import authorType from './authorType';
import bookType from './bookType';

import * as authorsController from './../controllers/authorsController';
import * as booksController from './../controllers/booksController';

export default new GraphQLObjectType({
    name: 'Query',
    description: 'Root type for queries',
    fields: {
        authors: {
            type: new GraphQLList(authorType),
            description: 'List of all authors',
            resolve: authorsController.getAllAuthors
        },
        author: {
            type: authorType,
            description: 'Get author by ID',
            args: { id: { type: GraphQLID } },
            resolve: authorsController.getAuthorById
        },
        book: {
            type: bookType,
            description: 'Get book by ID',
            args: { id: { type: GraphQLID } },
            resolve: booksController.getBookById
        }
    }
});

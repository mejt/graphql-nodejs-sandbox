'use strict';

import { GraphQLObjectType } from 'graphql';

import authorType from './authorType';
import bookType from './bookType';
import authorInput from './authorInput';
import bookInput from './bookInput';

import * as authorsController from './../controllers/authorsController';
import * as booksController from './../controllers/booksController';

export default new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root type for mutations',
    fields: {
        addAuthor: {
            type: authorType,
            description: 'Create a new author',
            args: { input: { type: authorInput } },
            resolve: authorsController.addAuthor
        },
        addBook: {
            type: bookType,
            description: 'Create a new book',
            args: { input: { type: bookInput } },
            resolve: booksController.addBook
        }
    }
});

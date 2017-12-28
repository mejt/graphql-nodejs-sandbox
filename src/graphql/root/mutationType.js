'use strict';

import { GraphQLObjectType } from 'graphql';

import authorType from './../type/authorType';
import bookType from './../type/bookType';
import authorInput from './../input/authorInput';
import bookInput from './../input/bookInput';

import * as authorsController from './../../controllers/authorsController';
import * as booksController from './../../controllers/booksController';

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

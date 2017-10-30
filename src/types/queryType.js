import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
const mongoose = require('mongoose');

import authorType from './authorType';
import bookType from './bookType';

import Author from './../models/Author';
import Book from './../models/Book';

export default new GraphQLObjectType({
    name: 'Query',
    description: 'Root type for queries',
    fields: {
        author: {
            type: authorType,
            description: 'Get author by ID',
            args: {
                id: { type: GraphQLString }
            },
            resolve: function ({id}) {
                return Author.findById(new mongoose.Types.ObjectId(id)).populate('books');
            }
        },
        book: {
            type: bookType,
            description: 'Get book by ID',
            args: {
                id: { type: GraphQLString }
            },
            resolve: function (root, {id}) {
                return Book.findById(new mongoose.Types.ObjectId(id)).populate('author');
            }
        }
    }
});

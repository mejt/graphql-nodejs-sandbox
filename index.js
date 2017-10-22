'use strict';

const mongoose = require('mongoose');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const Book = require('./models/Book');
const Author = require('./models/Author');

mongoose.connect(process.env.MONGODB_URI,  {
    useMongoClient: true
});

const schema = graphql.buildSchema(`
    type Book {
        id: ID!
        title: String!
        shortDescription: String!
        description: String
        pages: Int!
        isbn: String!
        releaseDate: String!
        isReleased: Boolean!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        bio: String
        birthday: String!
        sex: String!
        books: [Book!]!
    }
    
    type Query {
        book(id: String): Book
        author(id: String): Author
    }
`);

const root = {
    book: function ({id}) {
        return Book.findById(id);
    },
    author: function ({id}) {
        return Author.findById(id);
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);

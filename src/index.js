'use strict';

const mongoose = require('mongoose');
const express = require('express');
const graphqlHTTP = require('express-graphql');
import * as graphql from 'graphql';

const Book = require('./models/Book');
const Author = require('./models/Author');

mongoose.connect(process.env.MONGODB_URI,  {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});

const schema = graphql.buildSchema(`
    type Book {
        id: ID
        title: String
        shortDescription: String
        description: String
        pages: Int
        isbn: String
        releaseDate: String
        isReleased: Boolean
        author: Author
    }

    type Author {
        id: ID
        name: String
        bio: String
        birthday: String
        sex: String
        books: [Book]
    }
    
    type Query {
        authors: [Author]
        book(id: String): Book
        author(id: String): Author
    }

    input AuthorInput {
        name: String
        bio: String
        bio: String
        birthday: String
        sex: String
    }
    
    input BookInput {
        title: String
        shortDescription: String
        description: String
        pages: Int
        authorId: String
    }

    type Mutation {
        addAuthor(input: AuthorInput): Author
        addBook(input: BookInput): Book
    }
`);

const root = {
    book: function ({id}) {
        return Book.findById(new mongoose.Types.ObjectId(id)).populate('author');
    },
    authors: function () {
        return Author.find().populate('books').exec();
    },
    author: function ({id}) {
        return Author.findById(new mongoose.Types.ObjectId(id)).populate('books');
    },
    addAuthor: function ({input}) {
        let author = new Author(input);
        return author.save();
    },
    addBook: function ({input}) {
        const authorId = new mongoose.Types.ObjectId(input.authorId);
        return Author.findById(authorId).then(function (author) {
            input.author = authorId;

            let book = new Book(input);
            return book.save().then(function (book) {
                author.books.push(book);
                return author.save().then(function () {
                    return book;
                });
            });
        });
    }
};

const app = express();

app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);

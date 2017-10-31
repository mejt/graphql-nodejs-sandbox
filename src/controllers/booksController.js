'use strict';

import mongoose from 'mongoose';

import Author from './../models/Author';
import Book from './../models/Book';

export function getBookById(root, {id}) {
    return Book.findById(new mongoose.Types.ObjectId(id)).populate('author');
}

export function addBook(root, {input}) {
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

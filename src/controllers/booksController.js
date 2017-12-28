'use strict';

import mongoose from 'mongoose';

import Author from './../models/Author';
import Book from './../models/Book';

export function getBookById(root, {id}) {
    return Book.findById(new mongoose.Types.ObjectId(id)).populate('author');
}

export function getAllBooks() {
    return Book.find().populate('author').exec();
}

export async function addBook(root, {input}) {
    const authorId = new mongoose.Types.ObjectId(input.authorId);
    const author = await Author.findById(authorId);

    if (!author) {
        return null;
    }

    input.author = authorId;
    const book = await new Book(input).save();

    author.books.push(book);
    await author.save();

    return getBookById(null, book);
}

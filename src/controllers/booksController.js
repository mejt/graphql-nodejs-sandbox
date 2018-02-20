'use strict';

import mongoose from 'mongoose';

import Author from '../models/authorModel';
import Book from '../models/bookModel';

export function getBookById(root, {id}) {
    return Book.findById(new mongoose.Types.ObjectId(id)).populate('author');
}

export function getAllBooks() {
    return Book.find().populate('author').exec();
}

export async function addBook(root, {authorId, input}) {
    const authorObjectId = new mongoose.Types.ObjectId(authorId);
    const author = await Author.findById(authorObjectId);

    if (!author) {
        throw new Error('Author is not exists');
    }

    input.author = authorObjectId;
    const book = await new Book(input).save();

    author.books.push(book);
    await author.save();

    return getBookById(null, book);
}

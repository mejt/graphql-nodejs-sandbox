'use strict';

import mongoose from 'mongoose';
import Author from '../models/authorModel';

export function getAuthorById(root, {id}) {
    return Author.findById(new mongoose.Types.ObjectId(id)).populate('books');
}

export function getAllAuthors() {
    return Author.find().populate('books').exec();
}

export function addAuthor(root, {input}) {
    let author = new Author(input);
    return author.save();
}

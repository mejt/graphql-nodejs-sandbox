'use strict';

import mongoose from 'mongoose';
import Book from './../models/Book';

export function getBookById(root, {id}) {
    return Book.findById(new mongoose.Types.ObjectId(id)).populate('author');
}

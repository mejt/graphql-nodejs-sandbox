'use strict';

import mongoose from "mongoose";

export default class BookDao {
    constructor(bookModel) {
        this._authorModel = bookModel;
    }

    getById(bookId) {
        return this._authorModel
            .findById(new mongoose.Types.ObjectId(bookId))
            .populate('author');
    }

    create(authorId, data) {
        data.author = authorId;

        const book = new this._authorModel(data);
        return book.save();
    }
}

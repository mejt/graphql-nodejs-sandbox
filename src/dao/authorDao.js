'use strict';

import mongoose from "mongoose";

export default class AuthorDao {
    constructor(authorModel) {
        this._authorModel = authorModel;
    }

    getById(authorId) {
        return this._authorModel
            .findById(new mongoose.Types.ObjectId(authorId))
            .populate('books');
    }

    getAll() {
        return this._authorModel
            .find().populate('books').exec();
    }

    create(authorData) {
        const author = new this._authorModel(authorData);
        return author.save()
            .then(result => result._id);
    }

    assignBookToAuthor(author, bookId) {
        author.books.push(bookId);
        return author.save();
    }
}

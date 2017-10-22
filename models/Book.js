'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    shortDescription: String,
    description: String,
    pages: Number,
    isbn: String,
    releaseDate: Date
});

export default mongoose.model('Book', bookSchema);

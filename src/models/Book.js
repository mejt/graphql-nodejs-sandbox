'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

const bookSchema = new Schema({
    title: String,
    author: { type: SchemaObjectId, ref: 'Author' },
    shortDescription: String,
    description: String,
    pages: Number,
    isbn: String,
    releaseDate: Date
});

module.exports = mongoose.model('Book', bookSchema);

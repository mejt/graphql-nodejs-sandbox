'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const bookSchema = new Schema({
    title: String,
    author: { type: SchemaObjectId, ref: 'Author' },
    shortDescription: String,
    description: String,
    pages: Number,
    isbn: String,
    releaseDate: Date
});

export default mongoose.model('Book', bookSchema);

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    bio: String,
    birthday: Date,
    sex: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

export default mongoose.model('Author', authorSchema);

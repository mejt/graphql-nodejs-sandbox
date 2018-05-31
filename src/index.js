'use strict';

import mongoose from 'mongoose';

import appFactory from './initServer';
import configurationProvider from './configurationProvider';

import AuthorDao from "./dao/authorDao";
import BookDao from "./dao/bookDao";
import AuthorModel from './models/authorModel';
import BookModel from './models/bookModel';

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});

const authorDao = new AuthorDao(AuthorModel);
const bookDao = new BookDao(BookModel);

const app = appFactory(configurationProvider);
app(authorDao, bookDao);

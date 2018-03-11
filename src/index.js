'use strict';

import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

import graphqlHTTP from "express-graphql";
import SchemaFactory from "./graphql/schemaFactory";

import AuthorDao from "./dao/authorDao";
import BookDao from "./dao/bookDao";
import AuthorModel from './models/authorModel';
import BookModel from './models/bookModel';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,  {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});

const app = express();

const authorDao = new AuthorDao(AuthorModel);
const bookDao = new BookDao(BookModel);

const schemaFactory = new SchemaFactory(authorDao, bookDao);
app.use('/', graphqlHTTP({
    schema: schemaFactory.create(),
    graphiql: true
}));

app.listen(process.env.PORT || 4000);

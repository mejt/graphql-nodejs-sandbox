'use strict';

import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

import graphqlHTTP from "express-graphql";
import SchemaFactory from "./graphql/schemaFactory";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,  {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});

const app = express();

const schemaFactory = new SchemaFactory();
app.use('/', graphqlHTTP({
    schema: schemaFactory.create(),
    graphiql: true
}));

app.listen(process.env.PORT || 4000);

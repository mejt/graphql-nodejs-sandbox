'use strict';

import mongoose from 'mongoose';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import dotenv from 'dotenv';
import { GraphQLSchema } from 'graphql';

import queryType from './types/queryType';
import mutationType from './types/mutationType';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,  {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});

const app = express();
const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(process.env.PORT || 4000);

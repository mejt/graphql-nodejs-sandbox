'use strict';

import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

import {init as initGraphQLSchema} from './graphql/schema';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,  {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});

const app = express();
app.use('/', initGraphQLSchema());

app.listen(process.env.PORT || 4000);

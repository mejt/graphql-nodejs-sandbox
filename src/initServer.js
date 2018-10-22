'use strict';

import graphqlHTTP from "express-graphql";
import express from "express";
import SchemaFactory from "./graphql/schemaFactory";
import { AppError } from "./errors";

/**
 * Initialize express server with GraphQL
 * @param configurationProvider
 * @returns {function()}
 */
export default function init(configurationProvider) {
    return (authorDao, bookDao) => {
        const app = express();
        const schemaFactory = new SchemaFactory(authorDao, bookDao);

        app.use('/', graphqlHTTP({
            schema: schemaFactory.create(),
            graphiql: configurationProvider.useGraphiql(),
            formatError
        }));

        return app.listen(configurationProvider.getAppPort());
    };

    function formatError(error) {
        const originalError = error.originalError;
        if (originalError && originalError instanceof AppError) {
            return { message: originalError.message, statusCode: originalError.code };
        }

        return error;
    }
}

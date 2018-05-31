'use strict';

import graphqlHTTP from "express-graphql";
import express from "express";
import SchemaFactory from "./graphql/schemaFactory";

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
            graphiql: configurationProvider.useGraphiql()
        }));

        return app.listen(configurationProvider.getAppPort());
    };
}

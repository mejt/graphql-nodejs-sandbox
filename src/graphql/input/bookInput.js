'use strict';

import { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';

export default new GraphQLInputObjectType({
    name: 'BookInput',
    fields: () => ({
        title: {type: new GraphQLNonNull(GraphQLString)},
        shortDescription: {type: GraphQLString},
        description: {type: GraphQLString},
        pages: {type: GraphQLInt},
        isbn: {type: GraphQLString},
        releaseDate: {type: GraphQLString}
    })
});

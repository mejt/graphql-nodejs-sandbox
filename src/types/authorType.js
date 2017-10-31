'use strict';

import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import bookType from './bookType';

export default new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        bio: {
            type: GraphQLString
        },
        birthday: {
            type: GraphQLString
        },
        sex: {
            type: GraphQLString
        },
        books: {
            type: new GraphQLList(bookType)
        }
    })
});

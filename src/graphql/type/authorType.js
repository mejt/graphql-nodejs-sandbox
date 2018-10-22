'use strict';

import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import bookType from './bookType';
import sexType from './sexType';

export default new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        bio: {type: GraphQLString},
        birthday: {type: GraphQLString},
        sex: {type: sexType},
        books: {type: new GraphQLList(bookType)}
    })
});

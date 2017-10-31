'use strict';

import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
    name: 'AuthorInput',
    fields: () => ({
        name: {type: GraphQLString},
        bio: {type: GraphQLString},
        birthday: {type: GraphQLString},
        sex: {type: GraphQLString}
    })
});

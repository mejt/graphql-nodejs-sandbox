'use strict';

import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import sexType from './../type/sexType';

export default new GraphQLInputObjectType({
    name: 'AuthorInput',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        bio: {type: GraphQLString},
        birthday: {type: GraphQLString},
        sex: {type: sexType}
    })
});

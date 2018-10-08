'use strict';

import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
    name: 'Sex',
    values: {
        Male: {
            name: 'Male',
            value: 'male'
        },
        Female: {
            name: 'Female',
            value: 'female'
        }
    }
});

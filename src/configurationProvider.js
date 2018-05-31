'use strict';

import dotenv from 'dotenv';

dotenv.config();

export default {
    getAppPort: () => {
        return process.env.PORT || 4000;
    },
    useGraphiql: () => {
        return process.env.GRAPHIQL || false;
    }
};

'use strict';

import AppError from './appError';

class NotFoundError extends AppError {
    constructor(message) {
        super();

        this.message = message;
        this.code = 404;
    }
}

export default NotFoundError;

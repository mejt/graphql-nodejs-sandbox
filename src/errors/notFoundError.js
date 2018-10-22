'use strict';

import AppError from './appError';

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

export default NotFoundError;

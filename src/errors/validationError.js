'use strict';

import AppError from './appError';

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

export default ValidationError;

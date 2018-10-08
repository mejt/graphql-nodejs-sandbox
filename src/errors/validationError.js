'use strict';

import AppError from './appError';

class ValidationError extends AppError {
    constructor(message) {
        super();

        this.message = message;
        this.code = 400;
    }
}

export default ValidationError;

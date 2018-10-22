'use strict';

class AppError extends Error {
    constructor(message, statusCode) {
        super();

        this.message = message;
        this.code = statusCode;
    }
}

export default AppError;

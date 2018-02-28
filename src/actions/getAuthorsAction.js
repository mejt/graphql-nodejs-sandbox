'use strict';

export default class GetAuthorsAction {
    constructor(authorsDao) {
        this._authorsDao = authorsDao;
    }

    execute() {
        return this._authorsDao.getAll();
    }
}

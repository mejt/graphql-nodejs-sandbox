'use strict';

export default class GetAuthorsAction {
    constructor(authorsDao) {
        this._authorssDao = authorsDao;
    }

    execute(authorId) {
        return this._authorsDao.getById(authorId);
    }
}

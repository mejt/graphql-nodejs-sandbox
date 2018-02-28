'use strict';

export default class GetBooksAction {
    constructor(booksDao) {
        this._booksDao = booksDao;
    }

    execute() {
        return this._booksDao.getAll();
    }
}

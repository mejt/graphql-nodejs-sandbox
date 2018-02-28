'use strict';

export default class GetBooksAction {
    constructor(booksDao) {
        this._booksDao = booksDao;
    }

    execute(bookId) {
        return this._booksDao.getById(bookId);
    }
}

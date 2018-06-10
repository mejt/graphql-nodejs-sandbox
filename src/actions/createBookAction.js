'use strict';

export default class CreateBookAction {
    constructor(bookDao, authorDao) {
        this._bookDao = bookDao;
        this._authorDao = authorDao;
    }

    async execute(authorId, inputData) {
        const author = await this._authorDao.getById(authorId);

        if (!author) {
            throw new Error('Author does not exist');
        }

        const bookId = await this._bookDao.create(author.id, inputData);
        await this._authorDao.assignBookToAuthor(author, bookId);

        return this._bookDao.getById(bookId);
    }
}

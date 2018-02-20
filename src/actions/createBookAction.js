'use strict';

export default class CreateBook {
    constructor(bookDao, authorDao) {
        this._bookDao = bookDao;
        this._authorDao = authorDao;
    }

    async execute(root, {authorId, input}) {
        const author = await this._authorDao.getById(authorId);

        if (!author) {
            throw new Error('Author does not exist');
        }

        const book = await this._bookDao.create(author.id, input);
        await this._authorDao.addBook(book);

        return book;
    }
}

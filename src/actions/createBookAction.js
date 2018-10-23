'use strict';

import isbnIsValid from 'isbn-validator';
import { NotFoundError, ValidationError } from './../errors';

export default class CreateBookAction {
    constructor(bookDao, authorDao) {
        this._bookDao = bookDao;
        this._authorDao = authorDao;
    }

    async execute(authorId, inputData) {
        if (Number.isInteger(inputData.pages) && inputData.pages <= 0) {
            throw new ValidationError('Book must have more than 0 pages');
        }

        if (inputData.isbn && !isbnIsValid(inputData.isbn)) {
            throw new ValidationError('ISBN is invalid');
        }

        const author = await this._authorDao.getById(authorId);

        if (!author) {
            throw new NotFoundError('Author does not exist');
        }

        const id = await this._bookDao.create(author.id, inputData);
        await this._authorDao.assignBookToAuthor(author, id);

        return Object.assign(inputData, { id });
    }
}

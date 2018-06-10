'use strict';

export default class CreateAuthorAction {
    constructor(authorDao) {
        this._authorDao = authorDao;
    }

    async execute(inputData) {
        const newAuthorId = await this._authorDao.create(inputData);
        return this._authorDao.getById(newAuthorId);
    }
}

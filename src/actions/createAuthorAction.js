'use strict';

export default class CreateAuthorAction {
    constructor(authorDao) {
        this._authorDao = authorDao;
    }

    async execute(inputData) {
        const id = this._authorDao.create(inputData);
        return Object.assign(inputData, { id });
    }
}

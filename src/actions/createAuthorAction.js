'use strict';

export default class CreateAuthorAction {
    constructor(authorDao) {
        this._authorDao = authorDao;
    }

    execute(inputData) {
        return this._authorDao.create(inputData);
    }
}

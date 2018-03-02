'use strict';

export default class CreateAuthorAction {
    constructor(authorDao) {
        this._authorDao = authorDao;
    }

    async execute(inputData) {
        return this._authorDao(inputData);
    }
}

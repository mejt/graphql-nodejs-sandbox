'use strict';

import CreateAuthor from './../../../src/actions/createAuthorAction';

describe('CreateBookAction', () => {
    let authorDao;

    beforeEach(() => {
        authorDao = { getById: jest.fn(), create: jest.fn() };
    });

    test('should create book and add to author collection', async () => {
        const authorId = '3421-2ASA';
        const input = { name: 'John Doe' };
        const fakeAuthor = { id: authorId, name: input.name };

        authorDao.getById.mockReturnValue(fakeAuthor);
        authorDao.create.mockReturnValue(authorId);

        const createBook = new CreateAuthor(authorDao);
        const result = await createBook.execute(input);

        expect(authorDao.create).toHaveBeenCalledWith(input);
        expect(authorDao.getById).toHaveBeenCalledWith(authorId);
        expect(result).toEqual(fakeAuthor);
    });
});

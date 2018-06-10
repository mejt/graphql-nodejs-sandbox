'use strict';

import CreateBook from './../../../src/actions/createBookAction';

describe('CreateBookAction', () => {
    let bookDao;
    let authorDao;

    beforeEach(() => {
        bookDao = { create: jest.fn(), getById: jest.fn() };
        authorDao = { getById: jest.fn(), assignBookToAuthor: jest.fn() };
    });

    test('should throw error if author does not exist', async () => {
        authorDao.getById.mockReturnValue(Promise.resolve(undefined));
        const createBook = new CreateBook(bookDao, authorDao);

        try {
            await createBook.execute('1', { title: 'Title' });
        } catch (error) {
            expect(error.message).toEqual('Author does not exist')
        }
    });

    test('should create book and add to author collection', async () => {
        const authorId = '3421-2ASA';
        const bookId = 'WWA-434';
        const input = { title: 'Title' };
        const fakeBook = { title: input.title, id: bookId };
        const fakeAuthor = { id: authorId };

        authorDao.getById.mockReturnValue(Promise.resolve(fakeAuthor));
        bookDao.create.mockReturnValue(Promise.resolve(bookId));
        bookDao.getById.mockReturnValue(Promise.resolve(fakeBook));

        const createBook = new CreateBook(bookDao, authorDao);
        const result = await createBook.execute('1', input );

        expect(bookDao.create).toHaveBeenCalledWith(authorId, input);
        expect(authorDao.assignBookToAuthor).toHaveBeenCalledWith(fakeAuthor, bookId);
        expect(result).toEqual(fakeBook);
    });
});

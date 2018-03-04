'use strict';

import CreateBook from './../../../src/actions/createBookAction';

describe('CreateBookAction', () => {
    let bookDao;
    let authorDao;

    beforeEach(() => {
        bookDao = { create: jest.fn() };
        authorDao = { getById: jest.fn(), assignBookToAuthor: jest.fn() };
    });

    test('should throw error if author does not exist', async () => {
        // given
        //console.log(authorDao.getById.);
        authorDao.getById.mockReturnValue(Promise.resolve(undefined));
        const createBook = new CreateBook(bookDao, authorDao);

        try {
            // when
            await createBook.execute('1', { title: 'Title' });
        } catch (error) {
            // then
            expect(error.message).toEqual('Author does not exist')
        }
    });

    test('should create book and add to author collection', async () => {
        // given
        const authorId = '3421-2ASA';
        const bookId = 'WWA-434';
        const input = { title: 'Title' };
        const createdBookMock = { title: input.title, id: bookId };

        authorDao.getById.mockReturnValue(Promise.resolve({ id: authorId }));
        bookDao.create.mockReturnValue(Promise.resolve(createdBookMock));

        const createBook = new CreateBook(bookDao, authorDao);

        // when
        const result = await createBook.execute('1', input );

        // then
        const createArgs = bookDao.create.mock.calls[0];
        const addBookArgs = authorDao.assignBookToAuthor.mock.calls[0];

        expect(createArgs[0]).toEqual(authorId);
        expect(createArgs[1]).toEqual(input);
        expect(addBookArgs[1]).toEqual(createdBookMock);
        expect(result).toEqual(createdBookMock);
    });
});

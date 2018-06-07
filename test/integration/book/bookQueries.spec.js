'use strict';

import request from 'supertest';

import AppFactory from './../../../src/initServer';
import configurationProvider from './../../../src/configurationProvider';

const appFactory = AppFactory(configurationProvider);

describe('Book Queries', () => {
    let app;

    const bookDaoMock = {};

    beforeAll(() => {
        app = appFactory({}, bookDaoMock);
    });

    beforeEach(() => {
        bookDaoMock.getAll = jest.fn();
        bookDaoMock.getById = jest.fn();
    });

    afterAll(() => {
        app.close();
    });

    test('should return correct fields for getBooks query', async () => {
        bookDaoMock.getAll.mockReturnValue([
            { id: 1, title: 'Great book', pages: 743, isbn: '3351498751543', description: 'hello world' },
            { id: 2, title: 'Greater book', pages: 865, isbn: '3351498751546', description: 'HELLO WORLD' }
        ]);

        const query = `
            query getBooks {
              books {
                title
                pages
              }
            }
        `;

        const response = await request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            data: {
                books: [
                    { title: 'Great book', pages: 743 },
                    { title: 'Greater book', pages: 865 }
                ]
            }
        });
    });

    test('should return correct fields for getBook query', async () => {
        bookDaoMock.getById.mockReturnValue({
            id: 2,
            title: 'The greatest book',
            pages: 743,
            isbn: '3351498751543',
            description: 'hello world',
            author: {
                id: 5, name: 'John Doe',
                birthday: new Date(1970, 1, 1)
            }
        });

        const query = `
            query getBook {
              book(id: 2) {
                title
                description
                author {
                    name
                }
              }
            }
        `;

        const response = await request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            data: {
                book: {
                    title: 'The greatest book',
                    description: 'hello world',
                    author: { name: 'John Doe' }
                }
            }
        });
    });
});

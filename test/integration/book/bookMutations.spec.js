'use strict';

import request from 'supertest';

import AppFactory from './../../../src/initServer';
import configurationProvider from './../../../src/configurationProvider';

const appFactory = AppFactory(configurationProvider);

describe('Book Mutations', () => {
    let app;

    const authorDaoMock = {};
    const bookDaoMock = {};
    const baseQuery = `
        mutation addBook($authorId: ID!, $input: BookInput) {
          addBook(authorId: $authorId, input: $input) {
            id
          }
        }
    `;

    beforeAll(() => {
        app = appFactory(authorDaoMock, bookDaoMock);
    });

    beforeEach(() => {
        authorDaoMock.getById = jest.fn();
        authorDaoMock.assignBookToAuthor = jest.fn();
        bookDaoMock.getById = jest.fn();
        bookDaoMock.create = jest.fn();
    });

    afterAll(() => app.close());

    test('should return error when input is incorrect', async () => {
        const invalidData = { pages: 543 };

        const response = await sendRequest({ authorId: 'ABC_ID', input: invalidData });
        expect(response.statusCode).toBe(500);
        expect(response.body.errors[0].message).toEqual(
            'Variable "$input" got invalid value {"pages":543}; ' +
            'Field value.title of required type String! was not provided.'
        );
    });

    test('should return error when author id is empty', async () => {
        const newBook = {
            title: 'New book',
            shortDescription: 'Description',
            pages: 543
        };

        const response = await sendRequest({ authorId: null, input: newBook });
        expect(response.statusCode).toBe(500);
        expect(response.body.errors[0].message).toEqual(
            'Variable "$authorId" got invalid value null; Expected non-nullable type ID! not to be null.'
        );
    });

    test('should return error when author for passed id does not exist', async () => {
        const newBook = {
            title: 'New book',
            shortDescription: 'Description',
            pages: 543
        };

        authorDaoMock.getById.mockReturnValue(null);

        const response = await sendRequest({ authorId: "ABC", input: newBook });
        expect(response.statusCode).toBe(200);
        expect(response.body.errors[0].message).toEqual('Author does not exist');
    });

    test('should create new book and return correct values', async () => {
        const newBook = {
            title: 'New book',
            shortDescription: 'Description',
            pages: 543
        };

        authorDaoMock.getById.mockReturnValue({ id: 'ABC_ID' });
        bookDaoMock.create.mockReturnValue("ABC");

        const response = await sendRequest({ authorId: 'ABC_ID', input: newBook });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: { addBook: { id: "ABC" } }});
    });

    function sendRequest(variables) {
        return request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query: baseQuery, variables })
    }
});

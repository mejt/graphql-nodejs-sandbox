'use strict';

import request from 'supertest';

import AppFactory from './../../../src/initServer';
import configurationProvider from './../../../src/configurationProvider';

const appFactory = AppFactory(configurationProvider);

describe('Author Mutations', () => {
    let app;

    const authorDaoMock = {};
    const baseQuery = `
        mutation addAuthor($input: AuthorInput) {
          addAuthor(input: $input) {
            id
          }
        }
    `;

    beforeAll(() => {
        app = appFactory(authorDaoMock);
    });

    beforeEach(() => {
        authorDaoMock.getById = jest.fn();
        authorDaoMock.create = jest.fn();
    });

    afterAll(() => app.close());

    test('should return error when input is incorrect', async () => {
        const invalidData = { bio: 'Biography' };
        const variables = { input: invalidData };
        const response = await request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query: baseQuery, variables });

        expect(response.statusCode).toBe(500);
        expect(response.body.errors[0].message).toEqual(
            'Variable "$input" got invalid value {"bio":"Biography"}; ' +
            'Field value.name of required type String! was not provided.'
        );
    });

    test('should create new author and return correct values', async () => {
        const newAuthor = {
            name: 'New Author',
            bio: 'Biography',
            birthday: new Date(1898, 2, 6),
            sex: 'Male'
        };

        authorDaoMock.create.mockReturnValue("ABC");

        const variables = { input: newAuthor };
        const response = await request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query: baseQuery, variables });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: { addAuthor: { id: "ABC" } }});
    });
});

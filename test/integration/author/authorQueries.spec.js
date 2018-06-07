'use strict';

import request from 'supertest';

import AppFactory from './../../../src/initServer';
import configurationProvider from './../../../src/configurationProvider';

const appFactory = AppFactory(configurationProvider);

describe('Author Queries', () => {
    let app;

    const authorDaoMock = {};

    beforeAll(() => {
        app = appFactory(authorDaoMock);
    });

    beforeEach(() => {
        authorDaoMock.getAll = jest.fn();
        authorDaoMock.getById = jest.fn();
    });

    afterAll(() => app.close());

    test('should return correct fields for getAuthors query', async () => {
        authorDaoMock.getAll.mockReturnValue([
            { id: 1, name: 'John Doe', birthday: new Date(1970, 1, 1) },
            { id: 2, name: 'Max Douglas', birthday: new Date(1950, 10, 24) }
        ]);

        const query = `
            query getAuthors {
              authors {
                name
              }
            }
        `;

        const response = await request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ data: { authors: [{ name: 'John Doe' }, { name: 'Max Douglas' }]}});
    });

    test('should return correct fields for getAuthor query', async () => {
        authorDaoMock.getById.mockReturnValue({
            id: 5, name: 'Andy Stark', birthday: new Date(1970, 1, 1), books: [{
                title: 'Last time', pages: 545, shortDescription: 'Nice book'
            }, {
                title: 'I like pancakes', pages: 321, shortDescription: 'Extremely interesting'
            }]
        });

        const query = `
            query getAuthor {
              author(id: 5) {
                name
                books {
                    title
                    pages
                }
              }
            }
        `;

        const response = await request(app)
            .post('/')
            .set('Content-type', 'application/json')
            .send({ query });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({data: {
            author: { name: 'Andy Stark', books: [
                { title: 'Last time', pages: 545 },
                { title: 'I like pancakes', pages: 321 }
            ]}
        }});
    });
});

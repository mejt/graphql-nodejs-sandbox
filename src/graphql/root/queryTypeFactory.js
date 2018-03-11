'use strict';

import ObjectType from './rootObjectType'

import AuthorsQuery from './queries/authorsQuery';
import AuthorQuery from "./queries/authorQuery";
import BooksQuery from "./queries/booksQuery";
import BookQuery from "./queries/bookQuery";

import GetAuthorsAction from "../../actions/getAuthorsAction";
import GetAuthorAction from "../../actions/getAuthorAction";
import GetBookAction from "../../actions/getBookAction";
import GetBooksAction from "../../actions/getBooksAction";

export default function queryTypeFactory(authorsDao, booksDao) {
    return () => {
        const queryType = new ObjectType('Query', 'Root type for queries');
        queryType.addField(authorsQuery())
            .addField(authorQuery())
            .addField(booksQuery())
            .addField(bookQuery());

        return queryType.schema();
    };

    function authorsQuery() {
        const action = new GetAuthorsAction(authorsDao);
        return new AuthorsQuery('authors', action);
    }

    function authorQuery() {
        const action = new GetAuthorAction(authorsDao);
        return new AuthorQuery('author', action);
    }

    function booksQuery() {
        const action = new GetBooksAction(booksDao);
        return new BooksQuery('books', action);
    }

    function bookQuery() {
        const action = new GetBookAction(booksDao);
        return new BookQuery('book', action);
    }
}

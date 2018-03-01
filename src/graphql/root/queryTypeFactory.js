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
    const queryType = new ObjectType('Query', 'Root type for queries');
    queryType.addField(new AuthorsQuery('authors', new GetAuthorsAction(authorsDao)));
    queryType.addField(new AuthorQuery('author', new GetAuthorAction(authorsDao)));
    queryType.addField(new BookQuery('book', new GetBookAction(booksDao)));
    queryType.addField(new BooksQuery('books', new GetBooksAction(booksDao)));

    return queryType.schema();
}

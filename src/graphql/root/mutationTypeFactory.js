'use strict';

import ObjectType from './rootObjectType'
import AddAuthorMutation from "./mutations/addAuthorMutation";
import CreateAuthorAction from "../../actions/createAuthorAction";
import AddBookMutation from "./mutations/addBookMutation";
import CreateBookAction from "../../actions/createBookAction";

export default function mutationTypeFactory(authorsDao, booksDao) {
    const queryType = new ObjectType('Mutation', 'Root type for mutation');
    queryType.addField(new AddAuthorMutation('addAuthor', new CreateAuthorAction(authorsDao)));
    queryType.addField(new AddBookMutation('addBook', new CreateBookAction(booksDao, authorsDao)));

    return queryType.schema();
}

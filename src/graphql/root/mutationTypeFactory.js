'use strict';

import ObjectType from './rootObjectType'
import AddAuthorMutation from "./mutations/addAuthorMutation";
import CreateAuthorAction from "../../actions/createAuthorAction";
import AddBookMutation from "./mutations/addBookMutation";
import CreateBookAction from "../../actions/createBookAction";

export default function mutationTypeFactory(authorsDao, booksDao) {
    return () => {
        const queryType = new ObjectType('Mutation', 'Root type for mutation')
            .addField(addAuthorMutation())
            .addField(addBookMutation());

        return queryType.schema();
    };

    function addAuthorMutation() {
        const action = new CreateAuthorAction(authorsDao);
        return new AddAuthorMutation('addAuthor', action);
    }

    function addBookMutation() {
        const action = new CreateBookAction(booksDao, authorsDao);
        return new AddBookMutation('addBook', action);
    }
}

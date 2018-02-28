'use strict';

import ObjectType from './rootObjectType'
import AuthorsQuery from './queries/authorsQuery';
import GetAuthorsAction from "../../actions/getAuthorsAction";
import AuthorQuery from "./queries/authorQuery";

export default function queryTypeFactory(authorsDao) {
    const queryType = new ObjectType('Query', 'Root type for queries');
    queryType.addField(new AuthorsQuery(new GetAuthorsAction(authorsDao)));
    queryType.addField(new AuthorQuery(new GetAuthorAction))

    return queryType.schema();
}

function prepareAuthorsQuery() {
    
}


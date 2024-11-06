
import {gql} from "@apollo/client";

export const GET_DATA = gql`
  query {
    getAllList {
      key
      title
      sort
      created
    }
    getAllCard {
      id
      text
      index
      editMode
      created
      updated
      listId
    }
  }
`;



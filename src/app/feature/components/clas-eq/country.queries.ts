import { gql } from 'apollo-angular';

export const FIND_ALL_PAGINATION_COUNTRY = gql`
  query getDocMincon($page: PaginateDTO!) {
    getDocMincon(paginationDto: $page) {
      count
      items {
        id
        name
      }
    }
  }
`;

export const FIND_ONE_BY_ID_COUNTRY = gql`
  query findOne($id: String!) {
    findOne(id: $id) {
      id
      name
    }
  }
`;

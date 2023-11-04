import { gql } from 'apollo-angular';

export const GET_ALL_PEOPLE = gql`
  query getAllPersonPosition($page: PaginateDTO!) {
    getPersonPosition(paginationDto: $page) {
      count
      items {
        id
        name
        position
      }
    }
  }
`;

export const CREATE_PEOPLE = gql`
  mutation createPersonPosition($input: CreatePersonPositionInput!) {
    createPersonPosition(createPersonPosition: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PEOPLE = gql`
  mutation updatePersonPosition($input: UpdatePersonPositionInput!) {
    updatePersonPosition(updatePersonPosition: $input) {
      id
      name
    }
  }
`;

export const REMOVE_PEOPLE = gql`
  mutation removePersonPosition($ids: [String!]!) {
    removePersonPosition(ids: $ids)
  }
`;

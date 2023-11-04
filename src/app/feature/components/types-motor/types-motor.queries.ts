import { gql } from 'apollo-angular';

export const GET_ALL_TYPES_MOTOR = gql`
  query getAllEngineType($page: PaginateDTO!) {
    getEngineType(paginationDto: $page) {
      count
      items {
        id
        name
        initials
      }
    }
  }
`;

export const CREATE_TYPES_MOTOR = gql`
  mutation createEngineType($input: CreateEngineTypeInput!) {
    createEngineType(createEngineType: $input) {
      id
      name
      initials
    }
  }
`;

export const UPDATE_TYPES_MOTOR = gql`
  mutation updateEngineType($input: UpdateEngineTypeInput!) {
    updateEngineType(updateEngineType: $input) {
      id
      name
      initials
    }
  }
`;

export const REMOVE_TYPES_MOTOR = gql`
  mutation remoreEngineType($ids: [String!]!) {
    removeEngineType(ids: $ids)
  }
`;

import { gql } from 'apollo-angular';

export const GET_ALL_LOW_COMPONENTS = gql`
  query getAllDowngradeComponent($page: PaginateDTO!) {
    getDowngradeComponent(paginationDto: $page) {
      count
      items {
        id
        name
        description
      }
    }
  }
`;

export const CREATE_LOW_COMPONENTS = gql`
  mutation createDowngradeComponent($input: CreateDowngradeComponentInput!) {
    createDowngradeComponent(createDowngradeComponent: $input) {
      id
      name
      description
    }
  }
`;

export const UPDATE_LOW_COMPONENTS = gql`
  mutation updateDowngradeComponent($input: UpdateDowngradeComponentInput!) {
    updateDowngradeComponent(updateDowngradeComponent: $input) {
      id
      name
      description
    }
  }
`;

export const REMOVE_LOW_COMPONENTS = gql`
  mutation removeDowngradeComponent($ids: [String!]!) {
    removeDowngradeComponent(ids: $ids)
  }
`;

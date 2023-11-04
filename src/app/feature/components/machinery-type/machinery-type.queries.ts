import { gql } from 'apollo-angular';

export const GET_ALL_MACHINERY_TYPES = gql`
  query getAllMachineryType($page: PaginateDTO!) {
    getMachineryType(paginationDto: $page) {
      count
      items {
        id
        name
      }
    }
  }
`;
// createMachineryType
export const CREATE_MACHINERY_TYPES = gql`
  mutation createMachineryType($input: CreateMachineryTypeInput!) {
    createMachineryType(createMachineryType: $input) {
      name
    }
  }
`;

export const UPDATE_MACHINERY_TYPES = gql`
  mutation updateMachineryType($input: UpdateMachineryTypeInput!) {
    updateMachineryType(updateMachinaryType: $input) {
      id
      name
    }
  }
`;

export const REMOVE_MACHINERY_TYPES = gql`
  mutation removeMachineryType($ids: [String!]!) {
    removeMachineryType(ids: $ids)
  }
`;

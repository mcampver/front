import { gql } from 'apollo-angular';

export const GET_ALL_EQ_GROUPS = gql`
  query getAllEquipmentGroup($page: PaginateDTO!) {
    getEquipmentGroup(paginationDto: $page) {
      count
      items {
        id
        code
        name
        initials
      }
    }
  }
`;

export const CREATE_EQ_GROUPS = gql`
  mutation createEquipmentGroup($input: CreateEquipmentGroupInput!) {
    createEquipmentGroup(createEquipmentGroup: $input) {
      id
      code
      name
      initials
    }
  }
`;

export const UPDATE_EQ_GROUPS = gql`
  mutation updateEquipmentGroup($input: UpdateEquipmentGroupInput!) {
    updateEquipmentGroup(updateEquipmentGroup: $input) {
      id
      code
      name
      initials
    }
  }
`;

export const REMOVE_EQ_GROUPS = gql`
  mutation removeEquipmentGroup($ids: [String!]!) {
    removeEquipmentGroup(ids: $ids)
  }
`;

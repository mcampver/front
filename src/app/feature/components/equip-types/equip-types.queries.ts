import { gql } from 'apollo-angular';

export const GET_ALL_EQUIPMENT_TYPE = gql`
  query getAllEquipmentType($page: PaginateDTO!) {
    getEquipmentType(paginationDto: $page) {
      count
      items {
        id
        name
        initials
        code
        equipmentGroup {
          id
          code
          name
          initials
        }
      }
    }
  }
`;

export const GET_ALL_EQUIPMENT_TYPE_WITHOUT_EQUIP_GROUP = gql`
  query getAllEquipmentType($page: PaginateDTO!) {
    getEquipmentType(paginationDto: $page) {
      count
      items {
        id
        name
        initials
        code
      }
    }
  }
`;

export const CREATE_EQUIP_TYPES = gql`
  mutation createEquipmentType($input: CreateEquipmentTypeInput!) {
    createEquipmentType(createEquipmentType: $input) {
      code
      initials
      name
    }
  }
`;

export const UPDATE_EQUIP_TYPES = gql`
  mutation updateEquipmentType($input: UpdateEquipmentTypeInput!) {
    updateEquipmentType(updateEquipmentType: $input) {
      id
      name
      code
      initials
    }
  }
`;

export const REMOVE_EQUIP_TYPES = gql`
  mutation removeEquipmentType($ids: [String!]!) {
    removeEquipmentType(ids: $ids)
  }
`;

export const GET_ALL_EQUIPMENT_GROUP = gql`
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

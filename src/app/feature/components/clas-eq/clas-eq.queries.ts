import { gql } from 'apollo-angular';

export const FIND_ALL_PAGINATION_EQUIMENT_CLASSIFIER = gql`
  query getEquipmentClassifier($page: PaginateDTO!) {
    getEquipmentClassifier(paginationDto: $page) {
      count
      items {
        id
        code
        country {
          id
          name
          code
        }
        brand {
          id
          name
        }
        model {
          id
          name
          code
        }
        equipmentType {
          id
          name
          initials
          code
        }
        machineryType {
          id
          name
          code
        }
      }
    }
  }
`;

export const FIND_ONE_BY_ID_EQUIPMENT_CLASSIFIER = gql`
  query findOne($id: String!) {
    findOne(id: $id) {
      id
      code
      country {
        id
        name
        code
      }
      brand {
        id
        name
      }
      model {
        id
        name
        code
        brand
      }
      equipmentType {
        id
        name
        initials
        code
        equipmentGroup
      }
      machinaryType {
        id
        name
      }
    }
  }
`;

export const CREATE_EQUIPMENT_CLASSIFIER = gql`
  mutation createEquipmentClassifier($input: CreateEquipmentClassifierInput!) {
    createEquipmentClassifier(createEquipmentClassifier: $input) {
      id
    }
  }
`;

export const UPDATE_EQUIPMENT_CLASSIFIER = gql`
  mutation updateEquipmentClassifier($input: UpdateEquipmentClassifierInput!) {
    updateEquipmentClassifier(updateEquipmentClassifier: $input) {
      id
    }
  }
`;

export const REMOVE_EQUIPMENT_CLASSIFIER = gql`
  mutation removeEquipment($ids: [String!]!) {
    removeEquipment(ids: $ids)
  }
`;

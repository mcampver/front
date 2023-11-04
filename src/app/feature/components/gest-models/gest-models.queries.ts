import { gql } from 'apollo-angular';

export const GET_ALL_MODELS = gql`
  query getAllModel($page: PaginateDTO!) {
    getModel(paginationDto: $page) {
      count
      items {
        id
        name
        code
        brand {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_MODELS_WITHOUT_BRAND = gql`
  query getAllModel($page: PaginateDTO!) {
    getModel(paginationDto: $page) {
      count
      items {
        id
        name
        code
      }
    }
  }
`;

export const GET_ALL_BRANDS = gql`
  query getAllBrand($page: PaginateDTO!) {
    getBrand(paginationDto: $page) {
      count
      items {
        id
        name
      }
    }
  }
`;

export const CREATE_MODEL = gql`
  mutation createModel($input: CreateModelInput!) {
    createModel(createModel: $input) {
      id
      name
      code
    }
  }
`;

export const UPDATE_MODEL = gql`
  mutation updateModel($input: UpdateModelInput!) {
    updateModel(updateModel: $input) {
      id
      name
    }
  }
`;

export const REMOVE_MODEL = gql`
  mutation removeModels($ids: [String!]!) {
    removeModel(ids: $ids)
  }
`;

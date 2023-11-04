import { gql } from 'apollo-angular';

export const GET_ALL_BRAND = gql`
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

export const CREATE_BRAND = gql`
  mutation createBrand($input: CreateBrandInput!) {
    createBrand(createBrand: $input) {
      id
      name
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation updateBrand($input: UpdateBrandInput!) {
    updateBrand(updateBrand: $input) {
      id
      name
    }
  }
`;

export const REMOVE_BRAND = gql`
  mutation deleteBrand($ids: [String!]!) {
    removeBrand(ids: $ids)
  }
`;

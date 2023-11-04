import { gql } from 'apollo-angular';

export const GET_ALL_TECH_STATES = gql`
  query getAllTechicalState($page: PaginateDTO!) {
    getTechnicalState(paginationDto: $page) {
      count
      items {
        id
        name
        initials
      }
    }
  }
`;

export const CREATE_TECH_STATES = gql`
  mutation createTechnicalState($input: CreateTechnicalStateInput!) {
    createTechnicalState(createTechnicalState: $input) {
      id
      name
      initials
    }
  }
`;

export const UPDATE_TECH_STATES = gql`
  mutation updateTechnicalState($input: UpdateTechnicalStateInput!) {
    updateTechnicalState(updateTechnicalState: $input) {
      id
      name
      initials
    }
  }
`;

export const REMOVE_TECH_STATES = gql`
  mutation removeTechnicalState($ids: [String!]!) {
    removeTechnicalState(ids: $ids)
  }
`;

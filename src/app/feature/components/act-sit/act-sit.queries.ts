import { gql } from 'apollo-angular';

export const GET_ALL_ACT_SIT = gql`
  query getAllCurrentSituation($page: PaginateDTO!) {
    getCurrentSituation(paginationDto: $page) {
      count
      items {
        id
        name
        initials
      }
    }
  }
`;

export const CREATE_ACT_SIT = gql`
  mutation createCurrentSituation($input: CreateCurrentSituationInput!) {
    createCurrentSituation(createCurrentSituation: $input) {
      id
      name
      initials
    }
  }
`;

export const UPDATE_ACT_SIT = gql`
  mutation updateCurrentSituation($input: UpdateCurrentSituationInput!) {
    updateCurrentSituation(updateCurrentSituation: $input) {
      id
      name
      initials
    }
  }
`;

export const REMOVE_ACT_SIT = gql`
  mutation removeCurrentSituation($ids: [String!]!) {
    removeCurrentSituation(ids: $ids)
  }
`;

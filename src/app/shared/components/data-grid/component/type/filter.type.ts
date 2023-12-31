export type TFilter =
  | 'CONTAINS'
  | 'NOT_CONTAINS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'EQUALS'
  | 'DISTINCT'
  | 'between'
  | 'MORE_THAN'
  | 'MORE_THAN_OR_EQUAL'
  | 'LESS_THAN'
  | 'LESS_THAN_OR_EQUAL'
  | 'IN'
  | 'NOT_IN'
  | 'IS';

export interface FilterCondition {
  [field: string]: {
    $in: (string | Date)[];
  };
}

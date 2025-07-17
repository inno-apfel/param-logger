export type User = {
  id: string;
  username: string;
  password_hash: string;
  tanks: Tank[];
};

export type Tank = {
  id: string;
  name: string;
  owner_id: string;
  parameters: Parameter[];
};

export type Parameter = {
  id: string;
  name: string;
  reference_value: number;
  unit_of_measure: string;
  tank_id: string;
  observations: Observation[];
};

export type Observation = {
  id: string;
  value: number;
  recorded_at: string;
  parameter_id: string;
};
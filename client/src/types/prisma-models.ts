import { type JSONContent } from "@tiptap/core";

export type User = {
  id: string;
  username: string;
  password_hash: string;
  avatar: string;
  tanks: Tank[];
};

export type Tank = {
  id: string;
  name: string;
  gallons: number;
  setup_date: string;
  banner: string;
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

export type Task = {
  id: string;
  message: number;
  deadline: string;
  completed: boolean;
  recur_interval_days: number;
  tank_id: string;
};

export type TankJournal = {
  id: string;
  content: JSONContent;
  tank_id: string;
  updated_at: string
};
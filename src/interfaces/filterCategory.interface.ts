import { TFilterOption } from "./filterOption.interface";

export type TFilterCategory = {
  id: number;
  name: string;
  options: Array<TFilterOption>;
  dummyIcon?: string;
};

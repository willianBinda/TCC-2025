import type { Log } from "ethers";

export type TypeEvento<T> = ({
  agrs: T;
  data: string;
  timestemp: number;
} & Log)[];

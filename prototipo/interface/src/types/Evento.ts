import type { EventLog } from "ethers";
import type { Log } from "ethers";

export type TypeEvento<T> = ({
  args: T;
} & Log &
  EventLog)[];

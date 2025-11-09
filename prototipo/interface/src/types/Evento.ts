import type { EventLog } from "ethers";
import type { Log } from "ethers";

export type TypeEvento<T> = ({
  args: T;
} & Log &
  EventLog)[];

export type TypeEventoListener<T> = {
  log: T;
} & Log &
  EventLog;

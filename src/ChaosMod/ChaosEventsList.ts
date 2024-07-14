import blocksGoBoom from "./Events/BlocksGoBoom";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import { TNTRun } from "./Events/TNTRun";
import { IChaosEvent } from "./IChaosEvent";

export const chaosEventsList: IChaosEvent[] = [
  blocksGoBoom,
  opeThereGoesGravity,
  TNTRun,
];

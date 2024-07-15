import allEffects from "./Events/allEffects";
import blocksGoBoom from "./Events/BlocksGoBoom";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import randomEffect from "./Events/RandomEffect";
import { stikSays } from "./Events/StikSays";
import { TNTRun } from "./Events/TNTRun";
import typeOrDieTrying from "./Events/typeOrDie";
import { IChaosEvent } from "./IChaosEvent";

export const chaosEventsList: IChaosEvent[] = [
  blocksGoBoom,
  opeThereGoesGravity,
  TNTRun,
  randomEffect,
  allEffects,
  typeOrDieTrying,
  stikSays
];

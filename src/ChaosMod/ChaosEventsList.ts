import allEffects from "./Events/allEffects";
import blocksGoBoom from "./Events/BlocksGoBoom";
import { herobrineStalker } from "./Events/HerobrineStalker";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import randomEffect from "./Events/RandomEffect";
import { rollForHeal } from "./Events/RollForHeal";
import { skatebording } from "./Events/Skateboarding";
import { stikSays } from "./Events/StikSays";
import { TNTRun } from "./Events/TNTRun";
import typeOrDieTrying from "./Events/typeOrDie";
import { zombieHorde } from "./Events/ZombieHorde";
import { IChaosEvent } from "./IChaosEvent";

export const chaosEventsList: IChaosEvent[] = [
  blocksGoBoom,
  opeThereGoesGravity,
  TNTRun,
  randomEffect,
  allEffects,
  typeOrDieTrying,
  stikSays,
  zombieHorde,
  rollForHeal,
  skatebording,
  herobrineStalker,
];

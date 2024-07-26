import allEffects from "./Events/allEffects";
import blocksGoBoom from "./Events/BlocksGoBoom";
import { gravityShift } from "./Events/GravityShift";
import { herobrineStalker } from "./Events/HerobrineStalker";
import { invisibleMobs } from "./Events/InvisibleMobs";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import randomEffect from "./Events/RandomEffect";
import { rollForHeal } from "./Events/RollForHeal";
import { rollForItem } from "./Events/RollForItem";
import { skatebording } from "./Events/Skateboarding";
import { stikSays } from "./Events/StikSays";
import { swapItems } from "./Events/SwapItems";
import { swapPositions } from "./Events/SwapPositions";
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
  rollForItem,
  skatebording,
  herobrineStalker,
  invisibleMobs,
  swapPositions,
  gravityShift,
  swapItems,
];

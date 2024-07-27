import allEffects from "./Events/AllEffects";
import blocksGoBoom from "./Events/BlocksGoBoom";
import { floorIsLava } from "./Events/FloorIsLava";
import { gravityShift } from "./Events/GravityShift";
import { herobrineStalker } from "./Events/HerobrineStalker";
import { invisibleMobs } from "./Events/InvisibleMobs";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import { randomEffect } from "./Events/RandomEffect";
import { redCoins } from "./Events/RedCoins";
import { rollForHeal } from "./Events/RollForHeal";
import { rollForItem } from "./Events/RollForItem";
import { skatebording } from "./Events/Skateboarding";
import { stikSays } from "./Events/StikSays";
import { swapItems } from "./Events/SwapItems";
import { swapPositions } from "./Events/SwapPositions";
import { TNTRun } from "./Events/TNTRun";
import { typeOrDieTrying } from "./Events/TypeOrDie";
import { zombieHorde } from "./Events/ZombieHorde";
import { IChaosEvent } from "./IChaosEvent";

export const chaosEventsList: IChaosEvent[] = [
  blocksGoBoom,
  floorIsLava,
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
  redCoins,
];

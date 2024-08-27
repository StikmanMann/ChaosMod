import { oneVsOne } from "./Events/1V1Arena";
import allEffects from "./Events/AllEffects";
import { arguing } from "./Events/Arguing";
import blocksGoBoom from "./Events/BlocksGoBoom";
import { floorIsLava } from "./Events/FloorIsLava";
import { gravityShift } from "./Events/GravityShift";
import { herobrineStalker } from "./Events/HerobrineStalker";
import { invisibleMobs } from "./Events/InvisibleMobs";
import { killAura } from "./Events/KillAura";
import { metoerShower } from "./Events/MeteorShower";
import { oneShot } from "./Events/OneShot";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import { payForItem } from "./Events/payForItem";
import { quickMaths } from "./Events/QuickMaths";
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
  allEffects,
  arguing,
  blocksGoBoom,
  floorIsLava,
  gravityShift,
  //herobrineStalker,
  invisibleMobs,
  opeThereGoesGravity,
  quickMaths,
  metoerShower,
  oneVsOne,
  randomEffect,
  redCoins,
  rollForHeal,
  rollForItem,
  skatebording,
  stikSays,
  swapItems,
  swapPositions,
  TNTRun,
  typeOrDieTrying,
  zombieHorde,
  oneShot,
  payForItem,
  killAura,
];

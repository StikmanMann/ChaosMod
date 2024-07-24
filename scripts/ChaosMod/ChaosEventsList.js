import allEffects from "./Events/allEffects";
import blocksGoBoom from "./Events/BlocksGoBoom";
import { herobrineStalker } from "./Events/HerobrineStalker";
import { invisibleMobs } from "./Events/InvisibleMobs";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import randomEffect from "./Events/RandomEffect";
import { rollForHeal } from "./Events/RollForHeal";
import { skatebording } from "./Events/Skateboarding";
import { stikSays } from "./Events/StikSays";
import { swapPositions } from "./Events/swapPositions";
import { TNTRun } from "./Events/TNTRun";
import typeOrDieTrying from "./Events/typeOrDie";
import { zombieHorde } from "./Events/ZombieHorde";
export const chaosEventsList = [
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
    invisibleMobs,
    swapPositions,
];

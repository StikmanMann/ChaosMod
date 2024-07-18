import allEffects from "./Events/allEffects";
import blocksGoBoom from "./Events/BlocksGoBoom";
import opeThereGoesGravity from "./Events/OpeThereGoesGravity";
import randomEffect from "./Events/RandomEffect";
import { rollForHeal } from "./Events/RollForHeal";
import { stikSays } from "./Events/StikSays";
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
];

import { world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { addActionbarMessage } from "hud";
const predicateJump = (player) => {
    return player.isJumping;
};
const predicateList = [
    {
        predicateInfo: "Keep jumping!",
        predicateFunc: predicateJump,
    },
];
let stikSaysCheck = true;
let currentPredicate = predicateList[Math.floor(Math.random() * predicateList.length)];
let ticksTillCheck = 50;
let ticksTillCheckMin = 30;
let ticksTillCheckMax = 100;
const showPlayerPredicateHud = (player) => {
    for (const player of GlobalVars.players) {
        addActionbarMessage({
            player: player,
            lifetime: 1,
            message: stikSaysCheck
                ? `Stik says ${currentPredicate.predicateInfo}`
                : currentPredicate.predicateInfo,
        });
    }
};
const tickFunc = () => {
    for (const player of GlobalVars.players) {
        showPlayerPredicateHud(player);
    }
    ticksTillCheck--;
    if (ticksTillCheck <= 0) {
        for (const player of GlobalVars.players) {
            if (currentPredicate.predicateFunc(player) == stikSaysCheck) {
                world.sendMessage(`${player.nameTag} succeded ${currentPredicate.predicateInfo}`);
            }
            else {
                world.sendMessage(`${player.nameTag} failed ${currentPredicate.predicateInfo}`);
                player.kill();
            }
        }
        ticksTillCheck =
            Math.floor(Math.random() * (ticksTillCheckMax - ticksTillCheckMin)) +
                ticksTillCheckMin;
        currentPredicate =
            predicateList[Math.floor(Math.random() * predicateList.length)];
        stikSaysCheck = Math.random() > 0.5 ? true : false;
    }
};
export const stikSays = {
    chaosEventId: "stikSays",
    chaosEventDisplayName: "Stik Says",
    chaosEventUniqueId: "-1",
    chaosEventTime: 500,
    onChaosStart: () => {
        ticksTillCheck = 50;
        stikSaysCheck = Math.random() > 0.5 ? true : false;
    },
    onChaosStop: () => { },
    onChaosTick: tickFunc,
};

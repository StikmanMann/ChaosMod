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
    addActionbarMessage({
        player: player,
        lifetime: 0,
        message: stikSaysCheck
            ? `Stik says ${currentPredicate.predicateInfo} in ${ticksTillCheck} ticks`
            : `${currentPredicate.predicateInfo} in ${ticksTillCheck} ticks`,
    });
};
const tickFunc = () => {
    for (const player of GlobalVars.players) {
        showPlayerPredicateHud(player);
    }
    ticksTillCheck--;
    if (ticksTillCheck <= 0) {
        for (const player of GlobalVars.players) {
            if (currentPredicate.predicateFunc(player) == stikSaysCheck) {
                //player.sendMessage(
                //`@${player.nameTag} succeded ${currentPredicate.predicateInfo}`
                //);
            }
            else {
                if (stikSaysCheck) {
                    world.sendMessage(`@${player.nameTag} failed ${currentPredicate.predicateInfo}`);
                }
                else {
                    world.sendMessage(`@${player.nameTag} I didnt say §aStik Says §r${currentPredicate.predicateInfo}`);
                }
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

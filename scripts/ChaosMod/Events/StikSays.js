import { system, world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { addActionbarMessage } from "hud";
import { VectorFunctions } from "staticScripts/vectorFunctions";
const predicateJump = (player) => {
    return player.isJumping;
};
const predicateInWater = (player) => {
    return player.isInWater;
};
const predicateTouchGrass = (player) => {
    return (player.dimension.getBlock(VectorFunctions.addVector(player.location, { x: 0, y: -1, z: 0 })).typeId == "minecraft:grass_block");
};
const predicateList = [
    {
        predicateInfo: "Keep jumping!",
        predicateFunc: predicateJump,
        minimumTicks: 50,
        maximumTicks: 100,
    },
    {
        predicateInfo: "Get in water!",
        predicateFunc: predicateInWater,
        minimumTicks: 100,
        maximumTicks: 150,
    },
    {
        predicateInfo: "Touch grass!",
        predicateFunc: predicateTouchGrass,
        minimumTicks: 100,
        maximumTicks: 150,
    },
];
let stikSaysCheck = true;
let currentPredicate = predicateList[Math.floor(Math.random() * predicateList.length)];
let ticksTillCheck = 150;
const showPlayerPredicateHud = (player) => {
    addActionbarMessage({
        player: player,
        lifetime: 1,
        message: stikSaysCheck
            ? `Stik says ${currentPredicate.predicateInfo} in ${ticksTillCheck} ticks`
            : `${currentPredicate.predicateInfo} in ${ticksTillCheck} ticks`,
    });
};
const tickFunc = () => {
    if (system.currentTick % 1 != 0) {
        return;
    }
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
        currentPredicate =
            predicateList[Math.floor(Math.random() * predicateList.length)];
        ticksTillCheck = Math.floor(Math.random() *
            (currentPredicate.maximumTicks - currentPredicate.minimumTicks) +
            currentPredicate.minimumTicks);
        stikSaysCheck = Math.random() > 0.5 ? true : false;
    }
};
export const stikSays = {
    chaosEventId: "stikSays",
    chaosEventDisplayName: "Stik Says",
    chaosEventUniqueId: "-1",
    chaosEventTime: 500,
    onChaosStart: () => {
        ticksTillCheck = 150;
        stikSaysCheck = Math.random() > 0.5 ? true : false;
    },
    onChaosStop: () => { },
    onChaosTick: tickFunc,
};

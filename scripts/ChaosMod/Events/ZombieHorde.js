import { system, world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";
/**This number will be squared */
const zombieAmountLength = 5;
const zombieHordeStart = () => {
    world.sendMessage(`§4The zombies are coming!`);
};
const zombieDelay = 10;
const zombieSpread = 50;
const minimumDistance = 5;
const zombieHordeTick = () => {
    if (system.currentTick % zombieDelay != 0)
        return;
    for (const player of GlobalVars.players) {
        let xOffset = Math.random() * zombieSpread - zombieSpread / 2;
        if (xOffset < minimumDistance && xOffset > -minimumDistance) {
            xOffset = minimumDistance;
        }
        let zOffset = Math.random() * zombieSpread - zombieSpread / 2;
        if (zOffset < minimumDistance && zOffset > -minimumDistance) {
            zOffset = minimumDistance;
        }
        const spawnLocation = VectorFunctions.addVector(player.location, {
            x: xOffset,
            y: 5,
            z: zOffset,
        });
        const zombie = player.dimension.spawnEntity("minecraft:zombie", spawnLocation);
        zombie.addEffect("fire_resistance", 2000, { showParticles: false });
    }
};
export const zombieHorde = {
    chaosEventId: "zombieHorde",
    chaosEventDisplayName: "The zombies are coming",
    chaosEventTime: 1200,
    chaosEventUniqueId: "-1",
    onChaosStart: zombieHordeStart,
    onChaosStop: () => { },
    onChaosTick: zombieHordeTick,
};

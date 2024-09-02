import { system } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";
const killAuraTick = () => {
    if (system.currentTick % 10 != 0) {
        return;
    }
    const allEntities = GlobalVars.getAllEntities({
        excludeTypes: ["minecraft:player"],
    });
    for (const player of GlobalVars.players) {
        for (const entity of allEntities) {
            const distance = VectorFunctions.vectorLength(VectorFunctions.subtractVector(player.location, entity.location));
            if (distance < 10) {
                entity.applyDamage(5);
            }
        }
    }
};
export const killAura = {
    chaosEventId: "killAura",
    chaosEventDisplayName: "Kill Aura",
    chaosEventUniqueId: "-1",
    chaosEventTime: 2000,
    onChaosStart: () => { },
    onChaosStop: () => { },
    onChaosTick: killAuraTick,
};

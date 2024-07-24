import { world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
const gravityStart = () => {
    world.sendMessage("Snap back to reality, ope, there goes gravity!");
    const entities = GlobalVars.overworld
        .getEntities()
        .concat(GlobalVars.nether.getEntities())
        .concat(GlobalVars.theEnd.getEntities());
    for (const entity of entities) {
        entity.addEffect("levitation", 100, { showParticles: false, amplifier: 3 });
    }
};
const opeThereGoesGravity = {
    chaosEventId: "opeThereGoesGravity",
    chaosEventDisplayName: "Ope There Goes Gravity",
    chaosEventUniqueId: "-1",
    chaosEventTime: 100,
    onChaosStart: gravityStart,
    onChaosStop: () => { },
    onChaosTick: () => { },
};
export default opeThereGoesGravity;

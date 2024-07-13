import { world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
const gravityStart = () => {
    world.sendMessage("Snap back to reality, ope, there goes gravity!");
    for (const player of GlobalVars.players) {
        player.addEffect("levitation", 100, { showParticles: false, amplifier: 3 });
    }
};
const opeThereGoesGravity = {
    chaosEventId: "opeThereGoesGravity",
    chaosEventDisplayName: "opeThereGoesGravity",
    chaosEventUniqueId: "-1",
    chaosEventTime: 100,
    onChaosStart: gravityStart,
    onChaosStop: () => { },
    onChaosTick: () => { },
};
export default opeThereGoesGravity;

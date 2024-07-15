import { world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
const givePlayerRandomEffect = () => {
    const effects = ["levitation", "poison", "wither", "instant_healing", "regeneration", "speed", "jump_boost", "blindness", "darkness", "haste", "hunger", "saturation", "infested", "mining_fatigue", "nausea", "oozing", "weakness"];
    const idx = Math.floor(Math.random() * (16 - 0) + 0);
    const currEffect = effects[idx];
    for (const player of GlobalVars.players) {
        world.sendMessage(String(currEffect));
        world.sendMessage(String(idx));
        player.addEffect(String(currEffect), 100, { showParticles: false, amplifier: 2 });
    }
};
const randomEffect = {
    chaosEventId: "randomEffect",
    chaosEventDisplayName: "Random Effect",
    chaosEventUniqueId: "-1",
    chaosEventTime: 100,
    onChaosStart: givePlayerRandomEffect,
    onChaosStop: () => { },
    onChaosTick: () => { },
};
export default randomEffect;

import { GlobalVars } from "globalVars";
const givePlayerAllEffects = () => {
    const effects = ["levitation", "poison", "wither", "regeneration", "speed", "jump_boost", "blindness", "darkness", "haste", "hunger", "saturation", "infested", "mining_fatigue", "nausea", "oozing", "weakness"];
    for (const player of GlobalVars.players) {
        //world.sendMessage("Everyone now has "+String(currEffect)+"!")
        for (var i = 0; i < effects.length; i++) {
            player.addEffect(String(effects[i]), 200, { showParticles: false, amplifier: 2 });
        }
    }
};
const allEffects = {
    chaosEventId: "allEffects",
    chaosEventDisplayName: "How did we get here?",
    chaosEventUniqueId: "-1",
    chaosEventTime: 200,
    onChaosStart: givePlayerAllEffects,
    onChaosStop: () => { },
    onChaosTick: () => { },
};
export default allEffects;

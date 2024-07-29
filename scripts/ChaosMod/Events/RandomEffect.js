import { GlobalVars } from "globalVars";
const givePlayerRandomEffect = () => {
    const effects = [
        "levitation",
        "poison",
        "wither",
        "instant_health",
        "regeneration",
        "speed",
        "jump_boost",
        "blindness",
        "darkness",
        "haste",
        "hunger",
        "saturation",
        "infested",
        "mining_fatigue",
        "nausea",
        "oozing",
        "weakness",
    ];
    for (const entity of GlobalVars.getAllEntities()) {
        try {
            const currEffect = effects[Math.floor(Math.random() * (16 - 0) + 0)];
            //world.sendMessage("Everyone now has "+String(currEffect)+"!")
            entity.addEffect(String(currEffect), 600, {
                showParticles: false,
                amplifier: 2,
            });
        }
        catch { }
    }
};
export const randomEffect = {
    chaosEventId: "randomEffect",
    chaosEventDisplayName: "Random Effect",
    chaosEventUniqueId: "-1",
    chaosEventTime: 600,
    timeTillNextEventOverride: 300,
    onChaosStart: givePlayerRandomEffect,
    onChaosStop: () => { },
    onChaosTick: () => { },
};

import { GlobalVars } from "globalVars";
const eventDuration = 1000;
const oneShotStart = () => {
    for (const player of GlobalVars.players) {
        player.addEffect("strength", eventDuration, {
            amplifier: 200,
            showParticles: false,
        });
    }
};
export const oneShot = {
    chaosEventId: "OneShot",
    chaosEventDisplayName: "One Shot",
    chaosEventUniqueId: "OneShot",
    chaosEventTime: 0,
    onChaosStart: oneShotStart,
    onChaosStop: () => { },
    onChaosTick: () => { },
};

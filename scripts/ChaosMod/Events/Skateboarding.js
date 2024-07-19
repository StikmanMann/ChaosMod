import { GlobalVars } from "globalVars";
const skateboardingTick = () => {
    for (const player of GlobalVars.players) {
        //Logger.warn(`${player.getRotation().y}`, "Skateboarding");
        const playerRotation = player.getRotation();
        player.applyKnockback(Math.sin(playerRotation.y * (Math.PI / 180) * -1), Math.cos(playerRotation.y * (Math.PI / 180) * -1), 1, -0.25);
    }
};
export const skatebording = {
    chaosEventId: "skateboarding",
    chaosEventDisplayName: "Skateboarding",
    chaosEventUniqueId: "-1",
    chaosEventTime: 500,
    onChaosStart: () => { },
    onChaosStop: () => { },
    onChaosTick: skateboardingTick,
};

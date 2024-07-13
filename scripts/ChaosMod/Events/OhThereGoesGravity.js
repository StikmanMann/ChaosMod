import { world } from "@minecraft/server";
const gravityStart = () => {
    world.sendMessage("Snap back to reality, ope, there goes gravity!");
};
const blocksGoBoom = {
    chaosEventId: "blocksGoBoom",
    chaosEventDisplayName: "Blocks Go Boom",
    chaosEventUniqueId: "-1",
    chaosEventTime: 600,
    onChaosStart: gravityStart,
    onChaosStop: () => { },
    onChaosTick: () => { },
};
export default blocksGoBoom;

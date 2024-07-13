import { world } from "@minecraft/server";
import { Logger } from "staticScripts/Logger";
const blockBoomEvent = (event) => {
    event.dimension.createExplosion(event.block.location, 5, {});
};
const blocksGoBoomStart = () => {
    world.sendMessage("Blocks go boom!");
    world.afterEvents.playerBreakBlock.subscribe(blockBoomEvent);
};
const blocksGoBoomStop = () => {
    world.sendMessage("Blocks stop go boom");
    world.afterEvents.playerBreakBlock.unsubscribe(blockBoomEvent);
    Logger.warn("Blocks stop go boom");
};
const blocksGoBoom = {
    chaosEventId: "blocksGoBoom",
    chaosEventDisplayName: "Blocks Go Boom",
    chaosEventUniqueId: "-1",
    chaosEventTime: 600,
    onChaosStart: blocksGoBoomStart,
    onChaosStop: blocksGoBoomStop,
    onChaosTick: () => { },
};
export default blocksGoBoom;

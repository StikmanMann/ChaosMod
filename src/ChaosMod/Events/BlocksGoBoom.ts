import { world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { Logger } from "staticScripts/Logger";

const blocksGoBoomStart = () => {
  world.sendMessage("Blocks go boom");
};

const blocksGoBoomStop = () => {
  world.sendMessage("Blocks stop go boom");
  Logger.warn("Blocks stop go boom");
};

const blocksGoBoom: IChaosEvent = {
  chaosEventId: "blocksGoBoom",
  chaosEventDisplayName: "Blocks Go Boom",

  chaosEventUniqueId: "-1",

  chaosEventTime: 200,

  onChaosStart: blocksGoBoomStart,
  onChaosStop: blocksGoBoomStop,
  onChaosTick: () => {},
};

export default blocksGoBoom;

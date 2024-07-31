import { BlockPermutation, system } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";

const placeTNT = () => {
  if (system.currentTick % 2 != 0) {
    return;
  }

  for (const player of GlobalVars.players) {
    if (!player.isOnGround) continue;
    player.dimension.setBlockPermutation(
      VectorFunctions.addVector(player.location, { x: 0, y: 0, z: 0 }),
      BlockPermutation.resolve("minecraft:wooden_pressure_plate")
    );
    player.dimension.setBlockPermutation(
      VectorFunctions.addVector(player.location, { x: 0, y: -1, z: 0 }),
      BlockPermutation.resolve("minecraft:tnt")
    );
  }
};

const TNTTick = () => {
  placeTNT();
};

export const TNTRun: IChaosEvent = {
  chaosEventId: "tNTRun",
  chaosEventDisplayName: "TNT Run",
  chaosEventUniqueId: "-1",
  chaosEventTime: 300,
  onChaosStart: () => {},
  onChaosStop: () => {},
  onChaosTick: TNTTick,
};

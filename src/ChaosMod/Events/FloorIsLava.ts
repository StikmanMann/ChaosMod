import { world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";

const groundBlocks: Set<string> = new Set([
  "minecraft:dirt",
  "minecraft:podzol",
  "minecraft:grass",
  "minecraft:sand",
  "minecraft:gravel",
  "minecraft:clay",
  "minecraft:mycelium",
  "minecraft:stone",
  "minecraft:stone_bricks",
  "minecraft:netherrack",
  "minecraft:end_stone",
  "minecraft:grass_block",
]);

const onLavaTick = () => {
  for (const player of GlobalVars.players) {
    if (!player.isOnGround) {
      continue;
    }
    const block = player.dimension.getBlock(
      VectorFunctions.addVector(player.location, { x: 0, y: -1, z: 0 })
    );
    if (groundBlocks.has(block.typeId)) {
      player.applyDamage(1);
    }
  }
};

export const floorIsLava: IChaosEvent = {
  chaosEventId: "FloorIsLava",
  chaosEventDisplayName: "The Floor is lava",
  chaosEventUniqueId: "-1",
  chaosEventTime: 1800,

  onChaosStart: () => {},
  onChaosStop: () => {},
  onChaosTick: onLavaTick,
};

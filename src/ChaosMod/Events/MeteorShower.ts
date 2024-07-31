import { Entity, system, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { LinkedList } from "dataTypes/linkedList";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";

const meteors: LinkedList<Entity> = new LinkedList<Entity>();

const zombieDelay = 10;
const zombieSpread = 50;
const minimumDistance = 5;

const meteorShowerTick = () => {
  for (const meteor of GlobalVars.getAllEntities({ type: "chaos:meteor" })) {
    try {
      meteor.clearVelocity();
      meteor.applyImpulse({ x: 0, y: -0.5, z: 0 });
      const blockBelow = meteor.dimension.getBlock(
        VectorFunctions.addVector(meteor.location, { x: 0, y: -1, z: 0 })
      );
      if (blockBelow.typeId != "minecraft:air") {
        meteor.dimension.createExplosion(meteor.location, 3, {
          causesFire: true,
        });
        meteor.kill();
      }
    } catch {
      continue;
    }
  }

  if (system.currentTick % zombieDelay != 0) return;

  for (const player of GlobalVars.players) {
    let xOffset = Math.random() * zombieSpread - zombieSpread / 2;

    let zOffset = Math.random() * zombieSpread - zombieSpread / 2;

    const spawnLocation = VectorFunctions.addVector(player.location, {
      x: xOffset,
      y: 30,
      z: zOffset,
    });
    const meteor = player.dimension.spawnEntity("chaos:meteor", spawnLocation);

    meteors.append(meteor);
  }
};

export const metoerShower: IChaosEvent = {
  chaosEventDisplayName: "Meteor Shower",
  chaosEventId: "meteorShower",
  chaosEventUniqueId: "-1",
  chaosEventTime: 1200,
  onChaosStart: () => {},
  onChaosStop: () => {},
  onChaosTick: meteorShowerTick,
};

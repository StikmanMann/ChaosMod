import { EasingType, Player, system, Vector3, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { Logger } from "staticScripts/Logger";
import { VectorFunctions } from "staticScripts/vectorFunctions";
import { workerData } from "worker_threads";

const randomDistances: Vector3[] = [
  { x: 30, y: 0, z: 0 },
  { x: 0, y: 0, z: 30 },
  { x: -30, y: 0, z: 0 },
  { x: 0, y: 0, z: -30 },
];

let randomStartIndex = Math.floor(Math.random() * randomDistances.length);

const calculateValidHerobrinePosition = (player: Player): Vector3 | null => {
  const playerPos = player.location;

  for (let i = 0; i < randomDistances.length; i++) {
    const randomDistance = randomDistances[i];

    for (let yOffset = 0; yOffset <= 3; yOffset++) {
      randomDistance.y = yOffset;
      const herobrinePos = VectorFunctions.addVector(playerPos, randomDistance);
      player.dimension.spawnParticle("minecraft:totem_manual", herobrinePos);

      if (player.dimension.getBlock(herobrinePos).typeId == "minecraft:air") {
        return VectorFunctions.addVector(herobrinePos, { x: 0, y: 2, z: 0 });
      }
    }
  }
  return null;
};

const herobrineStart = () => {
  world.sendMessage(`§eHerobrine has joined the world`);

  for (const player of GlobalVars.players) {
    const herobrinePos = calculateValidHerobrinePosition(player);
    if (herobrinePos == null) {
      continue;
    }
    Logger.warn(`Herobrine Position: ${herobrinePos}`);
    player.camera.setCamera("minecraft:free", {
      location: herobrinePos,
      facingEntity: player,
    });
  }
};

const herobrineTick = () => {
  if (system.currentTick % 2 != 0) {
    return;
  }
  if (system.currentTick % 50 == 0) {
    randomStartIndex = Math.floor(Math.random() * randomDistances.length);
  }
  for (const player of GlobalVars.players) {
    const herobrinePos = calculateValidHerobrinePosition(player);
    if (herobrinePos == null) {
      continue;
    }
    Logger.warn(`Herobrine Position: ${herobrinePos}`);
    player.camera.setCamera("minecraft:free", {
      location: herobrinePos,
      facingEntity: player,
      easeOptions: { easeTime: 0.1, easeType: EasingType.InCubic },
    });
  }
};

const herobrineStop = () => {
  for (const player of GlobalVars.players) {
    player.camera.clear();
  }
  world.sendMessage(`§eHerobrine has left the world`);
};

export const herobrineStalker: IChaosEvent = {
  chaosEventId: "herobrineStalker",
  chaosEventDisplayName: "Herobrine Stalker",

  chaosEventTime: 400,
  chaosEventUniqueId: "-1",
  onChaosStart: herobrineStart,
  onChaosStop: herobrineStop,
  onChaosTick: herobrineTick,
};

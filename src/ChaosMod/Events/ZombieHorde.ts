import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";

/**This number will be squared */
const zombieAmountLength: number = 5;

const zombieHordeStart = () => {
  for (const player of GlobalVars.players) {
    const offsetSpawnLocation = VectorFunctions.addVector(player.location, {
      x: 0,
      y: 5,
      z: 0,
    });

    let halfLength = Math.floor(zombieAmountLength / 2);
    for (let xOffset = -halfLength; xOffset <= halfLength; xOffset++) {
      for (let zOffset = -halfLength; zOffset <= halfLength; zOffset++) {
        player.dimension.spawnEntity(
          "zombie",
          VectorFunctions.addVector(offsetSpawnLocation, {
            x: xOffset,
            y: 0,
            z: zOffset,
          })
        );
      }
    }
  }
};

export const zombieHorde: IChaosEvent = {
  chaosEventId: "zombieHorde",
  chaosEventDisplayName: "The zombies are coming",

  chaosEventTime: 0,

  chaosEventUniqueId: "-1",

  onChaosStart: zombieHordeStart,
  onChaosStop: () => {},
  onChaosTick: () => {},
};

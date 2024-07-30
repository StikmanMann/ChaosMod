import { ItemStack, Player, Vector3, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { VectorFunctions } from "staticScripts/vectorFunctions";

const leitem = new ItemStack("minecraft:red_dye", 1);
leitem.nameTag = "§4Red Coin";

const findRedCoinPosition = (player: Player): Vector3[] | null => {
  let positions = new Array<Vector3>(8);
  let currentIndex = 0;
  const rot = player.getRotation();
  while (currentIndex < 8) {
    const forwardVector = VectorFunctions.getForwardVectorFromRotationXY(
      0,
      rot.y + currentIndex * (360 / 8)
    );
    for (let distance = 10; distance <= 50; distance++) {
      const behindVector = VectorFunctions.multiplyVector(
        forwardVector,
        -distance
      );
      for (let yOffset = -10; yOffset <= 10; yOffset++) {
        let possiblePos = VectorFunctions.addVector(
          VectorFunctions.addVector(player.location, behindVector),
          { x: 0, y: yOffset, z: 0 }
        );
        const block = player.dimension.getBlock(possiblePos);
        if (
          block.typeId == "minecraft:air" &&
          block.below(1).typeId != "minecraft:air"
        ) {
          positions[currentIndex] = possiblePos;
          distance = 51;
          break;
        }
      }
    }
    if (positions[currentIndex] == null) {
      positions[currentIndex] = player.location;
    }
    currentIndex++;
  }
  return positions;
};

const redCoinsStart = () => {
  for (const player of GlobalVars.players) {
    const positions = findRedCoinPosition(player);
    if (positions != null) {
      for (let i = 0; i < positions.length; i++) {
        player.dimension.spawnItem(leitem, positions[i]);
      }
    }
  }
};

const redCoinsEnd = () => {
  for (const player of GlobalVars.players) {
    let hasRedCoins = false;
    const playerInventory = player.getComponent("inventory").container;
    for (let i = 0; i < playerInventory.size; i++) {
      const item = playerInventory.getItem(i);
      if (item?.typeId == leitem.typeId) {
        if (item.amount >= 8) {
          hasRedCoins = true;
          player.sendMessage("Congratulations you collected the 8 red coins");
        }
        playerInventory.setItem(i, undefined);
        break;
      }
    }
    if (!hasRedCoins) {
      player.kill();
      world.sendMessage(
        `§4${player.nameTag}§r was killed for not collecting the 8 red coins`
      );
    }
  }
};

export const redCoins: IChaosEvent = {
  chaosEventId: "redCoins",
  chaosEventDisplayName: "§4Pick up the 8 red coins",
  chaosEventUniqueId: "-1",
  chaosEventTime: 1200,

  onChaosStart: redCoinsStart,
  onChaosStop: redCoinsEnd,
  onChaosTick: () => {},
};

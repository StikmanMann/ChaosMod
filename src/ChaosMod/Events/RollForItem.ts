import { EntityDamageCause, ItemStack, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { workerData } from "worker_threads";
const rollForItemstart = () => {
  world.sendMessage(`Rolling for Item...`);
};

const badItems = ["minecraft:dirt_block"];

const Items = ["minecraft:iron_axe"];

const goodItems = ["minecraft:nethterite_axe"];

const chooseRandomBadItem = (): string => {
  return badItems[Math.floor(Math.random() * badItems.length)];
};

const chooseRandomItem = (): string => {
  return Items[Math.floor(Math.random() * Items.length)];
};

const chooseRandomGoodItem = (): string => {
  return goodItems[Math.floor(Math.random() * goodItems.length)];
};

const rollForItemEnd = () => {
  for (const player of GlobalVars.players) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const playerInventory = player.getComponent("inventory").container;

    switch (roll) {
      case 1:
        world.sendMessage(
          `@${player.nameTag} was out of luck on this one :(, they rolled a 1`
        );
        playerInventory.clearAll();
        player.kill();
        break;
      case 2:
      case 3:
      case 4:
        playerInventory.setItem(
          Math.floor(Math.random() * playerInventory.size),
          new ItemStack("minecraft:air")
        );
        player.sendMessage(`You rolled a ${roll}`);
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        player.sendMessage(`You rolled a ${roll}, how uneventfull!`);
        break;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        playerInventory.setItem(
          Math.floor(Math.random() * playerInventory.size),
          new ItemStack(chooseRandomBadItem())
        );
        player.sendMessage(
          `You rolled a ${roll}, so were giving you an random trash item!`
        );
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        playerInventory.setItem(
          Math.floor(Math.random() * playerInventory.size),
          new ItemStack(chooseRandomItem())
        );
        player.sendMessage(`You rolled a ${roll}, so were giving you an Item!`);
        break;
      case 20:
        playerInventory.setItem(
          Math.floor(Math.random() * playerInventory.size),
          new ItemStack(chooseRandomGoodItem())
        );
        player.sendMessage(
          `You rolled a ${roll}, so were giving you an great Item!`
        );
    }
  }
};

export const rollForItem: IChaosEvent = {
  chaosEventId: "rollForItem",
  chaosEventDisplayName: "Roll For Item",
  chaosEventUniqueId: "-1",
  chaosEventTime: 50,

  timeTillNextEventOverride: 100,

  onChaosStart: rollForItemstart,
  onChaosStop: rollForItemEnd,
  onChaosTick: () => {},
};

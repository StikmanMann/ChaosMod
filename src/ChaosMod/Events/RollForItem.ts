import {
  EntityDamageCause,
  ItemStack,
  ItemType,
  ItemTypes,
  world,
} from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { Logger } from "staticScripts/Logger";
import { workerData } from "worker_threads";
const rollForItemstart = () => {
  world.sendMessage(`Rolling for Item...`);
};

//list of bad items
const badItems = [
  "minecraft:dirt",
  "minecraft:pufferfish",
  "minecraft:stick",
  "minecraft:rotten_flesh",
  "minecraft:bone_meal",
  "minecraft:kelp",
  "minecraft:poisonous_potato",
  "minecraft:paper",
  "minecraft:coal",
  "minecraft:flint",
];

//list of normal items
const Items = [
  "minecraft:iron_axe",
  "minecraft:iron_sword",
  "minecraft:iron_helmet",
  "minecraft:iron_chestplate",
  "minecraft:iron_leggings",
  "minecraft:iron_boots",
  "minecraft:golden_carrot",
  "minecraft:ender_pearl",
];

//list of good items
const goodItems = [
  "minecraft:nethterite_axe",
  "minecraft:nethterite_sword",
  "minecraft:netherite_helmet",
  "minecraft:netherite_chestplate",
  "minecraft:netherite_leggings",
  "minecraft:netherite_boots",
  "minecraft:elytra",
  "minecraft:enchanted_golden_apple",
  "minecraft:totem_of_undying",
];

//choosing the random items
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

    //finding empty and full inventory
    const emptyinventory: number[] = [];
    const fullinventory: number[] = [];
    for (let i = 0; i < playerInventory.size; i++) {
      const item = playerInventory.getItem(i);
      if (item == undefined) {
        emptyinventory.push(i);
      } else {
        fullinventory.push(i);
      }
    }

    //rolling an d20 and giving items accordingly
    switch (roll) {
      case 1:
        world.sendMessage(
          `@${player.nameTag} was out of luck on this one :(, they rolled a 1`
        );
        player.sendMessage(
          `You rolled a ${roll}, so were taking all your items and killing you`
        );
        playerInventory.clearAll();
        player.kill();
        break;
      case 2:
      case 3:
      case 4:
        if (fullinventory.length > 0) {
          playerInventory.setItem(
            fullinventory[Math.floor(Math.random() * fullinventory.length)],
            undefined
          );
          player.sendMessage(`You rolled a ${roll}, so were taking an item`);
        } else {
          player.sendMessage(
            `You rolled a ${roll}, but you don't have any items to take!`
          );
        }
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
        if (emptyinventory.length > 0) {
          playerInventory.setItem(
            emptyinventory[Math.floor(Math.random() * emptyinventory.length)],
            new ItemStack(chooseRandomBadItem())
          );
          player.sendMessage(
            `You rolled a ${roll}, so were giving you an random trash item!`
          );
        } else {
          player.sendMessage(
            `You rolled a ${roll}, but your Inventory is full!`
          );
        }
        break;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        if (emptyinventory.length > 0) {
          playerInventory.setItem(
            emptyinventory[Math.floor(Math.random() * emptyinventory.length)],
            new ItemStack(chooseRandomItem())
          );
          player.sendMessage(
            `You rolled a ${roll}, so were giving you an Item!`
          );
        } else {
          player.sendMessage(
            `You rolled a ${roll}, but your Inventory is full!`
          );
        }
        break;
      case 20:
        if (emptyinventory.length > 0) {
          playerInventory.setItem(
            emptyinventory[Math.floor(Math.random() * emptyinventory.length)],
            new ItemStack(chooseRandomGoodItem())
          );
          player.sendMessage(
            `You rolled a ${roll}, so were giving you an great Item!`
          );
        } else {
          player.sendMessage(
            `You rolled a ${roll}, but your Inventory is full!`
          );
        }
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

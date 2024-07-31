import { ItemStack } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { askForConfirmation } from "hud";

const sword = new ItemStack("minecraft:diamond_sword", 1);

const payForItemStart = () => {
  for (const player of GlobalVars.players) {
    askForConfirmation(player, "Pay for item with your soul?").then((value) => {
      if (!value) {
        return;
      }
      sword.setLore([`Contains the Soul of ${player.nameTag}`]);
      const component = player.getComponent("inventory");
      for (let i = 0; i < component.container.size; i++) {
        const item = component.container.getItem(i);
        if (!item) {
          component.container.setItem(i, sword);
          return;
        }
      }
    });
  }
};

export const payForItem: IChaosEvent = {
  chaosEventId: "payForItem",
  chaosEventDisplayName: "Pay For Item",
  chaosEventUniqueId: "-1",
  chaosEventTime: 0,
  onChaosStart: payForItemStart,
  onChaosStop: () => {},
  onChaosTick: () => {},
};

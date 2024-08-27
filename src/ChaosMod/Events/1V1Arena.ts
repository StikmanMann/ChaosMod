import { Vector3, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";

let locations: Vector3[] = [];
const oneVOneStart = () => {
  const players = GlobalVars.players;
  locations = new Array(players.length);
  world.sendMessage(
    `§a1v1 Arena start now, kill your oppenent first to get back to your original location!`
  );
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    locations[i] = player.location;
    if (i == players.length - 1 && players.length % 2 == 1) {
      player.sendMessage("Looks like you got lucky this time...");
      break;
    }
  }
};

export const oneVsOne: IChaosEvent = {
  chaosEventId: "1v1Arena",
  chaosEventDisplayName: "1v1 Arena",
  chaosEventUniqueId: "1v1Arena",
  chaosEventTime: 10000,
  onChaosStart: oneVOneStart,
};

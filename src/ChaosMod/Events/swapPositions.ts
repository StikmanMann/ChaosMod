import { system, Vector3, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const swapPositionsTick = () => {
  if (system.currentTick % 20 != 0) {
  }
  let locations: Array<Vector3> = GlobalVars.players.map((player) => {
    return player.location;
  });
  locations = shuffleArray(locations);

  for (let i = 0; i < GlobalVars.players.length; i++) {
    const player = GlobalVars.players[i];
    player.teleport(locations[i]);
  }
};

export const swapPositions: IChaosEvent = {
  chaosEventId: "swapPositions",
  chaosEventDisplayName: "Swap Positions",
  chaosEventUniqueId: "-1",
  chaosEventTime: 300,
  onChaosStart: swapPositionsTick,
  onChaosStop: () => {},
  onChaosTick: () => {},
};

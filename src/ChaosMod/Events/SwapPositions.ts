import { system, Vector3, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    // Pick a remaining element
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function shuffleArrayEnsureChange<T>(array: Array<T>): Array<T> {
  if (array.length <= 1) {
    return array;
  }
  let shuffledArray = [...array];
  let isSame = true;

  while (isSame) {
    shuffledArray = shuffleArray(shuffledArray);
    isSame = array.every((value, index) => value === shuffledArray[index]);
  }

  return shuffledArray;
}

const swapPositionsTick = () => {
  if (system.currentTick % 50 != 0) {
    return;
  }
  let locations: Array<Vector3> = GlobalVars.players.map((player) => {
    return player.location;
  });

  locations = shuffleArrayEnsureChange(locations);
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
  onChaosStart: () => {},
  onChaosStop: () => {},
  onChaosTick: swapPositionsTick,
};

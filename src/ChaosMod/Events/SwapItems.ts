import { Container, Player, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { AwaitFunctions } from "staticScripts/awaitFunctions";

function shuffleArray(array: Array<any>) {
  let currentIndex = array.length;
  let randomIndex;

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

const eventTime = 300;
const swapItemBetweenPlayers = async (
  container: Container,
  otherContainer: Container
) => {
  for (let j = 0; j < container.size; j++) {
    await AwaitFunctions.waitTicks(Math.floor(eventTime / container.size));
    container.swapItems(j, j, otherContainer);
    world.sendMessage(`Swapping item ${j} of ${container.size}`);
  }
};

const swapItemStart = async () => {
  let shuffledPlayers = shuffleArray(GlobalVars.players);

  let alreadyShuffled: Set<Player> = new Set();

  for (let i = 0; i < GlobalVars.players.length; i++) {
    const player = GlobalVars.players[i];
    const otherPlayer = shuffledPlayers[i];

    //Idk if this chceck is correct for double swaps, which leads to not being swapped at all ( swapping twice with 2 other players works tho)
    if (alreadyShuffled.has(player)) {
      continue;
    }

    alreadyShuffled.add(player);
    alreadyShuffled.add(otherPlayer);

    const container = player.getComponent("inventory").container;
    const otherContainer = otherPlayer.getComponent("inventory").container;
    swapItemBetweenPlayers(otherContainer, container);
  }
};

export const swapItems: IChaosEvent = {
  chaosEventDisplayName: "Swap Items",
  chaosEventId: "swapItems",
  chaosEventUniqueId: "-1",
  chaosEventTime: 300,
  timeTillNextEventOverride: 200,
  onChaosStart: swapItemStart,
  onChaosStop: () => {},
  onChaosTick: () => {},
};

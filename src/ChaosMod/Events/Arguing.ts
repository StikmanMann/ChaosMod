import { system } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";

const conflicts: string[] = [
  `
  AliveJy: I hate you |
  HU0: no you |
  Alive: >:( |
  AliveJy: >:( |
  HU0: I hate you |
  Alive: I hate you |
  AliveJy: I like you |
  HU0: I like you |
  Alive: I like you |
  AliveJy: I hate you |
  HU0: I hate you |
  Alive: I hate you |
  AliveJy: I hate you |
  HU0: I hate you |
  Alive: I hate you
  `,
];

const selectRandomArgument = (): string => {
  return conflicts[Math.floor(Math.random() * conflicts.length)];
};

const argumentTickLength = 2000;
let currentArgument = selectRandomArgument();
let splitArgument = currentArgument.split("|");
let argumentInterval = Math.floor(argumentTickLength / splitArgument.length);
let currentIndex = 0;
const argumentStart = () => {
  currentArgument = selectRandomArgument();
  splitArgument = currentArgument.split("|");
  argumentInterval = Math.floor(argumentTickLength / splitArgument.length);
  currentIndex = 0;
};

const argumentTick = () => {
  if (system.currentTick % argumentInterval != 0) {
    return;
  }

  for (const player of GlobalVars.players) {
    player.onScreenDisplay.setTitle(splitArgument[currentIndex], {
      fadeInDuration: 0,
      fadeOutDuration: 0,
      stayDuration: argumentInterval,
    });
  }
  currentIndex++;
};

export const arguing: IChaosEvent = {
  chaosEventDisplayName: "Arguing",
  chaosEventId: "arguing",
  chaosEventUniqueId: "-1",
  chaosEventTime: argumentTickLength,
  onChaosStart: argumentStart,
  onChaosTick: argumentTick,
  onChaosStop: () => {},
};

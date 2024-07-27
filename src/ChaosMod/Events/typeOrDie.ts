import {
  PlayerBreakBlockAfterEvent,
  world,
  system,
  Player,
  ChatSendBeforeEvent,
} from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { Logger } from "staticScripts/Logger";
import { GlobalVars } from "globalVars";

let currentStatement: string;

const statements = [
  "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz",
  "Wii U",
  "Minecraft",
  "Microsoft",
  "AliveJy is bad",
  "erm what the sigma",
  "I am a Skibidi Sigma Rizzler",
  "Nintendo 3DS",
  "Mario",
  "Luigi",
  "Peach",
  "Toad",
  "Link",
  "Zelda",
  "Jay-Z",
  "Eminem",
  "Dr. Dre",
  "Pneumonoultramicroscopicsilicovolcanoconiosis",
  "Fair Game",
  "I love Chaos Minecraft!! :)",
  "This Mod is the best mod ever",
  "I am the real Slim Shady",
  "I am not a robot",
  "AI is scaring me",
  "I am a bot",
  "I am not a bot",
  "9 + 10 = 21",
  "The mod creators are awesome!",
  "Stik should get a pay raise",
  "Can i have admin?",
  "Sry guys, I have no idea how to type",
  "My Salary is very low",
  "unceremoniously",
  "Gib mir deinen Saft, ich geb dir meinen",
  "Nie ohne Kondom",
  "an obscene scenery",
  "Betty better butter Brad’s bread",
  "Can you can a can as a canner can can a can?",
];

const succesMessages = [
  "Great job at typing!",
  "Wow your cognitive ability is amazing!",
  "Wow this is crazy how you typed that!",
  "With those typing skills you should sign up at a championship!",
  `I don't even know myself how to type ${currentStatement}!`,
];

const loseMessages = [
  "doesn't know how to type",
  "suffers from carpal tunnel syndrome",
  "played twister with his fingers and lost",
];

const chooseRandomStatement = (): string => {
  return statements[Math.floor(Math.random() * statements.length)];
};

const chooseRandomSuccessMessage = (): string => {
  return succesMessages[Math.floor(Math.random() * succesMessages.length)];
};

const chooseRandomLoseMessage = (): string => {
  return loseMessages[Math.floor(Math.random() * loseMessages.length)];
};

currentStatement = chooseRandomStatement();

const typeorDieChatEvent = (eventData: ChatSendBeforeEvent) => {
  system.run(() => {
    const message = eventData.message;
    const player = eventData.sender;
    if (message == currentStatement) {
      player.addTag("isSafe");
      player.sendMessage(chooseRandomSuccessMessage());
    }
    //world.sendMessage(`§a${player.nameTag}§r: ${message}`);
  });
};

const typeOrDieStart = () => {
  world.sendMessage(`§aSay this or death :) : §r${currentStatement}`);
  world.beforeEvents.chatSend.subscribe(typeorDieChatEvent);
};

const typeOrDieStop = () => {
  for (const player of GlobalVars.players) {
    if (!player.hasTag("isSafe")) {
      player.kill();
      world.sendMessage(`§4${player.nameTag}§r ${chooseRandomLoseMessage()}`);
    }
    if (player.hasTag("isSafe")) {
      player.removeTag("isSafe");
    }
  }

  world.beforeEvents.chatSend.unsubscribe(typeorDieChatEvent);

  currentStatement = chooseRandomStatement();
};
export const typeOrDieTrying: IChaosEvent = {
  chaosEventId: "typeOrDie",
  chaosEventDisplayName: "Type the message or die trying",

  chaosEventUniqueId: "-1",

  chaosEventTime: 250,

  onChaosStart: typeOrDieStart,
  onChaosStop: typeOrDieStop,
  onChaosTick: () => {},
};

typeOrDieTrying;

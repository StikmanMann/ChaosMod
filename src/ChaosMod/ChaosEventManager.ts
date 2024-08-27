import {
  DisplaySlotId,
  ObjectiveSortOrder,
  World,
  world,
} from "@minecraft/server";

//Imports for Chaos
import "./ChaosEventAdmin";

import { LinkedList } from "dataTypes/linkedList";
import { TickFunctions } from "staticScripts/tickFunctions";
import { IChaosEvent } from "./IChaosEvent";
import { ChaosEventSettings } from "./ChaosEventSettings";
import { chaosEventsList } from "./ChaosEventsList";
import { addActionbarMessage } from "hud";
import { GlobalVars } from "globalVars";
import { Logger } from "staticScripts/Logger";

function deepCopy(obj: any) {
  // Check if the value is an object or function, otherwise return it directly
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy: any[] = [];
    obj.forEach((_, i) => {
      arrCopy[i] = deepCopy(obj[i]);
    });
    return arrCopy;
  }

  // Handle Object
  const objCopy: any = {};
  Object.keys(obj).forEach((key) => {
    objCopy[key] = deepCopy(obj[key]);
  });
  return objCopy;
}

export class ChaosEventManager {
  static currentEvents: LinkedList<IChaosEvent> = new LinkedList<IChaosEvent>();

  static queuedEvent: IChaosEvent =
    chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];

  static ticksTillNextEvent = 200;

  static init = () => {
    let objective = world.scoreboard.getObjective("chaosEvents");
    if (!objective) {
      return;
    }
    world.scoreboard.removeObjective("chaosEvents");
  };

  static tick = () => {
    if (ChaosEventSettings.pauseChaos) return;
    this.eventTick();
    this.eventTimer();
    this.DisplayState.showCurrentEventsScoreboard();
  };

  static eventTick = () => {
    this.currentEvents.forEach((event) => {
      event.chaosEventTime--;
      if (event.chaosEventTime <= 0) {
        this.removeEvent(event);
      } else {
        if (event.onChaosTick) {
          event.onChaosTick();
        }
      }
    });
  };

  static eventTimer = () => {
    if (ChaosEventSettings.pauseChaosTimer) {
      for (const player of GlobalVars.players) {
        addActionbarMessage({
          player: player,
          message: "Chaos Event Timer Paused: !!chaos help",
          lifetime: 0,
        });
      }
      return;
    }
    this.ticksTillNextEvent--;

    if (this.ticksTillNextEvent <= 0) {
      this.ticksTillNextEvent = this.queuedEvent.timeTillNextEventOverride
        ? this.queuedEvent.timeTillNextEventOverride *
          ChaosEventSettings.tickDelayMultiplier
        : ChaosEventSettings.tickDelay * ChaosEventSettings.tickDelayMultiplier;
      this.chooseNextEvent(this.queuedEvent);
    }
  };

  static chooseRandomNextEvent = () => {
    const event: IChaosEvent = deepCopy(
      chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)]
    );
    event.chaosEventId = ChaosEventManager.uniqueIdGenerator(event);
  };

  static chooseNextEvent = (event: IChaosEvent) => {
    event = deepCopy(event);
    event.chaosEventId = ChaosEventManager.uniqueIdGenerator(event);
    ChaosEventManager.queuedEvent =
      chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];

    ChaosEventManager.addEvent(event);
  };
  static addEvent(event: IChaosEvent) {
    ChaosEventManager.currentEvents.append(event);
    Logger.warn(`Added Event: ${event.chaosEventId}`, "Chaos Event Manager");
    if (event.onChaosStart) {
      event.onChaosStart();
    }
  }

  static uniqueIdGenerator = (event: IChaosEvent): String => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const uniqueId = event.chaosEventId + randomNumber.toString();
    return uniqueId;
  };

  static removeEvent(event: IChaosEvent) {
    if (event.onChaosStop) {
      event.onChaosStop();
    }
    const objective = world.scoreboard.getObjective("chaosEvents");
    objective?.removeParticipant(event.chaosEventDisplayName as string) ??
      Logger.warn("Objective not found.", "Remove Event");

    ChaosEventManager.currentEvents.deleteNodeByValue(event);
  }

  static stopAllEvents = () => {
    ChaosEventManager.currentEvents.forEach((event) => {
      event.onChaosStop();
    });
    ChaosEventManager.currentEvents.clear();
    this.init();
  };
  //#region Display
  static DisplayState = class {
    static createInformationForNextEvent = (): String => {
      let combinedString = "";
      combinedString += `${
        ChaosEventManager.queuedEvent.chaosEventDisplayName
      } in ${ChaosEventManager.ticksTillNextEvent / 20} seconds`;

      return combinedString;
    };

    static showPlayersInformation = () => {
      GlobalVars.getPlayers();
      for (const player of GlobalVars.players) {
        addActionbarMessage({
          player: player,
          message: this.createInformationForNextEvent(),
          lifetime: 2,
        });
      }
    };
    static showCurrentEventsScoreboard = () => {
      let objective = world.scoreboard.getObjective("chaosEvents");
      if (!objective) {
        objective = world.scoreboard.addObjective(
          "chaosEvents",
          "§4§lChaos Events"
        );
        objective = world.scoreboard.getObjective("chaosEvents");
      }

      const sidebarObjective = world.scoreboard.getObjectiveAtDisplaySlot(
        DisplaySlotId.Sidebar
      );

      if (!sidebarObjective) {
        world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
          objective: objective,
        });
      } else if (sidebarObjective.objective.id != objective.id) {
        world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
          objective: objective,
        });
      }

      ChaosEventManager.currentEvents.forEach((event) => {
        objective.setScore(
          event.chaosEventDisplayName as string,
          event.chaosEventTime
        );
      });
    };
  };
  //#endregion
}

ChaosEventManager.init();

TickFunctions.addFunction(ChaosEventManager.tick, 1);
TickFunctions.addFunction(
  ChaosEventManager.DisplayState.showPlayersInformation,
  2
);

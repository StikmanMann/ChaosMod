import { World, world } from "@minecraft/server";
import { LinkedList } from "dataTypes/linkedList";
import { TickFunctions } from "staticScripts/tickFunctions";
import { IChaosEvent } from "./IChaosEvent";
import { ChaosEventSettings } from "./ChaosEventSettings";
import { chaosEventsList } from "./ChaosEventsList";

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

class ChaosEventManager {
  static currentEvents: LinkedList<IChaosEvent> = new LinkedList<IChaosEvent>();

  static queuedEvent: IChaosEvent =
    chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];

  static ticksTillNextEvent = 100;

  static tick = () => {
    ChaosEventManager.eventTick();
    ChaosEventManager.eventTimer();
  };

  static eventTick = () => {
    ChaosEventManager.currentEvents.forEach((event) => {
      event.onChaosTick();
      event.chaosEventTime--;
      if (event.chaosEventTime <= 0) {
        ChaosEventManager.removeEvent(event);
      }
    });
  };

  static eventTimer = () => {
    ChaosEventManager.ticksTillNextEvent--;
    world.sendMessage(
      `Ticks till next event: ${ChaosEventManager.ticksTillNextEvent} - ${ChaosEventManager.queuedEvent.chaosEventId} `
    );
    if (ChaosEventManager.ticksTillNextEvent <= 0) {
      ChaosEventManager.chooseNextEvent(this.queuedEvent);
      ChaosEventManager.ticksTillNextEvent = ChaosEventSettings.tickDelay;
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
    event.onChaosStart();
  }

  static uniqueIdGenerator = (event: IChaosEvent): String => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const uniqueId = event.chaosEventId + randomNumber.toString();
    return uniqueId;
  };

  static removeEvent(event: IChaosEvent) {
    event.onChaosStop();
    ChaosEventManager.currentEvents.deleteNodeByValue(event);
  }

  static createChaosInformationString = (event: IChaosEvent): String => {
    return null;
  };
}

TickFunctions.addFunction(ChaosEventManager.tick, 1);

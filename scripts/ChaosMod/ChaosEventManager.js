var _a;
import { world } from "@minecraft/server";
import { LinkedList } from "dataTypes/linkedList";
import { TickFunctions } from "staticScripts/tickFunctions";
import { ChaosEventSettings } from "./ChaosEventSettings";
import { chaosEventsList } from "./ChaosEventsList";
function deepCopy(obj) {
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
        const arrCopy = [];
        obj.forEach((_, i) => {
            arrCopy[i] = deepCopy(obj[i]);
        });
        return arrCopy;
    }
    // Handle Object
    const objCopy = {};
    Object.keys(obj).forEach((key) => {
        objCopy[key] = deepCopy(obj[key]);
    });
    return objCopy;
}
class ChaosEventManager {
    static addEvent(event) {
        _a.currentEvents.append(event);
        event.onChaosStart();
    }
    static removeEvent(event) {
        event.onChaosStop();
        _a.currentEvents.deleteNodeByValue(event);
    }
}
_a = ChaosEventManager;
ChaosEventManager.currentEvents = new LinkedList();
ChaosEventManager.queuedEvent = chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];
ChaosEventManager.ticksTillNextEvent = 100;
ChaosEventManager.tick = () => {
    _a.eventTick();
    _a.eventTimer();
};
ChaosEventManager.eventTick = () => {
    _a.currentEvents.forEach((event) => {
        event.onChaosTick();
        event.chaosEventTime--;
        if (event.chaosEventTime <= 0) {
            _a.removeEvent(event);
        }
    });
};
ChaosEventManager.eventTimer = () => {
    _a.ticksTillNextEvent--;
    world.sendMessage(`Ticks till next event: ${_a.ticksTillNextEvent} - ${_a.queuedEvent.chaosEventId} `);
    if (_a.ticksTillNextEvent <= 0) {
        _a.chooseNextEvent(_a.queuedEvent);
        _a.ticksTillNextEvent = ChaosEventSettings.tickDelay;
    }
};
ChaosEventManager.chooseRandomNextEvent = () => {
    const event = deepCopy(chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)]);
    event.chaosEventId = _a.uniqueIdGenerator(event);
};
ChaosEventManager.chooseNextEvent = (event) => {
    event = deepCopy(event);
    event.chaosEventId = _a.uniqueIdGenerator(event);
    _a.queuedEvent =
        chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];
    _a.addEvent(event);
};
ChaosEventManager.uniqueIdGenerator = (event) => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const uniqueId = event.chaosEventId + randomNumber.toString();
    return uniqueId;
};
ChaosEventManager.createChaosInformationString = (event) => {
    return null;
};
TickFunctions.addFunction(ChaosEventManager.tick, 1);

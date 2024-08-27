var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b;
import { DisplaySlotId, world, } from "@minecraft/server";
//Imports for Chaos
import "./ChaosEventAdmin";
import { LinkedList } from "dataTypes/linkedList";
import { TickFunctions } from "staticScripts/tickFunctions";
import { ChaosEventSettings } from "./ChaosEventSettings";
import { chaosEventsList } from "./ChaosEventsList";
import { addActionbarMessage } from "hud";
import { GlobalVars } from "globalVars";
import { Logger } from "staticScripts/Logger";
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
export class ChaosEventManager {
    static addEvent(event) {
        _a.currentEvents.append(event);
        Logger.warn(`Added Event: ${event.chaosEventId}`, "Chaos Event Manager");
        if (event.onChaosStart) {
            event.onChaosStart();
        }
    }
    static removeEvent(event) {
        if (event.onChaosStop) {
            event.onChaosStop();
        }
        const objective = world.scoreboard.getObjective("chaosEvents");
        objective?.removeParticipant(event.chaosEventDisplayName) ??
            Logger.warn("Objective not found.", "Remove Event");
        _a.currentEvents.deleteNodeByValue(event);
    }
}
_a = ChaosEventManager;
ChaosEventManager.currentEvents = new LinkedList();
ChaosEventManager.queuedEvent = chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];
ChaosEventManager.ticksTillNextEvent = 200;
ChaosEventManager.init = () => {
    let objective = world.scoreboard.getObjective("chaosEvents");
    if (!objective) {
        return;
    }
    world.scoreboard.removeObjective("chaosEvents");
};
ChaosEventManager.tick = () => {
    if (ChaosEventSettings.pauseChaos)
        return;
    _a.eventTick();
    _a.eventTimer();
    _a.DisplayState.showCurrentEventsScoreboard();
};
ChaosEventManager.eventTick = () => {
    _a.currentEvents.forEach((event) => {
        event.chaosEventTime--;
        if (event.chaosEventTime <= 0) {
            _a.removeEvent(event);
        }
        else {
            if (event.onChaosTick) {
                event.onChaosTick();
            }
        }
    });
};
ChaosEventManager.eventTimer = () => {
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
    _a.ticksTillNextEvent--;
    if (_a.ticksTillNextEvent <= 0) {
        _a.ticksTillNextEvent = _a.queuedEvent.timeTillNextEventOverride
            ? _a.queuedEvent.timeTillNextEventOverride *
                ChaosEventSettings.tickDelayMultiplier
            : ChaosEventSettings.tickDelay * ChaosEventSettings.tickDelayMultiplier;
        _a.chooseNextEvent(_a.queuedEvent);
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
ChaosEventManager.stopAllEvents = () => {
    _a.currentEvents.forEach((event) => {
        event.onChaosStop();
    });
    _a.currentEvents.clear();
    _a.init();
};
//#region Display
ChaosEventManager.DisplayState = (_b = class {
    },
    __setFunctionName(_b, "DisplayState"),
    _b.createInformationForNextEvent = () => {
        let combinedString = "";
        combinedString += `${_a.queuedEvent.chaosEventDisplayName} in ${_a.ticksTillNextEvent / 20} seconds`;
        return combinedString;
    },
    _b.showPlayersInformation = () => {
        GlobalVars.getPlayers();
        for (const player of GlobalVars.players) {
            addActionbarMessage({
                player: player,
                message: _b.createInformationForNextEvent(),
                lifetime: 2,
            });
        }
    },
    _b.showCurrentEventsScoreboard = () => {
        let objective = world.scoreboard.getObjective("chaosEvents");
        if (!objective) {
            objective = world.scoreboard.addObjective("chaosEvents", "§4§lChaos Events");
            objective = world.scoreboard.getObjective("chaosEvents");
        }
        const sidebarObjective = world.scoreboard.getObjectiveAtDisplaySlot(DisplaySlotId.Sidebar);
        if (!sidebarObjective) {
            world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
                objective: objective,
            });
        }
        else if (sidebarObjective.objective.id != objective.id) {
            world.scoreboard.setObjectiveAtDisplaySlot(DisplaySlotId.Sidebar, {
                objective: objective,
            });
        }
        _a.currentEvents.forEach((event) => {
            objective.setScore(event.chaosEventDisplayName, event.chaosEventTime);
        });
    },
    _b);
ChaosEventManager.init();
TickFunctions.addFunction(ChaosEventManager.tick, 1);
TickFunctions.addFunction(ChaosEventManager.DisplayState.showPlayersInformation, 2);

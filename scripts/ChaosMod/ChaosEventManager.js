var _a;
import { DisplaySlotId, world, } from "@minecraft/server";
import { LinkedList } from "dataTypes/linkedList";
import { TickFunctions } from "staticScripts/tickFunctions";
import { ChaosEventSettings } from "./ChaosEventSettings";
import { chaosEventsList } from "./ChaosEventsList";
import { addActionbarMessage } from "hud";
import { GlobalVars } from "globalVars";
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
        world.scoreboard
            .getObjective("chaosEvents")
            .removeParticipant(event.chaosEventDisplayName);
        _a.currentEvents.deleteNodeByValue(event);
    }
}
_a = ChaosEventManager;
ChaosEventManager.currentEvents = new LinkedList();
ChaosEventManager.queuedEvent = chaosEventsList[Math.floor(Math.random() * chaosEventsList.length)];
ChaosEventManager.ticksTillNextEvent = 100;
ChaosEventManager.init = () => {
    world.scoreboard.removeObjective("chaosEvents");
};
ChaosEventManager.tick = () => {
    _a.eventTick();
    _a.eventTimer();
    _a.showCurrentEventsScoreboard();
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
ChaosEventManager.createInformationForNextEvent = () => {
    let combinedString = "";
    combinedString += `${_a.queuedEvent.chaosEventDisplayName} in ${_a.ticksTillNextEvent / 20} seconds`;
    return combinedString;
};
ChaosEventManager.showPlayersInformation = () => {
    GlobalVars.getPlayers();
    for (const player of GlobalVars.players) {
        addActionbarMessage({
            player: player,
            message: _a.createInformationForNextEvent(),
            lifetime: 2,
        });
    }
};
ChaosEventManager.showCurrentEventsScoreboard = () => {
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
};
ChaosEventManager.init();
TickFunctions.addFunction(ChaosEventManager.tick, 1);
TickFunctions.addFunction(ChaosEventManager.showPlayersInformation, 2);

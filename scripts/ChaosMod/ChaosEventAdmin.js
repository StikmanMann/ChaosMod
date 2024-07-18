var _a;
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { addCommand, showHUD } from "staticScripts/commandFunctions";
import { chaosEventsList } from "./ChaosEventsList";
import { ChaosEventManager } from "./ChaosEventManager";
class ChaosEventAdmin {
}
_a = ChaosEventAdmin;
/**
 *
 * @param event The chat event from typing in the command
 * @param query The search options for the event
 * @returns
 */
ChaosEventAdmin.runEventMenu = (event, events = chaosEventsList) => {
    if (!event.sender.isOp) {
        return;
    }
    const form = new ActionFormData();
    form.title("Chaos Event Admin");
    form.body("What would you like to do?");
    form.button("Search for events");
    for (const event of events) {
        form.button(event.chaosEventDisplayName);
    }
    showHUD(event.sender, form).then((res) => {
        if (res.canceled) {
            return;
        }
        if (res.selection == 0) {
            const searchForm = new ModalFormData();
            searchForm.title("Search for events");
            searchForm.textField("Search", "Blocks go Boom");
            showHUD(event.sender, searchForm).then((res) => {
                if (res.canceled) {
                    return;
                }
                _a.runEventMenu(event, _a.filterEvents(res.formValues[0]));
            });
            return;
        }
        const selectedEvent = events[res.selection - 1];
        ChaosEventManager.chooseNextEvent(selectedEvent);
    });
};
ChaosEventAdmin.filterEvents = (query) => {
    query = query.trim();
    return chaosEventsList.filter((event) => {
        return (event.chaosEventDisplayName
            .toLowerCase()
            .includes(query.toLowerCase()) ||
            event.chaosEventId.toLowerCase().includes(query.toLowerCase()));
    });
};
addCommand({
    commandName: "chaos",
    chatFunction: (event) => {
        const splitMessage = event.message.split(/!!chaos/);
        switch (splitMessage.length) {
            case 1:
                ChaosEventAdmin.runEventMenu(event);
                break;
            case 2:
                const events = ChaosEventAdmin.filterEvents(splitMessage[1]);
                switch (events.length) {
                    case 0:
                        event.sender.sendMessage("No events found");
                        break;
                    case 1:
                        ChaosEventManager.chooseNextEvent(events[0]);
                        break;
                    default:
                        ChaosEventAdmin.runEventMenu(event, events);
                        break;
                }
                break;
            default:
                event.sender.sendMessage("Too many arguments, somehow? Ig you wrote !!chaos twice?");
                break;
        }
    },
    directory: "ChaosMod",
    commandPrefix: "!!",
});

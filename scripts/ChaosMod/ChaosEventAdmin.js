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
ChaosEventAdmin.runEventMenu = (event, query) => {
    if (!event.sender.isOp) {
        return;
    }
    let events = query
        ? chaosEventsList.filter((event) => event.chaosEventDisplayName
            .toLowerCase()
            .includes(query.toLowerCase()))
        : chaosEventsList;
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
                _a.runEventMenu(event, res.formValues[0]);
            });
            return;
        }
        const selectedEvent = events[res.selection - 1];
        ChaosEventManager.chooseNextEvent(selectedEvent);
    });
};
addCommand({
    commandName: "chaos",
    chatFunction: (event) => {
        ChaosEventAdmin.runEventMenu(event);
    },
    directory: "ChaosMod",
    commandPrefix: "!!",
});

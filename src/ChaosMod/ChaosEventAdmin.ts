import { ChatSendBeforeEvent } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { addCommand, showHUD } from "staticScripts/commandFunctions";
import { chaosEventsList } from "./ChaosEventsList";
import { IChaosEvent } from "./IChaosEvent";
import { ChaosEventManager } from "./ChaosEventManager";

class ChaosEventAdmin {
  /**
   *
   * @param event The chat event from typing in the command
   * @param query The search options for the event
   * @returns
   */
  static runEventMenu = (event: ChatSendBeforeEvent, query?: string) => {
    if (!event.sender.isOp) {
      return;
    }

    let events: IChaosEvent[] = query
      ? chaosEventsList.filter((event) =>
          event.chaosEventDisplayName
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : chaosEventsList;

    const form = new ActionFormData();
    form.title("Chaos Event Admin");
    form.body("What would you like to do?");
    form.button("Search for events");

    for (const event of events) {
      form.button(event.chaosEventDisplayName as string);
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
          this.runEventMenu(event, res.formValues[0] as string);
        });

        return;
      }

      const selectedEvent = events[res.selection - 1];

      ChaosEventManager.chooseNextEvent(selectedEvent);
    });
  };
}

addCommand({
  commandName: "chaos",
  chatFunction: (event) => {
    ChaosEventAdmin.runEventMenu(event);
  },
  directory: "ChaosMod",
  commandPrefix: "!!",
});

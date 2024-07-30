import { ChatSendBeforeEvent, world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { addCommand, showHUD } from "staticScripts/commandFunctions";
import { chaosEventsList } from "./ChaosEventsList";
import { IChaosEvent } from "./IChaosEvent";
import { ChaosEventManager } from "./ChaosEventManager";
import { ChaosEventSettings } from "./ChaosEventSettings";

class ChaosEventAdmin {
  /**
   *
   * @param event The chat event from typing in the command
   * @param query The search options for the event
   * @returns
   */
  static runEventMenu = (
    event: ChatSendBeforeEvent,
    events: IChaosEvent[] = chaosEventsList
  ) => {
    if (!event.sender.isOp) {
      return;
    }

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
          this.runEventMenu(
            event,
            ChaosEventAdmin.filterEvents(res.formValues[0] as string)
          );
        });

        return;
      }

      const selectedEvent = events[res.selection - 1];

      ChaosEventManager.chooseNextEvent(selectedEvent);
    });
  };

  static filterEvents = (query: string): IChaosEvent[] => {
    query = query.trim();
    return chaosEventsList.filter((event) => {
      return (
        event.chaosEventDisplayName
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        event.chaosEventId.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  static pauseChaosTimer = () => {
    world.sendMessage("Chaos Timer is paused");
    ChaosEventSettings.pauseChaosTimer = true;
  };

  static pauseChaos = () => {
    world.sendMessage("Chaos is paused");
    ChaosEventSettings.pauseChaos = true;
    ChaosEventSettings.pauseChaosTimer = true;
  };

  static unpauseChaos = () => {
    world.sendMessage("Chaos is unpaused");
    ChaosEventSettings.pauseChaos = false;
    ChaosEventSettings.pauseChaosTimer = false;
  };

  static stopChaos = () => {
    world.sendMessage("Chaos is stopped");
    ChaosEventSettings.pauseChaos = true;
    ChaosEventSettings.pauseChaosTimer = true;
    ChaosEventManager.stopAllEvents();
  };
}

const commandHelp = `
§e!!chaos usage:

§3!!chaos §rOpens the Admin Menu

§3!!chaos pause timer / pt §rPauses Chaos Timer for next event but still runs current events
§3!!chaos pause / p §rPauses Chaos Events
§3!!chaos unpause / unp / resume / r §rUnpauses Chaos Events
§3!!chaos stop / s §rPauses Chaos Events and Stops All Events


§3!!chaos [search query] §rIf 1 match is found run event, else open Admin Menu with search results
`;

const commandHelpSearches = new Set(["help", "-h", "usage", "--help"]);

const chaosCommand: Map<string, () => any> = new Map();
chaosCommand.set("pause timer", ChaosEventAdmin.pauseChaosTimer);
chaosCommand.set("pt", ChaosEventAdmin.pauseChaosTimer);
chaosCommand.set("pause", ChaosEventAdmin.pauseChaos);
chaosCommand.set("p", ChaosEventAdmin.pauseChaos);
chaosCommand.set("unpause", ChaosEventAdmin.unpauseChaos);
chaosCommand.set("unp", ChaosEventAdmin.unpauseChaos);
chaosCommand.set("stop", ChaosEventAdmin.stopChaos);
chaosCommand.set("s", ChaosEventAdmin.stopChaos);
chaosCommand.set("resume", ChaosEventAdmin.unpauseChaos);
chaosCommand.set("r", ChaosEventAdmin.unpauseChaos);

addCommand({
  commandName: "chaos",

  chatFunction: (event) => {
    if (!event.sender.isOp()) {
      return;
    }
    const splitMessage = event.message.split(/!!chaos/);
    switch (splitMessage.length) {
      case 1:
        ChaosEventAdmin.runEventMenu(event);
        break;
      case 2:
        const command = splitMessage[1].trim().toLowerCase();

        if (commandHelpSearches.has(command)) {
          event.sender.sendMessage(commandHelp);
          return;
        }

        if (chaosCommand.has(command)) {
          chaosCommand.get(command)();
          return;
        }

        const events = ChaosEventAdmin.filterEvents(command);
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
        event.sender.sendMessage(
          "Too many arguments, somehow? Ig you wrote !!chaos twice?"
        );
        break;
    }
  },
  directory: "ChaosMod",
  commandPrefix: "!!",
});

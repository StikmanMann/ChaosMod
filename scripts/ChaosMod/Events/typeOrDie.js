import { world, system, } from "@minecraft/server";
import { GlobalVars } from "globalVars";
const typeOrDie = () => {
    const statements = [
        "Wii U",
        "Minecraft",
        "AliveJy is bad",
        "erm what the sigma",
        "Nintendo 3DS",
        "Mario",
        "Jay-Z",
        "Pneumonoultramicroscopicsilicovolcanoconiosis",
        "Fair Game",
        "I love Chaos Minecraft!! :)",
    ];
    const idx = Math.floor(Math.random() * (9 - 0) + 0);
    world.sendMessage("Say this or death :) : " + statements[idx]);
    world.beforeEvents.chatSend.subscribe((eventData) => {
        system.run(() => {
            eventData.cancel = true;
            const message = eventData.message;
            const player = eventData.sender;
            if (message == statements[idx]) {
                player.addTag("isSafe");
                world.sendMessage("ur safe now");
            }
        });
    });
};
const typeOrDieTrying = {
    chaosEventId: "typeOrDie",
    chaosEventDisplayName: "Type the message or die trying",
    chaosEventUniqueId: "-1",
    chaosEventTime: 200,
    onChaosStart: typeOrDie,
    onChaosStop: () => {
        for (const player of GlobalVars.players) {
            if (player.hasTag("isSafe") == false) {
                player.kill();
            }
        }
        for (const player of GlobalVars.players) {
            if (player.hasTag("isSafe")) {
                player.removeTag("isSafe");
            }
        }
    },
    onChaosTick: () => { },
};
export default typeOrDieTrying;

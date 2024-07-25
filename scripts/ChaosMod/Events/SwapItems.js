import { world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { AwaitFunctions } from "staticScripts/awaitFunctions";
function shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
const eventTime = 300;
const swapItemBetweenPlayers = async (container, otherContainer) => {
    for (let j = 0; j < container.size; j++) {
        await AwaitFunctions.waitTicks(Math.floor(eventTime / container.size));
        container.swapItems(j, j, otherContainer);
        world.sendMessage(`Swapping item ${j} of ${container.size}`);
    }
};
const swapItemStart = async () => {
    let containers = GlobalVars.players.map((player) => {
        return player.getComponent("inventory").container;
    });
    containers = shuffleArray(containers);
    for (let i = 0; i < GlobalVars.players.length; i += 2) {
        const player = GlobalVars.players[i];
        const container = player.getComponent("inventory").container;
        swapItemBetweenPlayers(containers[Math.floor(i / 2)], container);
    }
};
export const swapItems = {
    chaosEventDisplayName: "Swap Items",
    chaosEventId: "swapItems",
    chaosEventUniqueId: "-1",
    chaosEventTime: 300,
    timeTillNextEventOverride: 200,
    onChaosStart: swapItemStart,
    onChaosStop: () => { },
    onChaosTick: () => { },
};

import { world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        // Pick a remaining element
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
let locations = [];
const oneVOneStart = () => {
    const players = GlobalVars.players;
    const shuffledPlayers = shuffleArray(players);
    locations = new Array(players.length);
    world.sendMessage(`§a1v1 Arena start now, kill your oppenent first to get back to your original location!`);
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        locations[i] = player.location;
        if (i == players.length - 1 && players.length % 2 == 1) {
            player.sendMessage("Looks like you got lucky this time...");
            break;
        }
    }
};
export const oneVsOne = {
    chaosEventId: "1v1Arena",
    chaosEventDisplayName: "1v1 Arena",
    chaosEventUniqueId: "1v1Arena",
    chaosEventTime: 10000,
    onChaosStart: oneVOneStart,
};

import { EntityDamageCause, world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
const rollForHealstart = () => {
    world.sendMessage(`Rolling for heal...`);
};
const rollForHealEnd = () => {
    for (const player of GlobalVars.players) {
        const roll = Math.floor(Math.random() * 20) + 1;
        const playerHealthCompnent = player.getComponent("health");
        switch (roll) {
            case 1:
                world.sendMessage(`${player.nameTag} was out of luck on this one :(`);
                player.kill();
                break;
            case 2:
            case 3:
            case 4:
                player.applyDamage(5, { cause: EntityDamageCause.contact });
                player.sendMessage(`You rolled a ${roll}`);
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                player.sendMessage(`You rolled a ${roll}, how uneventfull!`);
                break;
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                playerHealthCompnent.setCurrentValue(roll + playerHealthCompnent.currentValue);
                player.sendMessage(`You rolled a ${roll}, so were healing you for that!`);
                break;
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
                playerHealthCompnent.setCurrentValue(roll + playerHealthCompnent.currentValue);
                player.addEffect("regeneration", roll * 50);
                player.sendMessage(`You rolled a ${roll}, so were healing you for that and some regen on top!`);
                break;
            case 20:
        }
    }
};

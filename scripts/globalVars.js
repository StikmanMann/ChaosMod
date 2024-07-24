import { world } from "@minecraft/server";
export { GlobalVars };
class GlobalVars {
    static getAllEntities() {
        const entities = GlobalVars.overworld
            .getEntities()
            .concat(GlobalVars.nether.getEntities())
            .concat(GlobalVars.theEnd.getEntities());
        return entities;
    }
    static getPlayers() {
        this.players = world.getAllPlayers();
    }
}
/**
 * @type {Player[]}
 */
GlobalVars.players = world.getAllPlayers();
/**
 * @type {Dimension}
 */
GlobalVars.overworld = world.getDimension("overworld");
GlobalVars.nether = world.getDimension("nether");
GlobalVars.theEnd = world.getDimension("the_end");
GlobalVars.spawn = { x: 150, y: 65, z: 5 };
world.afterEvents.playerSpawn.subscribe((eventData) => {
    GlobalVars.getPlayers();
});
world.afterEvents.playerLeave.subscribe((eventData) => {
    GlobalVars.getPlayers();
});

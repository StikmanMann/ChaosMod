import { world, Player, Dimension, Vector3, Entity } from "@minecraft/server";
export { GlobalVars };
class GlobalVars {
  /**
   * @type {Player[]}
   */
  static players = world.getAllPlayers();

  /**
   * @type {Dimension}
   */
  static overworld = world.getDimension("overworld");

  static nether = world.getDimension("nether");

  static theEnd = world.getDimension("the_end");

  static getAllEntities(): Entity[] {
    const entities = GlobalVars.overworld
      .getEntities()
      .concat(GlobalVars.nether.getEntities())
      .concat(GlobalVars.theEnd.getEntities());
    return entities;
  }

  static getPlayers() {
    this.players = world.getAllPlayers();
  }

  static spawn = { x: 150, y: 65, z: 5 } as Vector3;
}

world.afterEvents.playerSpawn.subscribe((eventData) => {
  GlobalVars.getPlayers();
});

world.afterEvents.playerLeave.subscribe((eventData) => {
  GlobalVars.getPlayers();
});

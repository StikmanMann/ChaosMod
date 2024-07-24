import { system, world } from "@minecraft/server";
const chaosEventTime = 2000;
const invisibleMobsStart = () => {
    for (const player of world.getPlayers()) {
        const entities = player.dimension.getEntities({
            excludeTypes: ["minecraft:player"],
        });
        for (const entity of entities) {
            entity.addEffect("invisibility", chaosEventTime, {
                showParticles: false,
            });
        }
    }
};
const invisibleMobsTick = () => {
    if (system.currentTick % 100 != 0) {
        return;
    }
    for (const player of world.getPlayers()) {
        const entities = player.dimension.getEntities({
            excludeTypes: ["minecraft:player"],
        });
        for (const entity of entities) {
            entity.addEffect("invisibility", 200, {
                showParticles: false,
            });
        }
    }
};
const invisibleMobsStop = () => {
    for (const player of world.getPlayers()) {
        const entities = player.dimension.getEntities({
            excludeTypes: ["minecraft:player"],
        });
        for (const entity of entities) {
            entity.removeEffect("invisibility");
        }
    }
};
export const invisibleMobs = {
    chaosEventId: "invisibleMobs",
    chaosEventDisplayName: "Invisible Mobs",
    chaosEventUniqueId: "-1",
    chaosEventTime: chaosEventTime,
    onChaosStart: invisibleMobsStart,
    onChaosStop: invisibleMobsStop,
    onChaosTick: invisibleMobsTick,
};

import { EasingType, ItemStack, system, world, } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { DrawFunctions } from "staticScripts/drawFunctions";
import { Logger } from "staticScripts/Logger";
import { VectorFunctions } from "staticScripts/vectorFunctions";
const randomDistances = [
    { x: 30, y: 0, z: 0 },
    { x: 0, y: 0, z: 30 },
    { x: -30, y: 0, z: 0 },
    { x: 0, y: 0, z: -30 },
];
const lookCancelTicks = 50;
let randomStartIndex = Math.floor(Math.random() * randomDistances.length);
let lastSeenTick = {};
let herobrinePositions = {};
const range = 6;
const nearHerobrine = (player, herobrinePos) => {
    return (VectorFunctions.vectorLength(VectorFunctions.subtractVector(herobrinePos, player.location)) < range);
};
const findHerobrinePosition = (player) => {
    for (const player of GlobalVars.players) {
        const rot = player.getRotation();
        const forwardVector = VectorFunctions.getForwardVectorFromRotationXY(0, rot.y);
        for (let distance = 20; distance <= 50; distance++) {
            const behindVector = VectorFunctions.multiplyVector(forwardVector, -distance);
            for (let yOffset = 0; yOffset <= 10; yOffset++) {
                let possiblePos = VectorFunctions.addVector(VectorFunctions.addVector(player.location, behindVector), { x: 0, y: yOffset, z: 0 });
                const block = player.dimension.getBlock(possiblePos);
                if (block.typeId == "minecraft:air" &&
                    block.below(1).typeId != "minecraft:air") {
                    return VectorFunctions.addVector(possiblePos, {
                        x: 0,
                        y: 2,
                        z: 0,
                    });
                }
                DrawFunctions.drawLine(10, player.location, possiblePos);
            }
        }
    }
    return VectorFunctions.addVector(player.location, { x: 0, y: 50, z: 0 });
};
const herobrineStart = () => {
    world.sendMessage(`§eHerobrine has joined the world`);
    for (const player of GlobalVars.players) {
        lastSeenTick[player.id] = 0;
        const herobrinePos = findHerobrinePosition(player);
        if (herobrinePos == null) {
            continue;
        }
        player.dimension.spawnItem(new ItemStack("totem_of_undying"), herobrinePos);
        herobrinePositions[player.id] = herobrinePos;
        Logger.warn(`Herobrine Position: ${herobrinePos}`);
        player.addEffect("blindness", 400);
        player.camera.setCamera("minecraft:free", {
            location: herobrinePos,
            facingEntity: player,
        });
        let blockingBlock = player.dimension.getBlockFromRay(herobrinePos, VectorFunctions.subtractVector(player.location, herobrinePos));
        while (blockingBlock &&
            VectorFunctions.vectorLength(VectorFunctions.subtractVector(blockingBlock.block.location, player.location)) > 2) {
            //world.sendMessage("§a" + blockingBlock.block.typeId);
            blockingBlock.block.setType("minecraft:air");
            blockingBlock.block.above(1).setType("minecraft:air");
            blockingBlock.block.below(1).setType("minecraft:air");
            blockingBlock = player.dimension.getBlockFromRay(herobrinePos, VectorFunctions.subtractVector(player.location, herobrinePos));
        }
        world.sendMessage("§a" + blockingBlock.block.typeId);
    }
};
const herobrineTick = () => {
    for (const player of GlobalVars.players) {
        if (system.currentTick - lastSeenTick[player.id] < lookCancelTicks) {
            continue;
        }
        const herobrinePos = herobrinePositions[player.id];
        if (!herobrinePos) {
            player.camera.clear();
            continue;
        }
        if (nearHerobrine(player, herobrinePos)) {
            player.camera.clear();
            lastSeenTick[player.id] = system.currentTick;
            continue;
        }
        //Logger.warn(`Herobrine Position: ${herobrinePos}`);
        player.camera.setCamera("minecraft:free", {
            location: herobrinePos,
            facingEntity: player,
            easeOptions: { easeTime: 0.1, easeType: EasingType.InCubic },
        });
    }
};
const herobrineStop = () => {
    for (const player of GlobalVars.players) {
        player.camera.clear();
        player.removeEffect("blindness");
    }
    world.sendMessage(`§eHerobrine has left the world`);
};
export const herobrineStalker = {
    chaosEventId: "herobrineStalker",
    chaosEventDisplayName: "Herobrine Stalker",
    chaosEventTime: 400,
    chaosEventUniqueId: "-1",
    onChaosStart: herobrineStart,
    onChaosStop: herobrineStop,
    onChaosTick: herobrineTick,
};

import { BlockTypes, system, world, Player } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { Logger } from "staticScripts/Logger";
import { DrawFunctions } from "staticScripts/drawFunctions";
import { TickFunctions } from "staticScripts/tickFunctions";
import { VectorFunctions } from "staticScripts/vectorFunctions";
import { JumpFunctions } from "./jumpFunctions";





JumpFunctions.addPressedJumpFunction((player: Player) => {
    const rayBlock = player.getBlockFromViewDirection();
    if(!player.hasTag("treeJump") || player.groundCheck) {return;}
    //Logger.log("treeJump", "treeJump")


    if(rayBlock.block.typeId == "minecraft:redstone_block") {
        DrawFunctions.drawGraph(10, player.location, VectorFunctions.addVector(rayBlock.block.location, {x: 0, y: 1, z: 0}), player)
    }

});

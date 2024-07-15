import { PlayerBreakBlockAfterEvent, world } from "@minecraft/server";
import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { Logger } from "staticScripts/Logger";
import { GlobalVars } from "globalVars";

const givePlayerRandomEffect = () => {
    const effects = ["levitation", "poison", "wither", "instant_health", "regeneration", "speed", "jump_boost", "blindness", "darkness", "haste", "hunger", "saturation", "infested", "mining_fatigue", "nausea", "oozing", "weakness"]
    const currEffect = effects[Math.floor(Math.random() * (16-0) + 0)]
    for(const player of GlobalVars.players){
        //world.sendMessage("Everyone now has "+String(currEffect)+"!")
        player.addEffect(String(currEffect), 600 , { showParticles: false, amplifier: 2 })
    }
};


const randomEffect: IChaosEvent = {
    chaosEventId: "randomEffect",
    chaosEventDisplayName: "Random Effect",
  
    chaosEventUniqueId: "-1",
  
    chaosEventTime: 600,
  
    onChaosStart: givePlayerRandomEffect,
    onChaosStop: () => {},
    onChaosTick: () => {},
  };
  
  export default randomEffect;
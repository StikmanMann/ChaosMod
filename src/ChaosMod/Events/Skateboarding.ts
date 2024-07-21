import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { JumpFunctions } from "playerMovement/jumpFunctions";
import { Logger } from "staticScripts/Logger";

const skateboardingStart = () => {
  for (const player of GlobalVars.players) {
    player.addEffect("jump_boost", 500, { amplifier: 10 });
  }
};

const skateboardingTick = () => {
  for (const player of GlobalVars.players) {
    //Logger.warn(`${player.getRotation().y}`, "Skateboarding");
    const playerRotation = player.getRotation();
    player.applyKnockback(
      Math.sin(playerRotation.y * (Math.PI / 180) * -1),
      Math.cos(playerRotation.y * (Math.PI / 180) * -1),
      2,
      -0.25
    );
  }
};

export const skatebording: IChaosEvent = {
  chaosEventId: "skateboarding",
  chaosEventDisplayName: "Skateboarding",
  chaosEventUniqueId: "-1",
  chaosEventTime: 500,
  onChaosStart: skateboardingStart,
  onChaosStop: () => {},
  onChaosTick: skateboardingTick,
};

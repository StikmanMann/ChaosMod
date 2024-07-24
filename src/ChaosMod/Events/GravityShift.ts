import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";

let currentGravityModifier = 0;
const gravityShiftMultiplier = 0.1;

const gravityShiftTick = () => {
  currentGravityModifier += Math.random() - 0.5;
  if (currentGravityModifier > 2) currentGravityModifier = 2;
  if (currentGravityModifier < -2) currentGravityModifier = -2;

  for (const player of GlobalVars.players) {
    player.applyKnockback(
      0,
      0,
      0,
      currentGravityModifier * gravityShiftMultiplier
    );
  }
};

export const gravityShift: IChaosEvent = {
  chaosEventDisplayName: "Gravity Shift",
  chaosEventId: "gravityShift",
  chaosEventUniqueId: "-1",
  chaosEventTime: 400,
  onChaosStart: () => {},
  onChaosStop: () => {},
  onChaosTick: gravityShiftTick,
};

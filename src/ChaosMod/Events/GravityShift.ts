import { IChaosEvent } from "ChaosMod/IChaosEvent";
import { GlobalVars } from "globalVars";
import { Logger } from "staticScripts/Logger";

let currentYGravityModifier = 0;
let currentXGravityModifier = 0;
let currentZGravityModifier = 0;
const gravityShiftVerticalMultiplier = 0.5;
const gravityShiftHorizontalMultiplier = 1;

const gravityShiftTick = () => {
  currentYGravityModifier += Math.random() - 0.5;
  if (currentYGravityModifier > 2) currentYGravityModifier = 2;
  if (currentYGravityModifier < -2) currentYGravityModifier = -2;

  currentXGravityModifier += Math.random() - 0.5;
  if (currentXGravityModifier > 1) currentXGravityModifier = 1;
  if (currentXGravityModifier < -1) currentXGravityModifier = -1;

  currentZGravityModifier += Math.random() - 0.5;
  if (currentZGravityModifier > 1) currentZGravityModifier = 1;
  if (currentZGravityModifier < -1) currentZGravityModifier = -1;

  const entities = GlobalVars.getAllEntities({
    excludeTypes: ["minecraft:xp_orb", "minecraft:item"],
  });
  for (const entity of entities) {
    try {
      entity.applyKnockback(
        currentXGravityModifier,
        currentZGravityModifier,
        gravityShiftHorizontalMultiplier,
        currentYGravityModifier * gravityShiftVerticalMultiplier
      );
    } catch {
      //Logger.warn(`Gravity Shift Failed: ${entity.typeId}`);
    }
  }
};

export const gravityShift: IChaosEvent = {
  chaosEventDisplayName: "Gravity Shift",
  chaosEventId: "gravityShift",
  chaosEventUniqueId: "-1",
  chaosEventTime: 200,
  onChaosStart: () => {},
  onChaosStop: () => {},
  onChaosTick: gravityShiftTick,
};

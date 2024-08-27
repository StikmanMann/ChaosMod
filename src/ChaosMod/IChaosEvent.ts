export interface IChaosEvent {
  chaosEventId: String;
  chaosEventDisplayName: String;

  /** set this to "-1" - this value will be assigned later (tbh it doesnt matter lol)*/
  chaosEventUniqueId: String;

  /** Amount of ticks until the event gets stopped */
  chaosEventTime: number;

  /** Amount of ticks for the next event to start */
  timeTillNextEventOverride?: number;

  onChaosStart?: () => void;
  onChaosStop?: () => void;
  onChaosTick?: () => void;
}

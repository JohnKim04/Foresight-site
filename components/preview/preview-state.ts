export const PREVIEW_STEPS = ["log", "clarify", "check-in", "patterns"] as const;

export type PreviewStep = (typeof PREVIEW_STEPS)[number];
export type EnergyLevel = "Low" | "Steady" | "High";
export type CheckInResponse = (typeof CHECK_IN_RESPONSES)[number];

export type PreviewFields = {
  activity: string;
  duration: string;
  startingEnergy: EnergyLevel;
  outcome: string;
};

export type PreviewState = {
  step: PreviewStep;
  fields: PreviewFields;
  checkIn: CheckInResponse | null;
};

export type PreviewAction =
  | { type: "update-field"; field: Exclude<keyof PreviewFields, "startingEnergy">; value: string }
  | { type: "set-energy"; value: EnergyLevel }
  | { type: "set-check-in"; value: CheckInResponse }
  | { type: "next" }
  | { type: "back" }
  | { type: "restart" };

export const SOURCE_NOTE =
  "I almost skipped my workout today, but I did 30 minutes after work. I was low-energy going in and felt calmer afterward.";

export const PATTERN_STATEMENT =
  "In 7 of 9 confirmed after-work workouts, you felt calmer later that evening.";

export const PATTERN_QUALIFIER =
  "This is an association from confirmed example data, not a cause-and-effect conclusion.";

export const ENERGY_LEVELS: readonly EnergyLevel[] = ["Low", "Steady", "High"];

export const CHECK_IN_RESPONSES = [
  "Much worse",
  "A little worse",
  "No change",
  "A little calmer",
  "Much calmer",
] as const;

export const DEFAULT_FIELDS: PreviewFields = {
  activity: "After-work workout",
  duration: "30 minutes",
  startingEnergy: "Low",
  outcome: "Felt calmer afterward.",
};

export function createInitialPreviewState(): PreviewState {
  return {
    step: "log",
    fields: { ...DEFAULT_FIELDS },
    checkIn: null,
  };
}

export function previewReducer(state: PreviewState, action: PreviewAction): PreviewState {
  switch (action.type) {
    case "update-field":
      return { ...state, fields: { ...state.fields, [action.field]: action.value } };
    case "set-energy":
      return { ...state, fields: { ...state.fields, startingEnergy: action.value } };
    case "set-check-in":
      return { ...state, checkIn: action.value };
    case "next": {
      if (state.step === "check-in" && !state.checkIn) return state;
      const stepIndex = PREVIEW_STEPS.indexOf(state.step);
      const nextStep = PREVIEW_STEPS[stepIndex + 1];
      return nextStep ? { ...state, step: nextStep } : state;
    }
    case "back": {
      const stepIndex = PREVIEW_STEPS.indexOf(state.step);
      const previousStep = PREVIEW_STEPS[stepIndex - 1];
      return previousStep ? { ...state, step: previousStep } : state;
    }
    case "restart":
      return createInitialPreviewState();
  }
}

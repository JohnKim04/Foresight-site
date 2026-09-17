export const PREVIEW_STEPS = ["log", "schedule", "check-in", "patterns"] as const;

export type PreviewStep = (typeof PREVIEW_STEPS)[number];
export type PreviewCategory = "Workout" | "Work" | "Social";
export type PreviewSchedule = "Later today" | "Tomorrow morning" | "Tomorrow evening";
export type CheckInResponse = (typeof CHECK_IN_RESPONSES)[number];

export type PreviewState = {
  step: PreviewStep;
  note: string;
  category: PreviewCategory;
  schedule: PreviewSchedule;
  checkIn: CheckInResponse | null;
};

export type PreviewAction =
  | { type: "set-note"; value: string }
  | { type: "set-category"; value: PreviewCategory }
  | { type: "set-schedule"; value: PreviewSchedule }
  | { type: "set-check-in"; value: CheckInResponse }
  | { type: "next" | "back" | "restart" };

export const SOURCE_NOTE = "I almost skipped my workout today, but I did 30 minutes after work. I was low-energy going in and felt better afterward.";
export const PATTERN_STATEMENT = "Workout was followed by feeling better in 10 of 12 later check-ins.";
export const PATTERN_QUALIFIER = "Sample history. Foresight describes associations in your records, not causes.";

export const PREVIEW_CATEGORIES: readonly PreviewCategory[] = ["Workout", "Work", "Social"];
export const PREVIEW_SCHEDULES: readonly PreviewSchedule[] = ["Later today", "Tomorrow morning", "Tomorrow evening"];
export const CHECK_IN_RESPONSES = ["Much worse", "A little worse", "About the same", "A little better", "Much better", "Not sure"] as const;

export function createInitialPreviewState(): PreviewState {
  return { step: "log", note: SOURCE_NOTE, category: "Workout", schedule: "Tomorrow morning", checkIn: null };
}

export function previewReducer(state: PreviewState, action: PreviewAction): PreviewState {
  switch (action.type) {
    case "set-note": return { ...state, note: action.value };
    case "set-category": return { ...state, category: action.value };
    case "set-schedule": return { ...state, schedule: action.value };
    case "set-check-in": return { ...state, checkIn: action.value };
    case "next": {
      if (state.step === "log" && !state.note.trim()) return state;
      if (state.step === "check-in" && !state.checkIn) return state;
      const nextStep = PREVIEW_STEPS[PREVIEW_STEPS.indexOf(state.step) + 1];
      return nextStep ? { ...state, step: nextStep } : state;
    }
    case "back": {
      const previousStep = PREVIEW_STEPS[PREVIEW_STEPS.indexOf(state.step) - 1];
      return previousStep ? { ...state, step: previousStep } : state;
    }
    case "restart": return createInitialPreviewState();
  }
}

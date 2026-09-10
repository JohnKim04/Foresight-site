import { describe, expect, it } from "vitest";
import {
  CHECK_IN_RESPONSES,
  createInitialPreviewState,
  DEFAULT_FIELDS,
  PATTERN_QUALIFIER,
  PATTERN_STATEMENT,
  previewReducer,
} from "@/components/preview/preview-state";

describe("previewReducer", () => {
  it("creates the approved default fictional record", () => {
    expect(createInitialPreviewState()).toEqual({ step: "log", fields: DEFAULT_FIELDS, checkIn: null });
  });

  it("moves through Log, Clarify, and Check in", () => {
    const clarify = previewReducer(createInitialPreviewState(), { type: "next" });
    const checkIn = previewReducer(clarify, { type: "next" });

    expect(clarify.step).toBe("clarify");
    expect(checkIn.step).toBe("check-in");
  });

  it("does not reveal Patterns until a check-in response is selected", () => {
    const checkIn = { ...createInitialPreviewState(), step: "check-in" as const };

    expect(previewReducer(checkIn, { type: "next" })).toEqual(checkIn);
  });

  it("preserves edits and the selected response when navigating back", () => {
    const clarified = previewReducer(
      previewReducer(createInitialPreviewState(), { type: "next" }),
      { type: "update-field", field: "activity", value: "Evening run" },
    );
    const checkIn = previewReducer(clarified, { type: "next" });
    const answered = previewReducer(checkIn, { type: "set-check-in", value: CHECK_IN_RESPONSES[3] });
    const patterns = previewReducer(answered, { type: "next" });
    const backToCheckIn = previewReducer(patterns, { type: "back" });
    const backToClarify = previewReducer(backToCheckIn, { type: "back" });

    expect(backToClarify.fields.activity).toBe("Evening run");
    expect(backToClarify.checkIn).toBe("A little better");
  });

  it("restarts with default fields and no selected check-in", () => {
    const changedState = {
      ...createInitialPreviewState(),
      step: "patterns" as const,
      fields: { ...DEFAULT_FIELDS, duration: "45 minutes" },
      checkIn: CHECK_IN_RESPONSES[4],
    };

    expect(previewReducer(changedState, { type: "restart" })).toEqual(createInitialPreviewState());
  });

  it("keeps the approved association-only evidence copy", () => {
    expect(PATTERN_STATEMENT).toBe("In 7 of 9 confirmed after-work workouts, you felt better later that evening.");
    expect(PATTERN_QUALIFIER).toBe("This is an association from confirmed example data, not a cause-and-effect conclusion.");
  });
});

import { describe, expect, it } from "vitest";
import { createInitialPreviewState, PATTERN_STATEMENT, previewReducer } from "@/components/preview/preview-state";

describe("current-app preview", () => {
  it("requires a journal entry before scheduling and a response before patterns", () => {
    const emptyLog = previewReducer(createInitialPreviewState(), { type: "set-note", value: "   " });
    expect(previewReducer(emptyLog, { type: "next" }).step).toBe("log");

    const schedule = previewReducer(createInitialPreviewState(), { type: "next" });
    const checkIn = previewReducer(schedule, { type: "next" });
    expect(schedule.step).toBe("schedule");
    expect(previewReducer(checkIn, { type: "next" }).step).toBe("check-in");
    expect(previewReducer(previewReducer(checkIn, { type: "set-check-in", value: "Not sure" }), { type: "next" }).step).toBe("patterns");
  });

  it("keeps edits while going back and clears them on restart", () => {
    const edited = previewReducer(
      previewReducer(createInitialPreviewState(), { type: "set-category", value: "Social" }),
      { type: "set-note", value: "Had dinner with friends." },
    );
    const scheduled = previewReducer(previewReducer(edited, { type: "next" }), { type: "set-schedule", value: "Later today" });
    const back = previewReducer(previewReducer(scheduled, { type: "next" }), { type: "back" });
    expect(back).toMatchObject({ step: "schedule", note: "Had dinner with friends.", category: "Social", schedule: "Later today" });
    expect(previewReducer(back, { type: "restart" })).toEqual(createInitialPreviewState());
  });

  it("uses a sample pattern observed in the native QA fixtures", () => {
    expect(PATTERN_STATEMENT).toBe("Workout was followed by feeling better in 10 of 12 later check-ins.");
  });
});

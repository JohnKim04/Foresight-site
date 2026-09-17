"use client";

import { useEffect, useReducer, useRef, useState, type Dispatch } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CHECK_IN_RESPONSES, createInitialPreviewState, PATTERN_QUALIFIER, PATTERN_STATEMENT,
  PREVIEW_CATEGORIES, PREVIEW_SCHEDULES, PREVIEW_STEPS, previewReducer,
  type PreviewAction, type PreviewState,
} from "./preview-state";

const STEP_LABELS = { log: "Log", schedule: "Schedule", "check-in": "Check in", patterns: "Patterns" } as const;

export function GuidedPreview() {
  const [state, dispatch] = useReducer(previewReducer, undefined, createInitialPreviewState);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [focusToken, setFocusToken] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const stepIndex = PREVIEW_STEPS.indexOf(state.step);
  const stepLabel = STEP_LABELS[state.step];

  function move(type: "next" | "back" | "restart") {
    setFocusToken((value) => value + 1);
    dispatch({ type });
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-sm font-medium text-indigo">{stepIndex + 1} of 4 · {stepLabel}</p>
          <p className="mt-1 text-sm text-muted-foreground">Interactive illustration · nothing is saved</p>
        </div>
        <span className="rounded-full bg-sage/25 px-3 py-1 text-xs font-medium text-ink">Sample data</span>
      </div>

      <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="Preview steps">
        {PREVIEW_STEPS.map((step, index) => (
          <li key={step} aria-current={step === state.step ? "step" : undefined}>
            <span className="mb-2 block text-center text-xs text-muted-foreground sm:text-sm">{STEP_LABELS[step]}</span>
            <span className={`block h-1.5 rounded-full ${index <= stepIndex ? "bg-indigo" : "bg-border"}`} />
          </li>
        ))}
      </ol>
      <Progress value={(stepIndex + 1) * 25} aria-label={`${stepLabel}: ${stepIndex + 1} of 4`} className="sr-only" />
      <p className="sr-only" aria-live="polite">Step {stepIndex + 1} of 4: {stepLabel}.</p>

      <AnimatePresence initial={false} mode="wait">
        <motion.div key={state.step} className="mt-8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}>
          <PreviewStepContent state={state} headingRef={headingRef} dispatch={dispatch} focusToken={focusToken} />
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <div>{stepIndex > 0 ? <Button type="button" variant="ghost" onClick={() => move("back")}><ArrowLeft aria-hidden="true" />Back</Button> : null}</div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ghost" onClick={() => move("restart")}><RotateCcw aria-hidden="true" />Restart preview</Button>
          {state.step !== "patterns" ? (
            <Button type="button" onClick={() => move("next")} disabled={(state.step === "log" && !state.note.trim()) || (state.step === "check-in" && !state.checkIn)}>
              {state.step === "log" ? "Schedule a check-in" : state.step === "schedule" ? "Continue to check-in" : "See sample pattern"}
              <ArrowRight aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PreviewStepContent({ state, headingRef, dispatch, focusToken }: { state: PreviewState; headingRef: React.RefObject<HTMLHeadingElement | null>; dispatch: Dispatch<PreviewAction>; focusToken: number }) {
  useEffect(() => {
    if (focusToken > 0) headingRef.current?.focus();
  }, [focusToken, headingRef]);

  if (state.step === "log") {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">Write what happened.</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Keep your own words, then add a category if it helps you find this moment later.</p>
        <label className="mt-5 block text-sm font-medium text-ink">Journal entry
          <textarea className="mt-2 min-h-28 w-full rounded-lg border border-border bg-canvas p-4 text-base leading-7 text-ink" value={state.note} onChange={(event) => dispatch({ type: "set-note", value: event.target.value })} maxLength={5000} />
        </label>
        <fieldset className="mt-5"><legend className="text-sm font-medium text-ink">Category</legend><div className="mt-2 flex flex-wrap gap-2">
          {PREVIEW_CATEGORIES.map((category) => <label key={category} className="cursor-pointer"><input className="peer sr-only" type="radio" name="preview-category" value={category} checked={state.category === category} onChange={() => dispatch({ type: "set-category", value: category })} /><span className="block rounded-full border border-border px-4 py-2 text-sm text-muted-foreground peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo">{category}</span></label>)}
        </div></fieldset>
      </div>
    );
  }

  if (state.step === "schedule") {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">Return when the effect is clearer.</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">In the app, you can check in right away or schedule a later response. Scheduled check-ins appear in the app.</p>
        <fieldset className="mt-6"><legend className="text-sm font-medium text-ink">Example follow-up time</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">
          {PREVIEW_SCHEDULES.map((schedule) => <label key={schedule} className="cursor-pointer"><input className="peer sr-only" type="radio" name="preview-schedule" value={schedule} checked={state.schedule === schedule} onChange={() => dispatch({ type: "set-schedule", value: schedule })} /><span className="flex min-h-14 items-center justify-center rounded-md border border-border px-3 py-3 text-center text-sm text-muted-foreground peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo">{schedule}</span></label>)}
        </div></fieldset>
        <p className="mt-5 rounded-lg bg-sage/15 p-4 text-sm leading-6 text-ink">Your {state.category.toLowerCase()} log would appear in the Check In queue for {state.schedule.toLowerCase()}.</p>
      </div>
    );
  }

  if (state.step === "check-in") {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">How did it feel later?</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose a response. In the app, you can add a note, edit your answer, or leave an atypical response out of summaries.</p>
        <fieldset className="mt-6"><legend className="sr-only">Later check-in response</legend><div className="grid gap-2 sm:grid-cols-3">
          {CHECK_IN_RESPONSES.map((response) => <label key={response} className="cursor-pointer"><input className="peer sr-only" type="radio" name="later-check-in" value={response} checked={state.checkIn === response} onChange={() => dispatch({ type: "set-check-in", value: response })} /><span className="flex min-h-14 items-center justify-center rounded-md border border-border px-3 py-3 text-center text-sm text-muted-foreground peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo">{response}</span></label>)}
        </div></fieldset>
      </div>
    );
  }

  return (
    <div>
      <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">See what repeats across logs.</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Your example response: {state.checkIn}. A single answer does not create a pattern.</p>
      <div className="mt-6 rounded-lg border border-sage bg-sage/15 p-5"><p className="text-xs font-bold uppercase tracking-wide text-indigo">Separate sample history · Workout · Later</p><p className="mt-3 text-lg leading-8 text-ink">{PATTERN_STATEMENT}</p></div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{PATTERN_QUALIFIER} The app links summaries back to their source logs.</p>
    </div>
  );
}

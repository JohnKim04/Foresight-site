"use client";

import { useEffect, useReducer, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  CHECK_IN_RESPONSES,
  createInitialPreviewState,
  ENERGY_LEVELS,
  PATTERN_QUALIFIER,
  PATTERN_STATEMENT,
  PREVIEW_STEPS,
  previewReducer,
  SOURCE_NOTE,
  type CheckInResponse,
  type EnergyLevel,
} from "./preview-state";

const STEP_LABELS = {
  log: "Log",
  clarify: "Clarify",
  "check-in": "Check in",
  patterns: "Patterns",
} as const;

export function GuidedPreview() {
  const [state, dispatch] = useReducer(previewReducer, undefined, createInitialPreviewState);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const stepIndex = PREVIEW_STEPS.indexOf(state.step);
  const stepLabel = STEP_LABELS[state.step];

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    headingRef.current?.focus();
  }, [state.step]);

  const status =
    state.step === "patterns"
      ? "Step 4 of 4: Patterns. Example pattern ready."
      : `Step ${stepIndex + 1} of 4: ${stepLabel}.`;

  const content = (
    <PreviewStepContent
      state={state}
      headingRef={headingRef}
      onUpdateField={(field, value) => dispatch({ type: "update-field", field, value })}
      onSetEnergy={(value) => dispatch({ type: "set-energy", value })}
      onSetCheckIn={(value) => dispatch({ type: "set-check-in", value })}
    />
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-sm font-medium text-indigo">
            {stepIndex + 1} of 4 · {stepLabel}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Simulated preview · no data is collected</p>
        </div>
        <span className="rounded-full bg-sage/25 px-3 py-1 text-xs font-medium text-ink">Fictional example</span>
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
      <p className="sr-only" aria-live="polite">{status}</p>

      <AnimatePresence initial={false} mode="wait">
        {shouldReduceMotion ? (
          <div key={state.step} className="mt-8">{content}</div>
        ) : (
          <motion.div
            key={state.step}
            className="mt-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <div>
          {stepIndex > 0 ? (
            <Button type="button" variant="ghost" onClick={() => dispatch({ type: "back" })}>
              <ArrowLeft aria-hidden="true" />
              Back
            </Button>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ghost" onClick={() => dispatch({ type: "restart" })}>
            <RotateCcw aria-hidden="true" />
            Restart preview
          </Button>
          {state.step !== "patterns" ? (
            <Button
              type="button"
              onClick={() => dispatch({ type: "next" })}
              disabled={state.step === "check-in" && !state.checkIn}
            >
              {nextButtonLabel(state.step)}
              <ArrowRight aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type PreviewStepContentProps = {
  state: ReturnType<typeof createInitialPreviewState>;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onUpdateField: (field: "activity" | "duration" | "outcome", value: string) => void;
  onSetEnergy: (value: EnergyLevel) => void;
  onSetCheckIn: (value: CheckInResponse) => void;
};

function PreviewStepContent({ state, headingRef, onUpdateField, onSetEnergy, onSetCheckIn }: PreviewStepContentProps) {
  if (state.step === "log") {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">Capture the moment as it happened.</h3>
        <blockquote className="mt-5 max-w-2xl border-l-2 border-sage pl-5 text-lg leading-8 text-ink">“{SOURCE_NOTE}”</blockquote>
      </div>
    );
  }

  if (state.step === "clarify") {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">Confirm what this note means.</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Suggestions are editable and stay in this browser only.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <EditableField id="preview-activity" label="Activity" value={state.fields.activity} onChange={(value) => onUpdateField("activity", value)} />
          <EditableField id="preview-duration" label="Duration" value={state.fields.duration} onChange={(value) => onUpdateField("duration", value)} />
          <EditableField id="preview-outcome" label="Outcome" value={state.fields.outcome} onChange={(value) => onUpdateField("outcome", value)} />
          <fieldset className="min-w-0">
            <legend className="text-sm font-medium text-ink">Starting energy</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {ENERGY_LEVELS.map((level) => (
                <label key={level} className="cursor-pointer">
                  <input className="peer sr-only" type="radio" name="starting-energy" value={level} checked={state.fields.startingEnergy === level} onChange={() => onSetEnergy(level)} />
                  <span className="block rounded-full border border-border px-3 py-2 text-sm text-muted-foreground peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-primary-foreground">{level}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    );
  }

  if (state.step === "check-in") {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">How did the workout affect your evening?</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose a response to complete this fictional example.</p>
        <fieldset className="mt-6">
          <legend className="sr-only">Evening check-in response</legend>
          <div className="grid gap-2 sm:grid-cols-5">
            {CHECK_IN_RESPONSES.map((response) => (
              <label key={response} className="cursor-pointer">
                <input className="peer sr-only" type="radio" name="evening-check-in" value={response} checked={state.checkIn === response} onChange={() => onSetCheckIn(response)} />
                <span className="flex min-h-16 items-center justify-center rounded-md border border-border px-3 py-3 text-center text-sm leading-5 text-muted-foreground peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-primary-foreground">{response}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  return (
    <div>
      <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl tracking-tight text-ink">A pattern worth revisiting.</h3>
      <div className="mt-6 rounded-lg border border-sage bg-sage/15 p-5">
        <div className="flex items-start gap-3"><Sparkles aria-hidden="true" className="mt-1 size-4 shrink-0 text-indigo" /><p className="text-lg leading-8 text-ink">{PATTERN_STATEMENT}</p></div>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{PATTERN_QUALIFIER}</p>
    </div>
  );
}

function EditableField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-medium text-ink">{label}<Input id={id} className="mt-2 bg-canvas" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function nextButtonLabel(step: Exclude<(typeof PREVIEW_STEPS)[number], "patterns">) {
  switch (step) {
    case "log": return "Continue to clarify";
    case "clarify": return "Confirm details";
    case "check-in": return "See example pattern";
  }
}

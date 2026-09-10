import type { ReactNode } from "react";

type PreviewShellProps = {
  children: ReactNode;
};

/** Visual container reserved for the client-side preview in Stage 3. */
export function PreviewShell({ children }: PreviewShellProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-elevated md:p-8">
      {children}
    </div>
  );
}

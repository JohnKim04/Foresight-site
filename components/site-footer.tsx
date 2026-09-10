import type { ReactNode } from "react";

type SiteFooterProps = {
  children?: ReactNode;
};

/** Shared shell boundary for the Stage 2 footer content. */
export function SiteFooter({ children }: SiteFooterProps) {
  return <footer className="site-container border-t border-border">{children}</footer>;
}

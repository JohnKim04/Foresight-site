import type { ReactNode } from "react";

type SiteHeaderProps = {
  children?: ReactNode;
};

/** Shared shell boundary for the Stage 2 navigation. */
export function SiteHeader({ children }: SiteHeaderProps) {
  return <header className="site-container">{children}</header>;
}

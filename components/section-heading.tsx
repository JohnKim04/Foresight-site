type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

/** Reusable semantic heading block for editorial page sections. */
export function SectionHeading({ title, eyebrow, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-sm font-medium text-indigo">{eyebrow}</p> : null}
      <h2 className="mt-2 font-display text-4xl tracking-tight text-ink">{title}</h2>
      {description ? (
        <p className="mt-3 text-lg leading-8 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

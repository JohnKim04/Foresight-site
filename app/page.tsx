import { ArrowDownRight, ChartNoAxesCombined, Clock3, PenLine, Sparkles } from "lucide-react";
import { MobileAppPreview } from "@/components/mobile-app-preview";
import { PreviewShell } from "@/components/preview-shell";
import { GuidedPreview } from "@/components/preview/guided-preview";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const howItWorks = [
  { title: "Capture", description: "Write what happened in your own words today; voice capture is next.", availability: "Writing available · Voice planned", icon: PenLine },
  { title: "Clarify", description: "Review suggested details before they become part of a future structured record.", availability: "AI-assisted review planned", icon: Sparkles },
  { title: "Check in", description: "Return later to note what changed after the moment, when that context matters.", availability: "Planned", icon: Clock3 },
  { title: "Reflect", description: "Review literal activity counts today, with richer confirmed reflections planned next.", availability: "Trends available · Evolving", icon: ChartNoAxesCombined },
];

const principles = [
  "Original words remain visible.",
  "AI suggestions are editable.",
  "Only confirmed records inform patterns.",
  "Future nudges are opt-in and explainable.",
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <SiteHeader>
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border py-4">
          <a href="#top" className="group flex items-center gap-2 rounded-sm font-display text-2xl tracking-tight text-ink" aria-label="Foresight home">
            <span className="relative grid size-5 place-items-center" aria-hidden="true">
              <span className="absolute size-4 rotate-45 rounded-[0.2rem] border border-indigo bg-sage/70" />
              <span className="absolute size-1.5 rounded-full bg-indigo" />
            </span>
            Foresight
          </a>
          <nav aria-label="Primary navigation" className="order-3 w-full sm:order-none sm:w-auto">
            <ul className="flex items-center justify-between gap-4 text-sm text-muted-foreground sm:justify-start sm:gap-6">
              <li><a className="rounded-sm hover:text-ink" href="#how-it-works">How it works</a></li>
              <li><a className="rounded-sm hover:text-ink" href="#app">The app</a></li>
              <li><a className="rounded-sm hover:text-ink" href="#preview">Preview</a></li>
              <li><a className="rounded-sm hover:text-ink" href="#principles">Principles</a></li>
            </ul>
          </nav>
          <span className="rounded-full border border-sage bg-sage/20 px-3 py-1 text-xs font-medium text-ink">Mobile MVP available</span>
        </div>
      </SiteHeader>

      <main>
        <section className="site-container grid items-center gap-12 py-section md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.84fr)] md:gap-16" aria-labelledby="hero-heading">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-indigo">A consequence journal</p>
            <h1 id="hero-heading" className="mt-4 font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">Notice what your choices change.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Start by writing down what happened. Today&apos;s mobile journal keeps your own words, optional categories, and simple activity Trends; voice, AI-assisted clarity, and follow-up check-ins are where Foresight is headed.</p>
            <a href="#preview" className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated hover:bg-indigo/90">
              Explore the preview <ArrowDownRight aria-hidden="true" className="size-4" />
            </a>
            <a href="https://github.com/JohnKim04/Foresight" target="_blank" rel="noreferrer" className="ml-4 inline-flex items-center gap-2 text-sm font-medium text-indigo hover:text-ink">
              <ArrowDownRight aria-hidden="true" className="size-4" />View the app on GitHub
            </a>
          </div>
          <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -rotate-3 rounded-xl border border-sage/60 bg-sage/20" />
            <div className="relative rounded-xl border border-border bg-card p-5 shadow-elevated sm:p-7">
              <div className="flex items-center justify-between text-xs font-medium tracking-wide text-muted-foreground"><span>THIS EVENING</span><span className="rounded-full bg-sage/30 px-2 py-1 text-ink">confirmed</span></div>
              <div className="mt-7 space-y-3"><div className="h-2 w-4/5 rounded-full bg-ink/80" /><div className="h-2 w-full rounded-full bg-ink/15" /><div className="h-2 w-3/5 rounded-full bg-ink/15" /></div>
              <div className="mt-8 rounded-lg border border-border bg-canvas p-4"><div className="flex items-end gap-2"><span className="h-8 w-2 rounded-t-sm bg-sage" /><span className="h-12 w-2 rounded-t-sm bg-sage" /><span className="h-7 w-2 rounded-t-sm bg-sage" /><span className="h-16 w-2 rounded-t-sm bg-indigo" /><span className="h-11 w-2 rounded-t-sm bg-sage" /><span className="h-20 w-2 rounded-t-sm bg-indigo" /><span className="h-14 w-2 rounded-t-sm bg-sage" /></div><div className="mt-3 h-px w-full bg-border" /></div>
            </div>
          </div>
        </section>

        <section id="app" className="border-y border-border bg-sage/10 py-section" aria-labelledby="app-heading">
          <div className="site-container">
            <SectionHeading id="app-heading" title="The app, today." eyebrow="Mobile MVP" description="The current iOS and Android experience keeps journaling focused: write freely, add categories when they help, and view literal activity Trends." />
            <div className="mt-8 flex flex-wrap gap-4"><a href="https://github.com/JohnKim04/Foresight" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated hover:bg-indigo/90"><ArrowDownRight aria-hidden="true" className="size-4" />View app source</a><a href="#preview" className="inline-flex items-center gap-2 rounded-full border border-indigo px-5 py-3 text-sm font-medium text-indigo hover:bg-card">See what&apos;s next <ArrowDownRight aria-hidden="true" className="size-4" /></a></div>
            <div className="mt-10"><MobileAppPreview /></div>
          </div>
        </section>

        <section id="how-it-works" className="site-container py-section" aria-labelledby="how-it-works-heading">
          <SectionHeading id="how-it-works-heading" title="A small practice of paying attention." eyebrow="How it works" description="Start with the moments you would otherwise lose track of. The MVP is simple by design; the longer-term practice adds context over time." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map(({ title, description, availability, icon: Icon }) => (
              <Card key={title} className="border border-border shadow-none">
                <CardHeader><span className="mb-3 grid size-9 place-items-center rounded-md bg-sage/30 text-indigo"><Icon aria-hidden="true" className="size-4" /></span><CardTitle className="font-display text-2xl tracking-tight">{title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-6 text-muted-foreground">{description}</p><p className="mt-4 text-xs font-medium text-indigo">{availability}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="preview" className="site-container py-section" aria-labelledby="preview-heading">
          <SectionHeading id="preview-heading" title="A clearer return to a familiar moment." eyebrow="Future product preview" description="A fictional preview of the voice, AI-assisted, and follow-up workflow Foresight is building toward. These steps are not in today&apos;s mobile MVP." />
          <div className="mt-10 max-w-3xl">
            <PreviewShell>
              <GuidedPreview />
            </PreviewShell>
          </div>
        </section>

        <section id="principles" className="border-y border-border bg-sage/10 py-section" aria-labelledby="principles-heading">
          <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-start">
            <SectionHeading id="principles-heading" title="Evidence should stay human." eyebrow="Principles" description="The useful part of reflection is not a verdict. It is a record you can understand and challenge—whether it is written today or enriched by future tools." />
            <ul className="grid gap-3 sm:grid-cols-2" role="list">
              {principles.map((principle, index) => <li key={principle} className="rounded-lg border border-border bg-card px-5 py-5 text-sm leading-6 text-ink shadow-sm"><span className="mr-3 font-display text-lg text-indigo">0{index + 1}</span>{principle}</li>)}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter>
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="font-display text-2xl tracking-tight text-ink">Foresight</span><span className="rounded-full border border-sage bg-sage/20 px-3 py-1 text-xs font-medium text-ink">Mobile MVP available</span></div><p className="max-w-md text-sm leading-6 text-muted-foreground">The current MVP includes writing, optional categories, and Trends. This simulated preview shows the planned direction and is not medical advice.</p></div>
      </SiteFooter>
    </div>
  );
}

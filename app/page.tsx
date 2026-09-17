import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, BookOpenText, CalendarClock, ChartNoAxesCombined, Mic2, Sparkles, BellRing } from "lucide-react";
import { MobileAppPreview } from "@/components/mobile-app-preview";
import { PreviewShell } from "@/components/preview-shell";
import { GuidedPreview } from "@/components/preview/guided-preview";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";

const currentFeatures = [
  {
    title: "Keep the whole story",
    icon: BookOpenText,
    description: "Write a free-form log in your own words. Add categories if useful, then edit, search, filter, or browse it by day on a timeline or calendar.",
    detail: "Journal · available in the iOS build",
  },
  {
    title: "Return at the right time",
    icon: CalendarClock,
    description: "Record how you feel right after a moment or schedule a later check-in. The in-app queue shows due and upcoming responses; you can answer early, reschedule, skip, edit, or add a note.",
    detail: "Check In · available in the iOS build",
  },
  {
    title: "Inspect what repeats",
    icon: ChartNoAxesCombined,
    description: "See weekly and monthly activity, outcome mixes, changes over time, and immediate versus later responses. Summaries use conservative evidence thresholds and link to source logs.",
    detail: "Patterns · available in the iOS build",
  },
] as const;

const plannedFeatures = [
  { title: "Speak a log", icon: Mic2, description: "Voice capture and transcription would make it easier to record a moment while it is still fresh." },
  { title: "Review AI suggestions", icon: Sparkles, description: "AI could propose categories, context, feelings, and outcomes from a free-form entry. Your original words stay visible, and every suggestion remains editable before it is used." },
  { title: "Get a timely nudge", icon: BellRing, description: "Opt-in notifications could invite a check-in or point to a pattern you have established in your own confirmed history, with an explanation of why it appeared." },
] as const;

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <SiteHeader>
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border py-4">
          <a href="#top" className="flex items-center gap-2 rounded-sm font-display text-2xl tracking-tight text-ink" aria-label="Foresight home">
            <Image src="/app-icon.png" width={32} height={32} alt="" className="size-8 rounded-lg" />Foresight
          </a>
          <nav aria-label="Primary navigation" className="order-3 w-full sm:order-none sm:w-auto">
            <ul className="flex items-center justify-between gap-3 text-sm text-muted-foreground sm:justify-start sm:gap-6">
              <li><a className="rounded-sm hover:text-ink" href="#app">The app</a></li>
              <li><a className="rounded-sm hover:text-ink" href="#features">Features</a></li>
              <li><a className="rounded-sm hover:text-ink" href="#preview">Try the flow</a></li>
              <li><a className="rounded-sm hover:text-ink" href="#vision">What&apos;s next</a></li>
            </ul>
          </nav>
          <span className="rounded-full border border-sage bg-sage/20 px-3 py-1 text-xs font-medium text-ink">Native iOS project</span>
        </div>
      </SiteHeader>

      <main>
        <section className="site-container grid items-center gap-12 py-section md:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.85fr)] md:gap-16" aria-labelledby="hero-heading">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo">A consequence journal</p>
            <h1 id="hero-heading" className="mt-4 font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">Notice what follows.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Foresight helps you capture what happened, check in after its effects become clearer, and see patterns in your own history. The native iOS build already includes Journal, Check In, and Patterns.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#app" className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated hover:bg-indigo/90">Explore the iOS app <ArrowDownRight aria-hidden="true" className="size-4" /></a>
              <a href={siteConfig.links.iosSource} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-indigo hover:text-ink">View iOS source <ArrowUpRight aria-hidden="true" className="size-4" /></a>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">The project can be built from source. There is no App Store or TestFlight release yet.</p>
          </div>
          <div className="relative mx-auto w-full max-w-md" aria-label="Foresight product flow">
            <div className="absolute -inset-4 -rotate-3 rounded-[2rem] border border-sage/60 bg-sage/20" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-border bg-card p-7 shadow-elevated sm:p-9">
              <div className="flex items-center gap-4"><Image src="/app-icon.png" alt="Foresight app icon" width={64} height={64} className="size-16 rounded-2xl shadow-sm" /><div><p className="font-display text-2xl text-ink">Foresight</p><p className="text-sm text-muted-foreground">Native iOS · active development</p></div></div>
              <div className="mt-8 space-y-3">
                <FlowStep number="01" title="Journal" detail="Capture a moment" />
                <FlowStep number="02" title="Check In" detail="Reflect now or later" />
                <FlowStep number="03" title="Patterns" detail="Review the evidence" />
              </div>
              <p className="mt-7 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">Your entries stay on the device. No account or network connection is needed for the current core experience.</p>
            </div>
          </div>
        </section>

        <section id="app" className="border-y border-border bg-sage/10 py-section" aria-labelledby="app-heading">
          <div className="site-container">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading id="app-heading" title="The app, as it is today." eyebrow="Current iOS build" description="Three connected views make it possible to trace an action from your original note to a later reflection and the evidence behind a pattern." />
              <a href={siteConfig.links.iosSource} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-indigo px-5 py-3 text-sm font-medium text-indigo hover:bg-card">Open the iOS repository <ArrowUpRight aria-hidden="true" className="size-4" /></a>
            </div>
            <div className="mt-12"><MobileAppPreview /></div>
          </div>
        </section>

        <section id="features" className="site-container py-section" aria-labelledby="features-heading">
          <SectionHeading id="features-heading" title="From a moment to a useful record." eyebrow="Available now" description="The current app is built around deliberate, editable records and source-backed summaries." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {currentFeatures.map(({ title, icon: Icon, description, detail }) => (
              <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="grid size-11 place-items-center rounded-lg bg-sage/25 text-indigo"><Icon aria-hidden="true" className="size-5" /></span>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                <p className="mt-6 border-t border-border pt-4 text-xs font-bold uppercase tracking-[0.1em] text-indigo">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">A pattern is described only after at least five rated check-ins, and only when the response direction is consistent enough to report. Foresight describes associations, never causes. You can leave an unusual response out of summaries without removing the original record.</p>
        </section>

        <section id="preview" className="border-y border-border bg-sage/10 py-section" aria-labelledby="preview-heading">
          <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-14">
            <div><SectionHeading id="preview-heading" title="Try the journey." eyebrow="Interactive illustration" description="Walk through a sample log, a scheduled check-in, and a pattern from fictional history. The illustration follows features in the current app; it does not save your input." /></div>
            <PreviewShell><GuidedPreview /></PreviewShell>
          </div>
        </section>

        <section id="vision" className="site-container py-section" aria-labelledby="vision-heading">
          <SectionHeading id="vision-heading" title="Where Foresight is headed." eyebrow="Planned capabilities" description="The longer-term vision adds easier capture and timely help while keeping the person in control of the record and its interpretation." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plannedFeatures.map(({ title, icon: Icon, description }) => (
              <article key={title} className="rounded-xl border border-sage/60 bg-sage/10 p-6">
                <Icon aria-hidden="true" className="size-6 text-indigo" />
                <h3 className="mt-5 font-display text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-indigo">Planned · not in the current build</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">Voice, AI-assisted interpretation, and operating-system notifications are future work. Today, logs and categories are entered manually, and scheduled check-ins appear inside the app.</p>
        </section>
      </main>

      <SiteFooter>
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><Image src="/app-icon.png" width={32} height={32} alt="" className="size-8 rounded-lg" /><span className="font-display text-2xl tracking-tight text-ink">Foresight</span></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm"><a className="text-indigo hover:text-ink" href={siteConfig.links.iosSource} target="_blank" rel="noreferrer">Native iOS source ↗</a><a className="text-indigo hover:text-ink" href={siteConfig.links.mobileSource} target="_blank" rel="noreferrer">React Native source ↗</a><a className="text-indigo hover:text-ink" href={siteConfig.links.siteSource} target="_blank" rel="noreferrer">Website source ↗</a></div>
        </div>
      </SiteFooter>
    </div>
  );
}

function FlowStep({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <div className="flex items-center gap-4 rounded-xl border border-border bg-canvas p-4"><span className="font-display text-lg text-indigo">{number}</span><div className="flex-1"><p className="font-medium text-ink">{title}</p><p className="text-sm text-muted-foreground">{detail}</p></div><ArrowDownRight aria-hidden="true" className="size-4 text-indigo" /></div>;
}

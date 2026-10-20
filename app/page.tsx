import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, BellRing, BookOpenText, CalendarClock, ChartNoAxesCombined, LayoutGrid, Lightbulb, Mic2, Sparkles } from "lucide-react";
import { MobileAppPreview } from "@/components/mobile-app-preview";
import { PreviewShell } from "@/components/preview-shell";
import { GuidedPreview } from "@/components/preview/guided-preview";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-config";

const currentFeatures = [
  {
    title: "Write it in your own words",
    icon: BookOpenText,
    description: "Log what happened in a sentence or a page. Add a category if you want to find it later, then come back through search, a filter, a timeline, or a calendar.",
    detail: "Journal",
  },
  {
    title: "Say how it felt, then and later",
    icon: CalendarClock,
    description: "Rate how you feel right after a log, from Much worse to Much better. A later check-in in 2 hours is already picked, so you only change it if tonight or tomorrow morning fits better.",
    detail: "Check In",
  },
  {
    title: "See what tends to follow",
    icon: ChartNoAxesCombined,
    description: "Pick a category to see how you have usually felt after it, right away and later. Every summary links back to the logs behind it.",
    detail: "Patterns",
  },
  {
    title: "What’s often followed by feeling better",
    icon: Lightbulb,
    description: "Once your own history shows it, Foresight points out the categories that are followed by feeling better more often than your other logs. The strongest one you haven’t logged today sits at the top of the Journal.",
    detail: "Suggestions",
  },
  {
    title: "Reminders that don’t nag",
    icon: BellRing,
    description: "A reminder arrives when a check-in is due, and you can answer it from the notification. Nudges about what has often been followed by feeling better come at most once a day and at most every third day for any one category, with Log it and Less often buttons. A heads-up can come before the time you usually log something that has been followed by feeling worse more often than your other logs. Nothing arrives during quiet hours you set.",
    detail: "Notifications",
  },
  {
    title: "Check in from the home screen",
    icon: LayoutGrid,
    description: "A widget shows what is ready to answer, and another starts a new log in one tap.",
    detail: "Widgets",
  },
] as const;

const plannedFeatures = [
  { title: "Speak a log", icon: Mic2, description: "Voice capture and transcription would make it easier to record a moment while it is still fresh." },
  { title: "Suggested categories", icon: Sparkles, description: "An AI model could suggest categories from what you wrote, so similar moments line up without extra tagging. This would send the log text to an AI service. Your words stay as written, and nothing is applied until you pick it." },
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo">A reflection journal</p>
            <h1 id="hero-heading" className="mt-4 font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">Notice what follows.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Write down what happened, say how you feel right after and again a little later, and over time Foresight shows which things in your own life are more often followed by feeling better.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#app" className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-3 text-sm font-medium text-primary-foreground shadow-elevated hover:bg-indigo/90">Explore the iOS app <ArrowDownRight aria-hidden="true" className="size-4" /></a>
              <a href={siteConfig.links.iosSource} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-indigo hover:text-ink">View iOS source <ArrowUpRight aria-hidden="true" className="size-4" /></a>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">There is no App Store or TestFlight release yet. With a Mac and Xcode, one script installs it on your own iPhone with a free Apple account; re-run it every 7 days, and the journal is kept.</p>
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
          <SectionHeading id="features-heading" title="From a moment to a useful record." eyebrow="In the iOS build" description="Three tabs, a few reminders, and summaries you can trace back to what you wrote." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentFeatures.map(({ title, icon: Icon, description, detail }) => (
              <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="grid size-11 place-items-center rounded-lg bg-sage/25 text-indigo"><Icon aria-hidden="true" className="size-5" /></span>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                <p className="mt-6 border-t border-border pt-4 text-xs font-bold uppercase tracking-[0.1em] text-indigo">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">A pattern needs at least five rated later check-ins and has to stand out from your other logs. Foresight describes what tends to follow what, never causes. It keeps a daily backup of your journal, and Settings can export it, import an export, or restore a backup. If the journal ever fails to open, Foresight offers your backups before anything else.</p>
        </section>

        <section id="preview" className="border-y border-border bg-sage/10 py-section" aria-labelledby="preview-heading">
          <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-14">
            <div><SectionHeading id="preview-heading" title="Try the journey." eyebrow="Interactive illustration" description="Walk through a sample log, a later check-in, and a pattern from fictional history. The illustration follows features in the current app; it does not save your input." /></div>
            <PreviewShell><GuidedPreview /></PreviewShell>
          </div>
        </section>

        <section id="vision" className="site-container py-section" aria-labelledby="vision-heading">
          <SectionHeading id="vision-heading" title="Where Foresight is headed." eyebrow="Planned capabilities" description="Next up: easier capture, while keeping the person in control of the record and its interpretation." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {plannedFeatures.map(({ title, icon: Icon, description }) => (
              <article key={title} className="rounded-xl border border-sage/60 bg-sage/10 p-6">
                <Icon aria-hidden="true" className="size-6 text-indigo" />
                <h3 className="mt-5 font-display text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-indigo">Planned · not in the current build</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">Voice and AI category suggestions are future work. Today, logs and categories are entered by hand.</p>
        </section>
      </main>

      <SiteFooter>
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><Image src="/app-icon.png" width={32} height={32} alt="" className="size-8 rounded-lg" /><span className="font-display text-2xl tracking-tight text-ink">Foresight</span></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm"><a className="text-indigo hover:text-ink" href={siteConfig.links.iosSource} target="_blank" rel="noreferrer">Native iOS source ↗</a><a className="text-indigo hover:text-ink" href={siteConfig.links.mobileSource} target="_blank" rel="noreferrer">Earlier React Native version ↗</a><a className="text-indigo hover:text-ink" href={siteConfig.links.siteSource} target="_blank" rel="noreferrer">Website source ↗</a></div>
        </div>
      </SiteFooter>
    </div>
  );
}

function FlowStep({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <div className="flex items-center gap-4 rounded-xl border border-border bg-canvas p-4"><span className="font-display text-lg text-indigo">{number}</span><div className="flex-1"><p className="font-medium text-ink">{title}</p><p className="text-sm text-muted-foreground">{detail}</p></div><ArrowDownRight aria-hidden="true" className="size-4 text-indigo" /></div>;
}

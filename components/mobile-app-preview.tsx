import Image from "next/image";

const screens = [
  {
    number: "01",
    title: "Journal",
    description: "Write freely, tag moments, and return through search, filters, a timeline, or a calendar.",
    image: "/screenshots/journal.png",
    alt: "Foresight iOS Journal showing search, timeline and category filters, and saved sample logs",
  },
  {
    number: "02",
    title: "Check In",
    description: "Answer when you are ready, reschedule a follow-up, or skip it without losing the log.",
    image: "/screenshots/check-in.png",
    alt: "Foresight iOS Check In queue showing due and upcoming reflections from sample history",
  },
  {
    number: "03",
    title: "Patterns",
    description: "Compare activity and outcomes, then open the logs behind each summary.",
    image: "/screenshots/patterns.png",
    alt: "Foresight iOS Patterns showing a sample Workout summary based on 10 of 12 later check-ins",
  },
] as const;

export function MobileAppPreview() {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-3">
        {screens.map((screen) => (
          <figure key={screen.title} className="flex flex-col">
            <div className="mx-auto w-full max-w-[19rem] overflow-hidden rounded-[2.2rem] border-[7px] border-[#20231f] bg-[#f5f4ef] shadow-elevated">
              <Image src={screen.image} alt={screen.alt} width={1206} height={2622} sizes="(max-width: 1024px) 304px, 300px" className="h-auto w-full" />
            </div>
            <figcaption className="mx-auto mt-6 w-full max-w-[19rem]">
              <p className="text-xs font-bold tracking-[0.16em] text-indigo">{screen.number} / {screen.title.toUpperCase()}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{screen.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">Screens from the current native iOS QA build with removable sample history. Personal journal data is not shown.</p>
    </div>
  );
}

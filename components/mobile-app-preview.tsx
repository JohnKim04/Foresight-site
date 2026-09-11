import type { ReactNode } from "react";
import { BarChart3, ChevronLeft, Pencil, Plus, Tag } from "lucide-react";

export function MobileAppPreview() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <PhoneFrame label="Journal">
        <div className="flex items-center justify-between border-b border-[#d9ddd5] pb-3"><span className="font-serif text-xl font-bold text-[#20231f]">Foresight</span><span className="rounded-full bg-[#e8eee7] px-2 py-1 text-[10px] font-bold text-[#34503f]">JOURNAL</span></div>
        <p className="mt-5 font-serif text-3xl leading-9 text-[#20231f]">Write about anything.</p>
        <div className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-[#34503f] text-sm font-bold text-white"><Plus className="size-4" aria-hidden="true" />New log</div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[#667067]">Recent logs</p>
        <div className="mt-3 space-y-2">
          <LogRow date="Sep 10 · 6:20 PM" body="Took a walk after work. The air helped." category="Workout" />
          <LogRow date="Sep 9 · 9:15 AM" body="A quiet start before a busy day." category="Work" />
        </div>
      </PhoneFrame>

      <PhoneFrame label="Log detail">
        <div className="flex items-center justify-between"><span className="inline-flex items-center gap-1 text-sm font-bold text-[#34503f]"><ChevronLeft className="size-4" aria-hidden="true" />Journal</span><Pencil className="size-4 text-[#34503f]" aria-label="Edit log" /></div>
        <p className="mt-6 text-sm font-semibold text-[#667067]">Sep 10 · 6:20 PM</p>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#e8eee7] px-3 py-1.5 text-xs font-bold text-[#34503f]"><Tag className="size-3" aria-hidden="true" />Workout</div>
        <p className="mt-6 font-serif text-2xl leading-8 text-[#20231f]">Took a walk after work. The air helped. I felt more settled by the time I got home.</p>
        <div className="mt-8 flex h-10 items-center justify-center rounded-full border border-[#34503f] text-sm font-bold text-[#34503f]">Edit log</div>
      </PhoneFrame>

      <PhoneFrame label="Trends">
        <div className="flex items-center justify-between border-b border-[#d9ddd5] pb-3"><span className="font-serif text-xl font-bold text-[#20231f]">Foresight</span><span className="rounded-full bg-[#e8eee7] px-2 py-1 text-[10px] font-bold text-[#34503f]">TRENDS</span></div>
        <p className="mt-5 font-serif text-3xl text-[#20231f]">Activity</p>
        <div className="mt-4 flex gap-2"><span className="rounded-full bg-[#34503f] px-3 py-1.5 text-xs font-bold text-white">7 days</span><span className="rounded-full border border-[#bfc8bf] px-3 py-1.5 text-xs font-bold text-[#667067]">30 days</span></div>
        <div className="mt-5 rounded-xl border border-[#d9ddd5] bg-white p-4"><div className="flex items-center justify-between"><span className="text-sm font-bold text-[#20231f]">All activity</span><span className="text-sm font-bold text-[#34503f]">5 logs</span></div><p className="mt-1 text-xs text-[#667067]">+2 vs. prior 7 days</p><div className="mt-5 flex h-16 items-end gap-1.5" aria-label="Example seven-day log chart">{[28, 52, 39, 70, 24, 49, 60].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-[#9aac96]" style={{ height: `${height}%` }} />)}</div></div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#e8eee7] p-3"><span className="inline-flex items-center gap-2 text-sm font-bold text-[#20231f]"><BarChart3 className="size-4 text-[#34503f]" aria-hidden="true" />Workout</span><span className="text-xs font-bold text-[#34503f]">3 logs · +1</span></div>
      </PhoneFrame>
    </div>
  );
}

function PhoneFrame({ label, children }: { label: string; children: ReactNode }) {
  return <article className="mx-auto w-full max-w-sm rounded-[2rem] border-[7px] border-[#20231f] bg-[#f5f4ef] p-4 shadow-elevated"><div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[#20231f]" /><p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#667067]">{label}</p>{children}</article>;
}

function LogRow({ date, body, category }: { date: string; body: string; category: string }) {
  return <div className="rounded-xl border border-[#d9ddd5] bg-white p-3"><p className="text-[11px] font-semibold text-[#667067]">{date}</p><p className="mt-1 text-sm leading-5 text-[#20231f]">{body}</p><span className="mt-2 inline-block rounded-full bg-[#e8eee7] px-2 py-1 text-[10px] font-bold text-[#34503f]">{category}</span></div>;
}

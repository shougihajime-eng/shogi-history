import type { Strategy } from "@/data/strategies";

// 戦法ひとつ分のカード（名前・ひとこと・由来・年表）。

export function StrategyCard({ s }: { s: Strategy }) {
  return (
    <div className="h-full rounded-xl border border-cha-light/30 bg-washi-2 p-5 shadow-sm transition-shadow hover:shadow-md">
      <p className="font-mincho text-xl leading-tight text-sumi">
        <ruby>
          {s.name}
          <rt>{s.yomi}</rt>
        </ruby>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sumi-soft">{s.summary}</p>
      {s.origin && (
        <p className="mt-3 rounded-lg bg-washi-3/60 px-3 py-2 text-sm leading-relaxed text-cha">
          <span className="font-bold">名前の由来：</span>
          {s.origin}
        </p>
      )}
      <ol className="relative ml-1 mt-4 space-y-4 border-l-2 border-cha-light/30">
        {s.timeline.map((e, i) => (
          <li key={i} className="relative pl-5">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-shu" />
            <p className="font-mincho text-sm text-kin">{e.when}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-sumi-soft">{e.what}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

import Koma from "@/app/Koma";

// 各ページの上にそろえて出す「見出しの帯」。
// 和紙色の帯に、うっすら大きな駒・前に置く駒・小見出し・大見出し・説明。

type Tone = "wood" | "gold" | "navy";

export default function PageHero({
  kicker,
  title,
  reading,
  lead,
  koma,
  tone = "navy",
}: {
  kicker: string;
  title: string;
  reading?: string;
  lead?: string;
  koma?: string;
  tone?: Tone;
}) {
  return (
    <section className="relative overflow-hidden border-b border-cha-light/30 bg-washi-2">
      {/* 背景にうっすら大きな駒 */}
      {koma && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-5 -top-8 opacity-[0.06]"
        >
          <Koma char={koma} tone="wood" className="h-48 w-44" />
        </div>
      )}
      <div className="relative mx-auto flex max-w-3xl items-center gap-5 px-5 py-10 sm:gap-6 sm:py-14">
        {koma && (
          <Koma
            char={koma}
            tone={tone}
            className="hidden h-20 w-[72px] shrink-0 sm:block"
            title={title}
          />
        )}
        <div>
          <p className="font-mincho text-xs tracking-[0.3em] text-shu sm:text-sm">
            {kicker}
          </p>
          <h1 className="mt-2 font-mincho text-3xl leading-tight text-sumi sm:text-4xl">
            {reading ? (
              <ruby>
                {title}
                <rt>{reading}</rt>
              </ruby>
            ) : (
              title
            )}
          </h1>
          {lead && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sumi-soft sm:text-base">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

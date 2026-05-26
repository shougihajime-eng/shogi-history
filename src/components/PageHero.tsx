import { Koma } from "./Koma";

// 各ページの上にくる、見出しの帯。全ページで形をそろえて統一感を出す。

export function PageHero({
  kicker,
  title,
  reading,
  lead,
  koma,
}: {
  kicker: string;
  title: string;
  reading?: string;
  lead?: string;
  koma?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-cha-light/25 bg-washi-2">
      {/* 背景にうっすら大きな駒 */}
      {koma && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-6 h-44 w-40 opacity-[0.07] sm:opacity-[0.1]"
        >
          <Koma char={koma} tone="ink" />
        </div>
      )}
      <div className="relative mx-auto flex max-w-4xl items-center gap-5 px-5 py-10 sm:gap-7 sm:py-14">
        {koma && (
          <div className="hidden h-20 w-16 shrink-0 sm:block">
            <Koma char={koma} tone="indigo" />
          </div>
        )}
        <div>
          <p className="font-mincho text-xs tracking-[0.3em] text-shu sm:text-sm">
            {kicker}
          </p>
          <h1 className="mt-2 font-mincho text-3xl text-sumi sm:text-4xl">
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

import type { Metadata } from "next";
import { PLAYERS, SOURCES, LAST_VERIFIED } from "@/data/shogi";

export const metadata: Metadata = {
  title: "名棋士の話｜将棋の歴史",
  description:
    "木村義雄から大山康晴、羽生善治、藤井聡太まで。将棋の歴史をつくった名棋士たちを、やさしい言葉と出典つきで紹介します。",
};

export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <p className="font-mincho tracking-[0.3em] text-shu text-sm">MEIKISHI</p>
      <h1 className="font-mincho text-3xl sm:text-4xl mt-2 text-sumi leading-tight">名棋士の話</h1>
      <p className="mt-5 text-sumi-soft leading-relaxed text-sm sm:text-base">
        将棋の歴史には、その時代の頂点に立った「名棋士（めいきし）」がいます。
        ここでは、時代を代表する人たちを、昔の人から順に紹介します。
      </p>

      <div className="mt-10 space-y-5">
        {PLAYERS.map((p) => {
          const src = SOURCES[p.source];
          return (
            <article
              key={p.name}
              className="rounded-xl bg-washi-2 border border-cha-light/30 p-6 shadow-sm"
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-mincho text-2xl text-sumi leading-tight">
                  <ruby>
                    {p.name}
                    <rt>{p.reading}</rt>
                  </ruby>
                </h2>
                {p.titleNo && (
                  <span className="text-xs text-washi bg-kon rounded-full px-2.5 py-0.5">
                    {p.titleNo}
                  </span>
                )}
                <span className="text-sm text-cha">{p.life}</span>
              </div>
              <p className="text-sumi-soft text-sm sm:text-base leading-relaxed mt-3">
                {p.summary}
              </p>
              <p className="mt-3 text-xs text-sumi-faint">
                出典：
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kon-light underline underline-offset-2 hover:text-shu"
                >
                  {src.label}
                </a>
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
    </div>
  );
}

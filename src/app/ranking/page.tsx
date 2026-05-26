import type { Metadata } from "next";
import { RANKING, RANKING_AS_OF, SOURCES, LAST_VERIFIED } from "@/data/shogi";

export const metadata: Metadata = {
  title: "タイトル獲得数ランキング｜将棋の歴史",
  description:
    "羽生善治の99期を筆頭に、歴代のタイトル通算獲得数ランキング。出典つき・基準日つきでまとめました。",
};

export default function RankingPage() {
  const max = Math.max(...RANKING.map((r) => r.count));

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <p className="font-mincho tracking-[0.3em] text-shu text-sm">RANKING</p>
      <h1 className="font-mincho text-3xl sm:text-4xl mt-2 text-sumi leading-tight">
        タイトル獲得数ランキング
      </h1>
      <p className="mt-5 text-sumi-soft leading-relaxed text-sm sm:text-base">
        プロのタイトル戦で「頂点」を取った回数（通算の期数）の合計を、多い順にならべました。
        一般の棋戦（タイトル戦以外）での優勝は数えていません。
      </p>
      <p className="mt-2 text-xs text-cha">数字の基準：{RANKING_AS_OF}</p>

      <ol className="mt-8 space-y-2.5">
        {RANKING.map((r) => (
          <li
            key={`${r.rank}-${r.name}`}
            className="rounded-lg bg-washi-2 border border-cha-light/30 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className={`font-mincho w-9 text-center shrink-0 ${
                  r.rank <= 3 ? "text-3xl text-shu" : "text-2xl text-cha-light"
                }`}
              >
                {r.rank}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mincho text-lg text-sumi leading-tight">
                    <ruby>
                      {r.name}
                      <rt>{r.reading}</rt>
                    </ruby>
                  </span>
                  {r.active && (
                    <span className="text-[10px] text-washi bg-kon rounded-full px-2 py-0.5">
                      現役・記録更新中
                    </span>
                  )}
                </div>
                {/* 棒グラフ */}
                <div className="mt-1.5 h-2 rounded-full bg-washi-3/70 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-kin"
                    style={{ width: `${(r.count / max) * 100}%` }}
                  />
                </div>
              </div>
              <span className="font-mincho text-xl text-sumi shrink-0 tabular-nums">
                {r.count}
                <span className="text-xs text-cha ml-0.5">期</span>
              </span>
            </div>
            {r.note && <p className="text-xs text-sumi-faint mt-2 pl-12">{r.note}</p>}
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <p className="text-sumi-soft text-sm leading-relaxed">
          出典：
          <a
            href={SOURCES.wikiKisen.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-kon-light underline underline-offset-2 hover:text-shu"
          >
            {SOURCES.wikiKisen.label}
          </a>
          （タイトル獲得数の合計）／
          <a
            href={SOURCES.jsa.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-kon-light underline underline-offset-2 hover:text-shu"
          >
            {SOURCES.jsa.label}
          </a>
        </p>
        <p className="mt-3 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { RANKING, RANKING_AS_OF, SOURCES, LAST_VERIFIED } from "@/data/shogi";
import Koma from "../Koma";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "タイトル獲得数ランキング｜将棋の歴史",
  description:
    "羽生善治の99期を筆頭に、歴代のタイトル通算獲得数ランキング。出典つき・基準日つきでまとめました。",
};

// 1〜3位のメダル色（金・銀・銅）。和の配色になじむ落ち着いたトーンにそろえる。
// disc＝順位の丸メダル、bar＝帯グラフ、card＝行の枠と背景。
const MEDAL: Record<number, { disc: string; bar: string; card: string }> = {
  1: {
    disc: "bg-gradient-to-b from-[#dcb95a] to-[#b08534] text-white ring-[#9c7330]/40",
    bar: "bg-gradient-to-r from-[#cda64a] to-[#b08534]",
    card: "border-kin/60 bg-[#fbf3dc]",
  },
  2: {
    disc: "bg-gradient-to-b from-[#d8dce1] to-[#9aa1a9] text-[#3a3f45] ring-[#828891]/40",
    bar: "bg-gradient-to-r from-[#c3c8ce] to-[#9aa1a9]",
    card: "border-[#aab0b7] bg-[#f3f4f5]",
  },
  3: {
    disc: "bg-gradient-to-b from-[#d3a273] to-[#a9713f] text-white ring-[#8c5a30]/40",
    bar: "bg-gradient-to-r from-[#c9966a] to-[#a9713f]",
    card: "border-[#bb8a5e] bg-[#f7efe5]",
  },
};

export default function RankingPage() {
  const max = Math.max(...RANKING.map((r) => r.count));

  return (
    <>
      <PageHero
        kicker="RANKING ・ 獲得数"
        title="タイトル獲得数ランキング"
        koma="金"
        tone="gold"
        lead="プロのタイトル戦で「頂点」を取った回数（通算の期数）の合計を、多い順にならべました。一般の棋戦（タイトル戦以外）での優勝は数えていません。"
      />
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <p className="mt-2 text-xs text-cha">数字の基準：{RANKING_AS_OF}</p>

      <ol className="mt-8 space-y-2.5">
        {RANKING.map((r) => {
          const isTop = r.rank === 1;
          const medal = MEDAL[r.rank];
          return (
            <li
              key={`${r.rank}-${r.name}`}
              className={`rounded-xl border px-3 py-3 sm:px-4 ${
                medal ? medal.card : "bg-washi-2 border-cha-light/30"
              } ${isTop ? "shadow-sm" : ""}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* 順位（1〜3位は金・銀・銅のメダル、4位以下は数字） */}
                {medal ? (
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-mincho text-lg shadow-sm ring-1 ${medal.disc}`}
                    title={`${r.rank}位`}
                  >
                    {r.rank}
                  </span>
                ) : (
                  <span className="w-9 shrink-0 text-center font-mincho text-xl text-cha-light">
                    {r.rank}
                  </span>
                )}
                <Koma
                  char={Array.from(r.name)[0]}
                  tone={isTop ? "gold" : "wood"}
                  className="h-9 w-8 shrink-0"
                  title={r.name}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mincho text-base leading-tight text-sumi sm:text-lg">
                      <ruby>
                        {r.name}
                        <rt>{r.reading}</rt>
                      </ruby>
                    </span>
                    {r.active && (
                      <span className="rounded-full bg-kon px-2 py-0.5 text-[10px] text-washi">
                        現役・記録更新中
                      </span>
                    )}
                  </div>
                  {/* 帯グラフ */}
                  <div className="mt-1 h-5 overflow-hidden rounded-full bg-washi-3/70 ring-1 ring-cha-light/20">
                    <div
                      className={`h-full rounded-full ${medal ? medal.bar : "bg-shu"}`}
                      style={{ width: `${(r.count / max) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 font-mincho text-xl text-sumi tabular-nums">
                  {r.count}
                  <span className="ml-0.5 text-xs text-cha">期</span>
                </span>
              </div>
              {r.note && <p className="mt-2 text-xs leading-relaxed text-sumi-faint">{r.note}</p>}
            </li>
          );
        })}
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
    </>
  );
}

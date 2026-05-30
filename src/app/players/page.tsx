import type { Metadata } from "next";
import { PLAYERS, SOURCES, LAST_VERIFIED, RANKING_AS_OF } from "@/data/shogi";
import Koma from "../Koma";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "名棋士の話｜将棋の歴史",
  description:
    "木村義雄から大山康晴、羽生善治、藤井聡太まで。将棋の歴史をつくった名棋士たちを、強さ（タイトル獲得数）や活やくした時代の図でやさしく紹介します。",
};

// 強さくらべ：タイトル獲得数の多い順
const BY_TITLES = [...PLAYERS].sort((a, b) => b.titles - a.titles);
const MAX_TITLES = Math.max(...PLAYERS.map((p) => p.titles)); // 99（羽生）

// 時代の帯：生まれた年の早い順
const BY_BORN = [...PLAYERS].sort((a, b) => a.born - b.born);
const AXIS_MIN = 1900;
const AXIS_MAX = 2030;
const NOW = 2026;
const SPAN = AXIS_MAX - AXIS_MIN; // 130年ぶん
const pos = (year: number) => ((year - AXIS_MIN) / SPAN) * 100; // 0〜100%

export default function PlayersPage() {
  return (
    <>
      <PageHero
        kicker="MEIKISHI ・ 名棋士"
        title="名棋士の話"
        koma="王"
        lead="その時代の頂点に立った「名棋士（めいきし）」たち。まずは強さ（とったタイトルの数）と活やくした時代を図で見わたし、そのあと一人ずつ紹介します。"
      />
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">

      {/* ============ 強さくらべ（帯グラフ） ============ */}
      <section className="mt-10">
        <SectionHeading koma="金">強さくらべ ― タイトルをとった数</SectionHeading>
        <p className="mt-3 text-sumi-soft text-sm leading-relaxed">
          頂点をかけた「タイトル戦」で優勝した回数（通算獲得数）を、多い順にならべました。
          帯（おび）が長いほどたくさんとった人です。
        </p>

        <ul className="mt-6 space-y-2.5">
          {BY_TITLES.map((p, i) => {
            const isTop = i === 0;
            // 上位3人はランキングページと同じ金・銀・銅の帯にして、サイト全体で見た目をそろえる
            const bar =
              i === 0
                ? "bg-gradient-to-r from-[#cda64a] to-[#b08534]"
                : i === 1
                  ? "bg-gradient-to-r from-[#c3c8ce] to-[#9aa1a9]"
                  : i === 2
                    ? "bg-gradient-to-r from-[#c9966a] to-[#a9713f]"
                    : "bg-shu";
            return (
              <li key={p.name} className="flex items-center gap-2.5">
                <Koma
                  char={p.koma}
                  tone={isTop ? "gold" : "wood"}
                  className="h-9 w-8 shrink-0"
                  title={p.name}
                />
                <span className="w-[4.5rem] sm:w-24 shrink-0 font-mincho text-sm text-sumi truncate">
                  {p.name}
                </span>
                <div className="flex-1 h-6 rounded-full bg-washi-3/70 overflow-hidden ring-1 ring-cha-light/20">
                  <div
                    className={`h-full rounded-full ${bar}`}
                    style={{ width: `${(p.titles / MAX_TITLES) * 100}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right font-mincho text-sm text-cha">
                  {p.titles}期
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-sumi-faint leading-relaxed">
          ※ タイトル戦だけの通算獲得数（{RANKING_AS_OF}）。藤井聡太さんは今も数を伸ばし続けています。
        </p>
      </section>

      {/* ============ 活やくした時代（帯） ============ */}
      <section className="mt-14">
        <SectionHeading koma="歩">活やくした時代</SectionHeading>
        <p className="mt-3 text-sumi-soft text-sm leading-relaxed">
          それぞれの棋士が「いつの時代の人か」を帯で表しました（生まれてから今、または亡くなるまで）。
          時代がとなりへ少しずつ重なりながら、頂点が受けつがれてきたのが分かります。
        </p>

        {/* 色の説明 */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-sumi-soft">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-full bg-shu" /> ご存命
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-full bg-kon-light" /> 故人
          </span>
        </div>

        <div className="mt-5">
          {/* 目盛りの縦線（1950年・2000年） */}
          <div className="relative">
            <div className="space-y-2.5">
              {BY_BORN.map((p) => {
                const left = pos(p.born);
                const right = pos(p.died ?? NOW);
                const alive = p.died === undefined;
                return (
                  <div key={p.name} className="flex items-center gap-2.5">
                    <span className="w-[4.5rem] sm:w-24 shrink-0 font-mincho text-sm text-sumi truncate">
                      {p.name}
                    </span>
                    <div className="relative flex-1 h-7">
                      {/* 目盛りの線（帯の背景） */}
                      <span className="absolute inset-y-0 left-[38.46%] w-px bg-cha-light/25" aria-hidden="true" />
                      <span className="absolute inset-y-0 left-[76.92%] w-px bg-cha-light/25" aria-hidden="true" />
                      {/* 時代の帯 */}
                      <span
                        className={`absolute inset-y-0 my-auto h-5 rounded-full flex items-center px-2 ${
                          alive ? "bg-shu" : "bg-kon-light"
                        }`}
                        style={{ left: `${left}%`, width: `${Math.max(right - left, 4)}%` }}
                        title={`${p.life}`}
                      >
                        <span className="text-[10px] text-washi whitespace-nowrap">
                          {p.born}{alive ? "〜" : `〜${p.died}`}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 年の目盛り（下） */}
          <div className="relative mt-1 ml-[4.5rem] sm:ml-24 pl-2.5 h-4 text-[10px] text-sumi-faint">
            <span className="absolute left-0">1900年</span>
            <span className="absolute left-[38.46%]">1950年</span>
            <span className="absolute left-[76.92%]">2000年</span>
          </div>
        </div>
      </section>

      {/* ============ 一人ずつ、くわしく ============ */}
      <SectionHeading koma="王" className="mt-14">一人ずつ、くわしく</SectionHeading>
      <div className="mt-6 space-y-5">
        {PLAYERS.map((p) => {
          const src = SOURCES[p.source];
          return (
            <article
              key={p.name}
              className="flex gap-4 rounded-xl bg-washi-2 border border-cha-light/30 p-6 shadow-sm"
            >
              <Koma char={p.koma} className="h-[52px] w-12 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-mincho text-2xl text-sumi leading-tight">
                  <ruby>
                    {p.name}
                    <rt>{p.reading}</rt>
                  </ruby>
                </h3>
                {/* 大事な事実を、読み飛ばしやすい小さなふだ（バッジ）でそろえる */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                  {p.titleNo && (
                    <span className="rounded-full bg-kon px-2.5 py-0.5 font-mincho text-washi">
                      {p.titleNo}
                    </span>
                  )}
                  <span className="rounded-full border border-cha-light/50 px-2.5 py-0.5 text-cha">
                    {p.life}
                  </span>
                  <span className="rounded-full border border-kin/50 bg-[#fbf3dc] px-2.5 py-0.5 font-bold text-cha">
                    タイトル{p.titles}期
                  </span>
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
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
      </div>
    </>
  );
}

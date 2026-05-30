import Link from "next/link";
import { LAST_VERIFIED, RANKING, TITLES } from "@/data/shogi";
import Koma from "./Koma";
import TodayPick from "@/components/TodayPick";

type Tone = "wood" | "gold" | "navy";

const CARDS: {
  href: string;
  no: string;
  koma: string;
  tone: Tone;
  title: string;
  sub: string;
  body: string;
}[] = [
  {
    href: "/history",
    no: "一",
    koma: "歩",
    tone: "wood",
    title: "将棋の歴史",
    sub: "やさしい年表",
    body:
      "インドで生まれた遊びが海をこえて日本へ。持ち駒の発明、江戸の名人、藤井聡太の八冠まで。戦法や女流棋士の歩みもまとめました。",
  },
  {
    href: "/players",
    no: "二",
    koma: "王",
    tone: "navy",
    title: "名棋士の話",
    sub: "歴史をつくった人たち",
    body:
      "木村義雄から大山康晴、羽生善治、藤井聡太まで。時代の頂点に立った棋士たちを、やさしい言葉で紹介します。",
  },
  {
    href: "/titles",
    no: "三",
    koma: "竜",
    tone: "gold",
    title: "8大タイトル",
    sub: "8つの大きな戦い",
    body:
      "竜王・名人・王位・叡王・王座・棋王・王将・棋聖。いつ生まれ、どんな「永世（一生の）称号」があるのかを見てみましょう。",
  },
  {
    href: "/ranking",
    no: "四",
    koma: "金",
    tone: "gold",
    title: "獲得数ランキング",
    sub: "通算タイトル獲得数",
    body:
      "羽生善治の99期を筆頭に、歴代の通算タイトル獲得数をならべました。今も記録は更新され続けています。",
  },
  {
    href: "/shinkenshi",
    no: "五",
    koma: "香",
    tone: "wood",
    title: "真剣師の裏話",
    sub: "賭け将棋・闇の達人たち（読み物）",
    body:
      "お金を賭けて将棋を指した『真剣師』たち。新宿の殺し屋・小池重明、東海の鬼・花村元司…。伝説と裏話を集めた、ちょっとあやしい読み物です（諸説あり）。",
  },
  {
    href: "/quiz",
    no: "六",
    koma: "問",
    tone: "navy",
    title: "歴史クイズ",
    sub: "力だめし",
    body:
      "ここまで読んだら挑戦！将棋の歴史やタイトルにまつわる問題に答えて、どれだけ覚えたか確かめてみましょう。",
  },
];

const STATS = [
  { num: "約1000", unit: "年", label: "日本での歴史（平安時代から）" },
  { num: String(TITLES.length), unit: "つ", label: "いまの大タイトル" },
  { num: String(RANKING[0]?.count ?? 99), unit: "期", label: "羽生善治の獲得数（歴代1位）" },
  { num: "八", unit: "冠", label: "藤井聡太・史上初の独占（2023年）" },
];

export default function HomePage() {
  return (
    <div>
      {/* ===== 表紙 ===== */}
      <header className="hero px-6">
        {/* 背景にうっすら浮かぶ駒たち（飾り）。「これは将棋の話」と一目で伝える。
            ゆっくり浮く動き(koma-float)を、駒ごとに少しずつタイミングをずらしてバラバラに揺らす。 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <span
            className="koma-float absolute left-[6%] top-[16%]"
            style={{ animationDelay: "-0.5s", animationDuration: "8s" }}
          >
            <Koma char="歩" tone="wood" className="h-20 w-16 opacity-[0.07] sm:h-28 sm:w-24" />
          </span>
          <span
            className="koma-float absolute right-[7%] top-[12%]"
            style={{ animationDelay: "-3s", animationDuration: "9s" }}
          >
            <Koma char="角" tone="wood" className="h-16 w-14 opacity-[0.06] sm:h-24 sm:w-20" />
          </span>
          <span
            className="koma-float absolute bottom-[18%] left-[11%]"
            style={{ animationDelay: "-5s", animationDuration: "10s" }}
          >
            <Koma char="飛" tone="wood" className="h-16 w-14 opacity-[0.06] sm:h-24 sm:w-20" />
          </span>
          <span
            className="koma-float absolute bottom-[22%] right-[9%]"
            style={{ animationDelay: "-2s", animationDuration: "8.5s" }}
          >
            <Koma char="王" tone="wood" className="h-20 w-16 opacity-[0.07] sm:h-28 sm:w-24" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* 主役の駒。後ろに金色のやわらかい光を置いて「ここが主役」と分かるように */}
          <div className="relative mb-7">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kin/25 blur-2xl sm:h-44 sm:w-44"
            />
            <Koma
              char="将"
              tone="navy"
              className="koma-float h-28 w-24 sm:h-32 sm:w-28"
              title="将棋の駒"
            />
          </div>
          <p className="font-mincho text-sm tracking-[0.4em] text-cha sm:text-base">
            せんねん の ものがたり
          </p>
          <h1 className="mt-3 text-5xl font-extrabold leading-tight text-sumi sm:text-7xl">
            将棋の歴史
          </h1>
          <div className="my-6 flex w-full max-w-md items-center gap-3">
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, transparent, var(--color-shu))" }}
            />
            <span className="h-2.5 w-2.5 rotate-45 bg-shu" />
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(to left, transparent, var(--color-shu))" }}
            />
          </div>
          <p className="max-w-xl text-base leading-relaxed text-sumi-soft sm:text-lg">
            インドで生まれた古い遊びが、海をこえ、千年の時をかけて、いまの将棋になりました。
            その長い物語を、やさしい言葉でたどります。
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/history"
              className="rounded-full bg-shu px-7 py-3 font-mincho text-lg tracking-wide text-washi shadow-lg transition-colors hover:bg-shu-deep"
            >
              年表を見にいく →
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border border-cha/40 bg-washi/60 px-7 py-3 font-mincho text-lg tracking-wide text-cha shadow-sm transition-colors hover:border-shu hover:text-shu"
            >
              クイズに挑戦する
            </Link>
          </div>
        </div>

        {/* 下へうながす矢印 */}
        <div className="absolute inset-x-0 bottom-7 flex flex-col items-center text-cha">
          <span className="font-mincho text-xs tracking-[0.3em]">下へすすむ</span>
          <svg
            className="scroll-hint mt-1.5"
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l8 8 8-8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-16 px-5 py-14 sm:space-y-20 sm:py-20">
        {/* ===== きょうの一枚 ===== */}
        <TodayPick />

        {/* ===== 入り口カード ===== */}
        <section>
          <div className="mb-7 text-center">
            <p className="font-mincho text-sm tracking-[0.3em] text-shu">CONTENTS</p>
            <h2 className="mt-1 font-mincho text-2xl text-sumi sm:text-3xl">
              どこから見ますか？
            </h2>
          </div>
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => (
              <Link key={c.href} href={c.href} className="home-card group">
                <span className="absolute right-5 top-5">
                  <Koma char={c.koma} tone={c.tone} className="h-12 w-11" />
                </span>
                <span className="hc-no">其の{c.no}</span>
                <span className="hc-title">{c.title}</span>
                <span className="mb-2 block font-mincho text-sm text-cha">{c.sub}</span>
                <span className="hc-desc">{c.body}</span>
                <span className="hc-go inline-block transition-transform group-hover:translate-x-1">
                  ひらく →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 数字で見る将棋 ===== */}
        <section className="rounded-2xl bg-kon px-6 py-9 text-washi sm:px-10">
          <p className="text-center font-mincho text-sm tracking-[0.3em] text-kin-light">
            数字で見る将棋
          </p>
          <div className="mt-7 grid grid-cols-2 gap-y-7 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="px-3 text-center sm:border-l sm:border-washi/15 sm:first:border-l-0"
              >
                <p className="font-mincho leading-none">
                  <span className="text-4xl text-washi sm:text-5xl">{s.num}</span>
                  <span className="ml-1 text-lg text-kin-light">{s.unit}</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-washi-3">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== このサイトの約束 ===== */}
        <section>
          <div className="rounded-2xl border-2 border-cha-light/30 bg-washi-2 p-6 sm:p-7">
            <p className="font-mincho text-xl text-cha">このサイトの約束</p>
            <p className="mt-3 text-sm leading-relaxed text-sumi-soft sm:text-base">
              ここに載せている数字や出来事は、すべて
              <span className="font-bold text-sumi">公式や信頼できる資料で確かめた事実だけ</span>
              です。でたらめや当てずっぽうは書きません。各ページには
              <span className="font-bold text-sumi">「どこで確かめたか（出典）」</span>
              を必ず書き、研究者の考えが分かれるものは
              <span className="font-bold text-sumi">「諸説あり」</span>
              とはっきり書きます。
            </p>
            <p className="mt-3 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

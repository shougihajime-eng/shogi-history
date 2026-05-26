import Link from "next/link";
import { LAST_VERIFIED } from "@/data/shogi";

const CARDS = [
  {
    href: "/history",
    no: "一",
    title: "将棋の歴史",
    sub: "やさしい年表",
    body: "インドで生まれた遊びが海をこえて日本へ。持ち駒の発明、江戸の名人、藤井聡太の八冠まで。戦法や女流棋士の歩みもまとめました。",
  },
  {
    href: "/players",
    no: "二",
    title: "名棋士の話",
    sub: "歴史をつくった人たち",
    body: "木村義雄から大山康晴、羽生善治、藤井聡太まで。時代の頂点に立った棋士たちを、やさしい言葉で紹介します。",
  },
  {
    href: "/titles",
    no: "三",
    title: "8大タイトル",
    sub: "8つの大きな戦い",
    body: "竜王・名人・王位・叡王・王座・棋王・王将・棋聖。いつ生まれ、どんな「永世（一生の）称号」があるのかを見てみましょう。",
  },
  {
    href: "/ranking",
    no: "四",
    title: "獲得数ランキング",
    sub: "通算タイトル獲得数",
    body: "羽生善治の99期を筆頭に、歴代の通算タイトル獲得数をならべました。今も記録は更新され続けています。",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 表紙 */}
      <section className="bg-kon text-washi">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20 text-center">
          <p className="font-mincho tracking-[0.35em] text-kin text-sm">SHOGI HISTORY</p>
          <h1 className="font-mincho text-4xl sm:text-6xl mt-4 leading-tight">将棋の歴史</h1>
          <p className="mt-5 text-washi-3 leading-relaxed text-sm sm:text-base">
            千年をこえる将棋の物語を、昔から今まで順番に。
            <br className="hidden sm:block" />
            子どもにも、はじめての人にも分かるように、やさしい言葉でまとめました。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/history"
              className="rounded-full bg-shu px-7 py-3 font-mincho text-washi text-lg tracking-wide shadow-lg hover:bg-shu-deep transition-colors"
            >
              年表を見にいく →
            </Link>
            <Link
              href="/quiz"
              className="rounded-full bg-kin px-7 py-3 font-mincho text-sumi text-lg tracking-wide shadow-lg hover:bg-kin-light transition-colors"
            >
              🎯 クイズに挑戦する
            </Link>
          </div>
        </div>
      </section>

      {/* 4つの入り口 */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block rounded-xl bg-washi-2 border border-cha-light/30 p-6 shadow-sm hover:shadow-md hover:border-shu/50 transition-all"
            >
              <span className="absolute right-4 top-3 font-mincho text-5xl text-washi-4 select-none">
                {c.no}
              </span>
              <p className="font-mincho text-2xl text-sumi group-hover:text-shu transition-colors">
                {c.title}
              </p>
              <p className="font-mincho text-sm text-cha mt-0.5">{c.sub}</p>
              <p className="text-sumi-soft text-sm leading-relaxed mt-3">{c.body}</p>
              <span className="inline-block mt-4 text-sm text-kon-light group-hover:text-shu transition-colors">
                ひらく →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* このサイトの約束（出典主義） */}
      <section className="mx-auto max-w-3xl px-5 pb-16">
        <div className="rounded-xl border-2 border-cha-light/30 bg-washi-2 p-6">
          <p className="font-mincho text-xl text-cha">このサイトの約束</p>
          <p className="mt-3 text-sumi-soft text-sm sm:text-base leading-relaxed">
            ここに載せている数字や出来事は、すべて
            <span className="font-bold text-sumi">公式や信頼できる資料で確かめた事実だけ</span>
            です。でたらめや当てずっぽうは書きません。各ページには
            <span className="font-bold text-sumi">「どこで確かめたか（出典）」</span>
            を必ず書いています。年号などで研究者の考えが分かれるものは
            <span className="font-bold text-sumi">「諸説あり」</span>
            とはっきり書きます。
          </p>
          <p className="mt-3 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { TITLES, EISEI, CURRENT_HOLDERS, SOURCES, LAST_VERIFIED } from "@/data/shogi";
import Koma from "../Koma";

// できた順（古い→新しい）にならべたタイトル
const BY_FOUNDED = [...TITLES].sort((a, b) => a.foundedYear - b.foundedYear);

export const metadata: Metadata = {
  title: "8大タイトル｜将棋の歴史",
  description:
    "竜王・名人・王位・叡王・王座・棋王・王将・棋聖。将棋の8つのタイトル戦が、いつ生まれ、どんな永世（一生の）称号があるのかを、出典つきでまとめました。",
};

export default function TitlesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <p className="font-mincho tracking-[0.3em] text-shu text-sm">8 TITLES</p>
      <h1 className="font-mincho text-3xl sm:text-4xl mt-2 text-sumi leading-tight">8大タイトル</h1>
      <p className="mt-5 text-sumi-soft leading-relaxed text-sm sm:text-base">
        プロの将棋には、頂点をかけて争う <span className="font-bold text-cha">8つのタイトル戦</span> があります。
        中でも <span className="font-bold text-cha">竜王（りゅうおう）</span> と
        <span className="font-bold text-cha">名人（めいじん）</span> は別格とされています。
        それぞれを長く取り続けた人には、引退後も名乗れる「永世（えいせい＝一生の）称号」が贈られます。
      </p>

      {/* いまの保持者まとめ */}
      <div className="mt-8 rounded-xl bg-kon text-washi p-6">
        <p className="font-mincho text-kin">いまのタイトル保持者（2026年5月時点・変わります）</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <p className="font-mincho text-lg">藤井聡太（ふじい そうた）</p>
            <p className="text-washi-3 mt-1">{CURRENT_HOLDERS.fujii.join("・")}（六冠）</p>
          </div>
          <div>
            <p className="font-mincho text-lg">伊藤匠（いとう たくみ）</p>
            <p className="text-washi-3 mt-1">{CURRENT_HOLDERS.ito.join("・")}（二冠）</p>
          </div>
        </div>
        <p className="text-washi-3/80 text-xs mt-4">
          ※ 対局の結果で変わります。最新は日本将棋連盟の公式サイトでご確認ください。
        </p>
      </div>

      {/* できた順の図解 */}
      <section className="mt-14">
        <h2 className="font-mincho text-2xl text-sumi border-b-2 border-cha-light/40 pb-2">
          できた順にならべると
        </h2>
        <p className="mt-3 text-sumi-soft text-sm sm:text-base leading-relaxed">
          8つのタイトルは、いっぺんにできたわけではありません。いちばん古い
          <span className="font-bold text-cha"> 名人 </span>（1937年）から、いちばん新しい
          <span className="font-bold text-cha"> 叡王 </span>（2017年）まで、80年かけて少しずつ増えてきました。
          駒のしるしとともに、できた順にならべてみましょう。
        </p>

        <ol className="relative mt-7 ml-1">
          {/* 駒をつなぐ縦の線 */}
          <span
            className="pointer-events-none absolute left-[23px] top-3 bottom-3 w-px bg-cha-light/40"
            aria-hidden="true"
          />
          {BY_FOUNDED.map((t) => (
            <li key={t.name} className="relative flex items-start gap-4 pb-6 last:pb-0">
              <Koma
                char={t.koma}
                tone={t.special ? "gold" : "wood"}
                className="relative z-10 h-[52px] w-12 shrink-0"
                title={`${t.name}（${t.foundedYear}年）`}
              />
              <div className="pt-0.5">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mincho text-xl text-shu">{t.foundedYear}年</span>
                  <span className="font-mincho text-lg text-sumi">
                    <ruby>
                      {t.name}
                      <rt>{t.reading}</rt>
                    </ruby>
                  </span>
                  {t.special && (
                    <span className="text-[11px] text-sumi bg-kin rounded-full px-2 py-0.5 font-bold">
                      別格
                    </span>
                  )}
                </div>
                {t.foundedNote && (
                  <p className="text-xs text-sumi-faint mt-0.5 leading-relaxed">{t.foundedNote}</p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* 順番と格はちがう、という豆知識 */}
        <div className="mt-2 rounded-lg bg-washi-3/60 border border-kin/50 p-4 text-sm leading-relaxed text-sumi-soft">
          <span className="font-bold text-cha">おもしろいところ：</span>
          いちばん格が高い（別格の）<span className="font-bold text-sumi">竜王</span>は、じつは新しいほうのタイトル（1988年）。
          いっぽう、いちばん古い <span className="font-bold text-sumi">名人</span>（1937年）も同じく別格です。
          「できた順」と「格の順（序列）」はちがう――そこが将棋のタイトルの面白いところです。
        </div>
      </section>

      {/* タイトル一覧（ひとつずつ） */}
      <h2 className="mt-14 font-mincho text-2xl text-sumi border-b-2 border-cha-light/40 pb-2">
        ひとつずつ、くわしく
      </h2>
      <div className="mt-6 space-y-4">
        {TITLES.map((t) => (
          <article
            key={t.name}
            className={`flex gap-4 rounded-xl border p-5 ${
              t.special
                ? "bg-washi-3/60 border-kin/60"
                : "bg-washi-2 border-cha-light/30"
            }`}
          >
            <Koma
              char={t.koma}
              tone={t.special ? "gold" : "wood"}
              className="h-[52px] w-12 shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-mincho text-2xl text-sumi leading-tight">
                  <ruby>
                    {t.name}
                    <rt>{t.reading}</rt>
                  </ruby>
                </h3>
                {t.special && (
                  <span className="text-xs text-sumi bg-kin rounded-full px-2.5 py-0.5 font-bold">
                    別格
                  </span>
                )}
                <span className="text-sm text-cha">{t.founded}にタイトル戦化</span>
              </div>
              {t.foundedNote && (
                <p className="text-xs text-sumi-faint mt-1">{t.foundedNote}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <p className="text-sumi-soft">
                  <span className="text-cha">いまの保持者：</span>
                  <span className="font-bold text-sumi">{t.holder}</span>
                  {t.holderNote && <span className="text-xs text-sumi-faint">（{t.holderNote}）</span>}
                </p>
                <p className="text-sumi-soft">
                  <span className="text-cha">永世称号：</span>
                  {t.eiseiName}（{t.eiseiCondition}）
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 永世称号の保持者 */}
      <section className="mt-14">
        <h2 className="font-mincho text-2xl text-sumi border-b-2 border-cha-light/40 pb-2">
          永世称号（一生の称号）の資格をもつ人
        </h2>
        <p className="mt-3 text-sumi-soft text-sm leading-relaxed">
          同じタイトルを長く取り続けた人だけが名乗れる、特別な称号です。
        </p>
        <div className="mt-6 space-y-4">
          {EISEI.map((e) => (
            <div key={e.name} className="rounded-lg bg-washi-2 border border-cha-light/30 p-4">
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="font-mincho text-lg text-cha">{e.name}</p>
                <span className="text-xs text-sumi-faint">条件：{e.condition}</span>
              </div>
              {e.holders.length > 0 ? (
                <p className="mt-2 text-sm text-sumi-soft leading-relaxed">
                  {e.holders.map((h, i) => (
                    <span key={h.name}>
                      {i > 0 && "、"}
                      <span className="text-sumi">{h.name}</span>
                      {h.note && <span className="text-xs text-sumi-faint">（{h.note}）</span>}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="mt-2 text-sm text-sumi-faint">まだ資格をもつ人はいません。</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 出典 */}
      <section className="mt-12">
        <p className="text-sumi-soft text-sm leading-relaxed">
          出典：
          <a href={SOURCES.jsa.url} target="_blank" rel="noopener noreferrer" className="text-kon-light underline underline-offset-2 hover:text-shu">
            {SOURCES.jsa.label}
          </a>
          ／
          <a href={SOURCES.wikiKisen.url} target="_blank" rel="noopener noreferrer" className="text-kon-light underline underline-offset-2 hover:text-shu">
            {SOURCES.wikiKisen.label}
          </a>
          ／
          <a href={SOURCES.wikiEisei.url} target="_blank" rel="noopener noreferrer" className="text-kon-light underline underline-offset-2 hover:text-shu">
            {SOURCES.wikiEisei.label}
          </a>
        </p>
        <p className="mt-3 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
      </section>
    </div>
  );
}

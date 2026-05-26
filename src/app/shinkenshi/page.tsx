import type { Metadata } from "next";
import { LAST_VERIFIED } from "@/data/shogi";

export const metadata: Metadata = {
  title: "真剣師の裏話｜将棋の歴史",
  description:
    "お金を賭けて将棋を指した『真剣師（しんけんし）』たち。新宿の殺し屋・小池重明、東海の鬼・花村元司、最後の真剣師・大田学。伝説と裏話を、出典つきでやさしくまとめた読み物です（諸説あり）。",
};

// このページで参考にした出典（裏話が多いテーマなので、確認できるものを明記）
const SOURCES = [
  {
    label: "ウィキペディア「真剣師」",
    url: "https://ja.wikipedia.org/wiki/真剣師",
  },
  {
    label: "ウィキペディア「小池重明」",
    url: "https://ja.wikipedia.org/wiki/小池重明",
  },
  {
    label: "ウィキペディア「花村元司」",
    url: "https://ja.wikipedia.org/wiki/花村元司",
  },
  {
    label: "ウィキペディア「大田学」",
    url: "https://ja.wikipedia.org/wiki/大田学",
  },
  {
    label: "ウィキペディア「坂田三吉」",
    url: "https://ja.wikipedia.org/wiki/坂田三吉",
  },
  {
    label: "Number Web（将棋・真剣師の記事）",
    url: "https://number.bunshun.jp/",
  },
  {
    label: "団鬼六『真剣師 小池重明』（幻冬舎アウトロー文庫）",
    url: "https://www.gentosha.co.jp/book/detail/9784877284596/",
  },
];

export default function ShinkenshiPage() {
  return (
    <div className="read-wrap pb-4">
      {/* 表紙 */}
      <header className="read-hero">
        <p className="eyebrow">SHINKENSHI ── 裏ばなし</p>
        <h1>真剣師の裏話</h1>
        <p className="lead">
          お金を賭けて将棋を指した、ちょっと闇（やみ）の世界の達人たち。
          <br className="hidden sm:block" />
          「新宿の殺し屋」「東海の鬼」「最後の真剣師」──伝説の数々を集めました。
        </p>
      </header>

      {/* 楽しみ方（このページだけは「読み物」だという断り） */}
      <div className="note-box">
        <span className="note-title">📖 このページの楽しみ方（だいじ）</span>
        ほかのページとちがい、ここは <strong>「正しい歴史」ではなく「語り継がれている裏話」</strong>{" "}
        を集めた読み物です。真剣師はもともと記録が少なく、
        <strong>話が大きくなって伝わっているもの（諸説あり）</strong>
        がたくさんあります。「こんな人がいたらしい」を楽しむのがちょうどいいテーマです。
        人物の名前・生まれ年・大会の優勝などの「骨組み」は出典で確認していますが、
        細かいセリフや数字は本や記事で少しずつ違うこともあります。
      </div>

      {/* 0. 真剣師って何 */}
      <section className="sec">
        <div className="sec-head">
          <h2>真剣師（しんけんし）って何？</h2>
          <span className="line" />
        </div>
        <p>
          <strong>真剣師</strong>とは、
          <strong>賭け将棋（かけしょうぎ）や賭け麻雀（マージャン）で生活していた人</strong>のこと。
          お金を賭けると人は<strong>真剣（＝本気）</strong>になるので、賭け事そのものを昔は「真剣」と呼びました。
          その「真剣」を仕事にしていたから「真剣師」です。
        </p>
        <p>
          日本将棋連盟に所属して対局料をもらう<strong>プロ棋士（きし）が「表の世界」</strong>なら、
          真剣師は<strong>どこにも所属しない「裏の世界」の将棋指し</strong>。
          賭博（とばく）はもともと法律で禁止だったので、彼らは表の記録に残らず、
          <strong>伝説だけが残りました</strong>。麻雀でいう「裏プロ」の将棋版、と思うと分かりやすいです。
        </p>
      </section>

      {/* 1. 時代背景 */}
      <section className="sec">
        <div className="sec-head">
          <h2>むかしは「強い将棋指し＝半分は賭博師」だった</h2>
          <span className="line" />
        </div>
        <p>
          名作『王将（おうしょう）』で有名な伝説の棋士{" "}
          <ruby>
            阪田三吉<rt>さかた さんきち</rt>
          </ruby>
          （1870年生まれ）も、スタートは町の賭け将棋でした。子どものころから将棋が好きすぎて、
          奉公（住み込みの仕事）の使いの途中で<strong>町の将棋に夢中になってクビ</strong>に。
          一家をささえたお金の多くも、本業の草履（ぞうり）作りより
          <strong>賭け将棋から来ていた</strong>と伝わります。
        </p>
        <p>
          このように、戦前から戦後すぐの将棋界は<strong>賭けと地続き（じつづき）</strong>でした。
          戦後の闇市（やみいち）や盛り場の将棋クラブには、こうした真剣師がたくさんいたのです。
        </p>
      </section>

      {/* 2. スター列伝 */}
      <section className="sec">
        <div className="sec-head">
          <h2>真剣師スター列伝</h2>
          <span className="line" />
        </div>

        {/* 小池重明 */}
        <article className="person-card">
          <div className="pc-head">
            <span className="pc-name">
              <ruby>
                小池重明<rt>こいけ じゅうめい</rt>
              </ruby>
            </span>
            <span className="alias-badge">新宿の殺し屋</span>
          </div>
          <p className="pc-sub">
            1947〜1992年／真剣師の中の真剣師。伝説の中の伝説。
          </p>
          <p>
            東京・新宿の将棋クラブを拠点に、賭け将棋で連戦連勝。相手を片っぱしから打ち負かすので
            <strong>「新宿の殺し屋」</strong>と呼ばれました。
            <strong>アマチュア名人を2年連続で制覇（1980・1981年）</strong>した、本物の実力者です。
          </p>

          <p className="pc-block-title">▷ 武勇伝（ぶゆうでん）</p>
          <ul className="episode-list">
            <li>
              <strong>プロ棋士キラー</strong>：プロの森雞二（もり けいじ）八段との「手直り三番勝負」で、
              ハンデを変えながら<strong>3局すべてに勝った</strong>という、今も語り継がれる伝説。
            </li>
            <li>
              <strong>通天閣（つうてんかく）の決戦</strong>：大阪・新世界で西の最強真剣師と2日間の死闘。
              7勝7敗の互角で、相手が「もう一回やっても勝てる自信がない」とこぼしたとか。
            </li>
            <li>
              <strong>羽生善治（はぶ よしはる）少年が記録係</strong>：1979年のアマ名人戦の企画で、
              当時9歳の羽生少年が小池の対局の記録係を務めた、という逸話も。
            </li>
          </ul>

          <p className="pc-block-title">▷ でも、将棋の外はめちゃくちゃ（ここが闇）</p>
          <ul className="episode-list">
            <li>「飲む・打つ・買う」の毎日。お酒とギャンブルと女性関係に溺れた。</li>
            <li>スポンサーのお金を持ち逃げしては、すぐ戻って泣いて謝る…を繰り返した。</li>
            <li>人妻との駆け落ちは3回。少しお金が入るとすぐギャンブルで溶かした。</li>
            <li>放蕩（ほうとう）の限りをつくし、44歳の若さで孤独に亡くなった。</li>
          </ul>
          <p className="mt-4 text-sm">
            ※ SM小説で有名な作家・<strong>団鬼六（だん おにろく）</strong>が彼の生涯を書いた
            <strong>『真剣師 小池重明』</strong>は、真剣師ものの代表作として今も読まれています。
          </p>
        </article>

        {/* 花村元司 */}
        <article className="person-card">
          <div className="pc-head">
            <span className="pc-name">
              <ruby>
                花村元司<rt>はなむら もとじ</rt>
              </ruby>
            </span>
            <span className="alias-badge">東海の鬼</span>
          </div>
          <p className="pc-sub">
            1917〜1985年／真剣師から、まさかの本物のプロ棋士になった出世物語。
          </p>
          <p>
            静岡など東海地方で賭け将棋・賭け碁で稼いだ元・真剣師。強すぎてみんなからお金を巻き上げたので
            <strong>「東海の鬼」</strong>。ハンデ戦（コマ落ち）が異常に強く
            <strong>「コマ落ち名人」「下手（したて）名人」</strong>とも呼ばれました。
          </p>

          <p className="pc-block-title">▷ 異例（いれい）のプロ入り</p>
          <ul className="episode-list">
            <li>
              大棋士・升田幸三（ますだ こうぞう）とのハンデ戦で勝ち越し、その実力が認められて
              <strong>1944年に特別の「プロ五段編入試験」</strong>が開かれた。
            </li>
            <li>
              試験ではプロ4人を相手に<strong>4勝2敗で合格</strong>。
              養成機関（奨励会）を経ずにプロになった、史上きわめて珍しい人。
            </li>
            <li>
              入ってからも強く、<strong>60歳でA級（トップクラス）に復帰</strong>する大記録まで作った。
            </li>
          </ul>

          <p className="pc-block-title">▷ 真剣師ならではの自信</p>
          <p>
            わざと定跡（お手本の手順）を外し、ぐちゃぐちゃの「力将棋」に持ち込んで勝つのが得意。
            終盤（勝負の終わり）が異常に強く、こう豪語したと伝わります。
          </p>
          <div className="quote-box">
            終盤の入り口で 2 対 8 の差なら五分（ごぶ）。3 対 7 なら、俺（おれ）の勝ちじゃ。
            <span className="who">── 花村元司（かなり負けていても逆転できる、という意味）</span>
          </div>
          <p className="mt-4 text-sm">
            ※ いかつい見た目とは逆に、中身は柔和（にゅうわ）で人懐っこい人。弟子の家には
            <strong>「正直親切（しょうじきしんせつ）花村元司」</strong>の色紙が飾ってあった、という逸話も。
          </p>
        </article>

        {/* 大田学 */}
        <article className="person-card">
          <div className="pc-head">
            <span className="pc-name">
              <ruby>
                大田学<rt>おおた まなぶ</rt>
              </ruby>
            </span>
            <span className="alias-badge">最後の真剣師</span>
          </div>
          <p className="pc-sub">
            1914〜2007年／昭和の賭け将棋の世界を生きた、最後の世代の象徴。
          </p>
          <ul className="episode-list">
            <li>
              <strong>「勝てば1万円、負ければ12万円」</strong>という、とんでもないハンデの真剣に挑み、
              それでも勝ち切った、という伝説。
            </li>
            <li>
              真剣師を“引退”するとき、表の大会（朝日アマ名人戦）に初出場し、
              <strong>63歳で優勝（1978年）</strong>。裏の達人が表でいきなりてっぺんを取った痛快な話。
            </li>
            <li>NHK朝の連続テレビ小説『ふたりっ子』の「銀じい」のモデルになった、とも言われる。</li>
            <li>晩年も通天閣の近くの将棋道場で、92歳まで指導を続けた。最後まで将棋の人だった。</li>
          </ul>
        </article>
      </section>

      {/* 3. 裏のしくみ */}
      <section className="sec">
        <div className="sec-head">
          <h2>真剣師の世界の「裏のしくみ」</h2>
          <span className="line" />
        </div>
        <div className="fact-grid">
          <div className="fact-card">
            <h3>客（カモ）を逃さない技</h3>
            <p>
              ただ全勝すると相手が嫌になって帰ってしまう。だからわざと少しゆるめ、
              <strong>何回かに1回は負けてあげて</strong>「もう少しで勝てそう」と思わせ、何度も通わせた。
              強さよりこの“さじ加減”がプロの腕、とも言われる。
            </p>
          </div>
          <div className="fact-card">
            <h3>イカサマ（不正）</h3>
            <p>
              賭け事なので当然インチキも。
              <strong>持ち時間をごまかす・駒を隠し持つ・すり替える</strong>など。
              ただし本物の強豪は「イカサマなしでも勝てる」ので、不正は弱い真剣師の手、という見方も。
            </p>
          </div>
          <div className="fact-card">
            <h3>コマ落ちの達人が多い</h3>
            <p>
              相手の腕に合わせて飛車や角を落とす<strong>ハンデ戦が異常にうまかった</strong>。
              弱い相手から確実に少しずつ巻き上げる微妙な調整が命だったから。花村が好例。
            </p>
          </div>
          <div className="fact-card">
            <h3>なぜ消えていったのか</h3>
            <p>
              賭博の取り締まりが厳しくなり、賭けの場そのものが減少。
              <strong>「強い人は表で評価される」</strong>時代になり、真剣師という職業は
              昭和とともにほぼ絶滅し、伝説だけが残った。
            </p>
          </div>
        </div>
      </section>

      {/* 4. もっと知りたい */}
      <section className="sec">
        <div className="sec-head">
          <h2>もっと知りたい人へ</h2>
          <span className="line" />
        </div>
        <ul className="book-list">
          <li>
            <span className="bt">『真剣師 小池重明』団鬼六</span>
            … 真剣師ものの決定版。伝説の小池の生涯。
          </li>
          <li>
            <span className="bt">『東海の鬼 花村元司伝』鈴木啓志・森下卓</span>
            … 真剣師からプロになった花村の評伝（ひょうでん）。
          </li>
          <li>
            <span className="bt">『名人に香車を引いた男』升田幸三</span>
            … 真剣師ではないが、賭けと地続きの将棋界の空気が分かる名著。
          </li>
        </ul>
      </section>

      {/* 出典 */}
      <footer className="src-foot">
        <strong className="text-cha font-mincho">出典（どこで確かめたか）</strong>
        <ul className="mt-2 space-y-1">
          {SOURCES.map((s) => (
            <li key={s.url}>
              ●{" "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          ★ このページは真剣師という「裏の世界」のため確かな記録がほとんど残っておらず、
          エピソードには言い伝え・誇張（こちょう）が混じります。
          <strong>「事実」ではなく「語り継がれている物語」として</strong>お楽しみください（諸説あり）。
        </p>
        <p className="mt-2 text-xs">最終確認日：{LAST_VERIFIED}</p>
      </footer>
    </div>
  );
}

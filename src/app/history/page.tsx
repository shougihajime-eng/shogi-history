import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HISTORY, SOURCES, LAST_VERIFIED } from "@/data/shogi";
import ReadingAids from "../ReadingAids";
import Koma from "../Koma";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "将棋の歴史｜やさしい年表",
  description:
    "将棋がどこで生まれ、どう日本で育ってきたのか。全体の年表・戦法（戦い方）の歴史・女流棋士の歴史を、公式の出典つきでやさしくたどれます。",
};

/* =========================================================================
   戦法（戦い方）の歴史　※出典は最下部の「出典」セクションにまとめて表示
   ========================================================================= */
type Strategy = {
  name: string;
  yomi: string;
  summary: string;
  origin?: string;
  aim?: string; // ねらい（どう攻める／守るか）
  timeline: { when: string; what: string }[];
};

// 振り飛車（飛車を左へ振って戦う形）
const furibisha: Strategy[] = [
  {
    name: "四間飛車",
    yomi: "しけんびしゃ",
    summary:
      "飛車を左から4番目の筋に振る、振り飛車の代表格。400年以上前からある、もっとも歴史の長い戦法のひとつです。",
    timeline: [
      { when: "1607年（江戸の初め）", what: "現存する最古級の棋譜のひとつ（いちばん古い棋譜の年は1605年説・1607年説があります）。初代・大橋宗桂 対 本因坊算砂の対局で、後手の算砂が四間飛車を採用。" },
      { when: "1853年", what: "天野宗歩の定跡書『将棋精選』に、四間飛車＋美濃囲いの形が登場。" },
      { when: "1960年代（昭和）", what: "大山康晴 十五世名人が愛用し、全盛期を築く。森安秀光も主要な担い手。" },
      { when: "1990年代後半", what: "藤井猛が「藤井システム」を確立し、升田幸三賞を受賞（受賞年の表記は資料により1996年度・1997年で揺れあり）。" },
      { when: "2010年", what: "広瀬章人が「四間飛車穴熊」で王位を獲得し、大ブームに。" },
    ],
  },
  {
    name: "三間飛車",
    yomi: "さんけんびしゃ",
    summary:
      "飛車を左から3番目の筋へ。ここから生まれる「石田流」は江戸時代から続く由緒ある攻めの形です。",
    origin: "「石田流」は、江戸中期の盲目の棋士・石田検校が生み出したと伝わります（関西では「宗無流」とも）。",
    timeline: [
      { when: "江戸時代（中期）", what: "石田検校が考案と伝わる。すでに「石田流本組」「早石田」が定跡として存在。" },
      { when: "昭和", what: "升田幸三 実力制第四代名人が「升田式石田流」を考案。守りより攻めに特化した形。" },
    ],
  },
  {
    name: "中飛車",
    yomi: "なかびしゃ",
    summary:
      "飛車を盤の真ん中の筋へ振る形。大駒が伸び伸び働きます。現代では「ゴキゲン中飛車」が有名です。",
    origin:
      "「ゴキゲン中飛車」の名は、雑誌『将棋世界』元編集長の大崎善生が「コンちゃん、いつもゴキゲンだから」と名付けました。",
    timeline: [
      { when: "1996年〜", what: "近藤正和が「ゴキゲン中飛車」を開発。デビュー直後に活躍。" },
      { when: "2000年代はじめ", what: "ゴキゲン中飛車の開発で近藤正和が升田幸三賞を受賞。棋士の間で大流行（受賞年度は資料により2001年度・2002年度で揺れあり）。" },
    ],
  },
  {
    name: "向かい飛車",
    yomi: "むかいびしゃ",
    summary:
      "相手の飛車と向かい合う筋へ飛車を振る形。特定の人の発明ではなく、長い歴史で自然に生まれました。",
    timeline: [
      { when: "江戸時代", what: "古い棋譜にもその形が見られ、長く指されてきた。" },
      { when: "昭和", what: "升田幸三の向かい飛車が「自在流」と呼ばれ有名に。" },
    ],
  },
  {
    name: "鬼殺し",
    yomi: "おにごろし",
    summary:
      "先手の「奇襲（きしゅう）」。序盤からいきなり桂馬を跳ねて速攻をしかけます。昔は街なかの将棋で大流行しました。",
    origin:
      "大正末期、街頭でパズル将棋を出していた野田圭甫の本の宣伝文句から名付けられたと伝わります。",
    timeline: [
      { when: "はじまり", what: "「原始鬼殺し」が街の縁台将棋で流行。のちに受けが見つかり廃れる。" },
      { when: "改良", what: "米長邦雄が「新・鬼殺し」を、島朗が「鬼殺し向かい飛車」を考案。" },
    ],
  },
];

// 居飛車（飛車を振らずに戦う形）
const ibisha: Strategy[] = [
  {
    name: "矢倉",
    yomi: "やぐら",
    summary:
      "飛車を振らずに戦う「相居飛車」の代表。金銀でがっちり囲う正統派で、米長邦雄が「将棋の純文学」と呼んだことで知られます。",
    origin: "もとはお城の防御の建物「櫓（やぐら）」の字を当てていました。守りの堅さにちなむ名前です。",
    timeline: [
      { when: "江戸時代", what: "大橋宗英の『将棋歩式』に「先手櫓」などと登場。昭和後期に「矢倉」表記が一般化。" },
      { when: "現代", what: "相掛かり・角換わり・横歩取りと並ぶ、いわゆる「相居飛車の四大戦法」のひとつ。" },
    ],
  },
  {
    name: "角換わり",
    yomi: "かくがわり",
    summary: "序盤でおたがいの角を交換してから戦う相居飛車の戦法。打ち込みに気を配りながら進めます。",
    timeline: [
      { when: "戦後（昭和20〜30年代）", what: "「腰掛け銀」が大流行。木村義雄 十四世名人が「木村定跡」を編み出す。" },
      { when: "現代", what: "1985年に谷川浩司をきっかけに再流行。2016年ごろから一気に主流へ。" },
    ],
  },
  {
    name: "相掛かり",
    yomi: "あいがかり",
    summary: "おたがいに飛車先の歩を伸ばし合う相居飛車の戦型。",
    timeline: [
      { when: "江戸末期〜", what: "江戸末期に開発され、終戦直前まで約100年間にわたり大流行した。" },
    ],
  },
  {
    name: "横歩取り",
    yomi: "よこふどり",
    summary: "相手の横の歩を取りにいく相居飛車の戦型。",
    timeline: [
      { when: "江戸末期", what: "江戸時代末期に成立。長くプロでは指されなかった。" },
      { when: "昭和", what: "升田幸三らが定跡を整え、公式戦で活躍して広く知られるようになった。" },
    ],
  },
  {
    name: "棒銀",
    yomi: "ぼうぎん",
    summary:
      "銀を「棒」のようにまっすぐ前線へ繰り出し、飛車と力を合わせて攻め込む、いちばん基本的な攻めの戦法。初心者の教科書ともいわれます。",
    aim: "銀を相手陣の近くまで進め、飛車先（飛車の前の道）を突破するねらい。攻めが分かりやすいのが魅力です。",
    origin: "「飛車と銀が一直線（棒のよう）に並ぶ形」から名付けられたとされます（加藤治郎 名誉九段の記述）。",
    timeline: [
      { when: "1642年（江戸）", what: "のちの三世名人・初代伊藤宗看の対局に、棒銀の形（2六銀）が現れる。古くからある形。" },
      { when: "1894年（明治27年）", what: "「棒銀」の名が、飯万島竜水の定跡書『新案定跡高等将棋秘訣』に初めて登場。" },
      { when: "大正", what: "1917年の関根金次郎の本では「馬鹿銀」と呼ばれ高段者は避けたが、のちに評価が高まった。" },
    ],
  },
  {
    name: "右四間飛車",
    yomi: "みぎしけんびしゃ",
    summary:
      "居飛車のまま、飛車を右から4番目の筋に置いて一点に狙いを定める攻めの戦法。特にアマチュアに人気です。",
    aim: "飛車・角・銀・桂を同じ地点（多くは相手の角の頭）に集中させ、一気に攻めつぶすねらい。対策していない相手には強烈です。",
    timeline: [
      { when: "1605年（江戸の初め）", what: "対振り飛車の戦法としては最古とされ、大橋宗桂 対 本因坊算砂戦が第一号局とされる。" },
      { when: "現代", what: "プロでは中川大輔、アマ強豪では鈴木英春が使い手として知られる。" },
    ],
  },
  {
    name: "雁木",
    yomi: "がんぎ",
    summary:
      "銀を中央寄りに二枚ならべて受け止める、しなやかな居飛車の戦法・囲い。名前は階段（雁木）の形に由来します。",
    aim: "がっちり固める矢倉とちがい、左右どちらの攻めにも対応しやすい、バランス重視の構えです。",
    origin: "江戸前期、在野の強豪・檜垣是安が、船着き場や寺社の階段（雁木）を見て考案したと伝わります。",
    timeline: [
      { when: "江戸前期", what: "檜垣是安が考案と伝わる。当時は対振り飛車の引き角戦法を雁木と呼んだ。" },
      { when: "長く不遇", what: "矢倉に押され、「B級戦法」あつかいでプロではあまり指されなかった。" },
      { when: "2016年ごろ", what: "AI（コンピュータ将棋）が指したことで再評価され、流行戦法としてよみがえった。" },
    ],
  },
  {
    name: "ひねり飛車",
    yomi: "ひねりびしゃ",
    summary:
      "相掛かりから飛車を左へ「ひねって」回し、石田流のような形で攻める居飛車の戦法。",
    aim: "浮かせた飛車を左の翼へ転換し、相手の弱点（3四の歩など）を狙う。飛車を横にひねる動きが名前の由来です。",
    timeline: [
      { when: "戦後", what: "新戦法「縦歩取り」をもとに角田三男が開発。1970年代初頭に高い勝率で流行した。" },
      { when: "近年", what: "プロ公式戦ではあまり見られなくなったが、若手による独自の工夫も生まれている。" },
    ],
  },
];

// 女流棋士の歴史
const joryuHistory: { year: string; title: string; body: string }[] = [
  {
    year: "1974年",
    title: "女流棋士制度がスタート",
    body: "「女性にも将棋を広めたい」という声のもと、同年、蛸島彰子（たこじま あきこ）さんら6人が「1期生」として登録され、女流棋士制度が正式に発足しました。同時に、初めての女流棋戦「女流名人位戦」も生まれました。",
  },
  {
    year: "1978年",
    title: "2つめのタイトル「女流王将戦」",
    body: "女流名人につづいて、2つめの女流タイトル戦である女流王将戦が始まりました。少しずつ戦いの舞台が増えていきます。",
  },
  {
    year: "1982年",
    title: "林葉直子、14歳で女流王将",
    body: "林葉直子（はやしば なおこ）さんが14歳で女流王将を獲得。テレビ出演などでも人気を集め、女流将棋の知名度を一気に押し上げました。",
  },
  {
    year: "1990年代",
    title: "中井広恵と清水市代の時代",
    body: "中井広恵（なかい ひろえ）さんと清水市代（しみず いちよ）さんが何度もタイトルを争い、女流将棋の黄金時代をつくりました。",
  },
  {
    year: "2007年",
    title: "もう一つの団体「LPSA」設立",
    body: "中井広恵さんらが中心となり、連盟を離れた女流棋士たちで日本女子プロ将棋協会（LPSA）を設立。今、女流棋士には「日本将棋連盟」所属と「LPSA」所属の2つの道があります。",
  },
  {
    year: "2011〜13年",
    title: "里見香奈、男性のプロ養成機関へ",
    body: "里見香奈（さとみ かな／現・福間香奈）さんが、棋士をめざす養成機関「奨励会」に編入。2013年には女性で初めて奨励会の三段に昇段しました（三段リーグでの対局は翌2014年から）。",
  },
  {
    year: "2024〜25年",
    title: "西山朋佳が棋士編入試験に挑戦",
    body: "西山朋佳（にしやま ともか）さんが「女性初の棋士（四段）」をめざして棋士編入試験に挑戦。惜しくも合格はなりませんでしたが、女性が棋士の世界の一歩手前まで届いたことを示しました。",
  },
  {
    year: "2025年",
    title: "清水市代、女性初の連盟会長に",
    body: "女流のレジェンド・清水市代さんが、日本将棋連盟の会長に就任しました。連盟の長い歴史で、女性が会長になるのは初めてのことです。",
  },
];

// 女流タイトル（できた順）　koma＝駒に入れる一文字
const joryuTitles: { name: string; reading: string; born: string; koma: string; note: string }[] = [
  { name: "女流名人戦", reading: "じょりゅうめいじんせん", born: "1974年", koma: "名", note: "いちばん最初にできた女流タイトル。" },
  { name: "女流王将戦", reading: "じょりゅうおうしょうせん", born: "1978年", koma: "将", note: "2つめにできたタイトル。" },
  { name: "女流王位戦", reading: "じょりゅうおういせん", born: "1990年", koma: "位", note: "（創設は1989年度）" },
  { name: "倉敷藤花戦", reading: "くらしきとうかせん", born: "1993年", koma: "藤", note: "岡山県・倉敷市が舞台のタイトル。" },
  { name: "女王（マイナビ女子オープン）", reading: "じょおう", born: "2008年", koma: "女", note: "「女王」の称号をかけて戦います。" },
  { name: "女流王座戦", reading: "じょりゅうおうざせん", born: "2011年", koma: "座", note: "海外でも対局が行われることがあります。" },
  { name: "清麗戦", reading: "せいれいせん", born: "2019年", koma: "清", note: "比較的新しいタイトル。" },
  { name: "白玲戦", reading: "はくれいせん", born: "2021年", koma: "白", note: "いちばん新しく、今は女流の最高位（序列1位）のタイトル。" },
];

const joryuHolders = [
  { who: "福間香奈", titles: "清麗・女王・女流王座・女流王位・倉敷藤花（5冠）" },
  { who: "西山朋佳", titles: "白玲・女流名人・女流王将（3冠）" },
];

// 女流タイトルを多くとった人（通算獲得数の多い順）　koma＝駒に入れる一文字／born＝生まれた年
// 出典：各棋士のウィキペディア（西山朋佳の記事に2026年2月8日時点の歴代順位の記載あり）
const joryuStrength: { name: string; reading: string; koma: string; titles: number; born: number; note?: string }[] = [
  { name: "福間香奈", reading: "ふくま かな", koma: "福", titles: 68, born: 1992, note: "旧姓・里見香奈。歴代1位で、今も数を伸ばし続けています。" },
  { name: "清水市代", reading: "しみず いちよ", koma: "清", titles: 43, born: 1969, note: "1990年代からの第一人者。2025年に連盟会長に。" },
  { name: "西山朋佳", reading: "にしやま ともか", koma: "西", titles: 21, born: 1995, note: "現代のもう一人の主役。" },
  { name: "中井広恵", reading: "なかい ひろえ", koma: "中", titles: 19, born: 1969, note: "清水市代との名勝負で女流黄金時代を築いた。" },
  { name: "林葉直子", reading: "はやしば なおこ", koma: "林", titles: 15, born: 1968, note: "女流王将を10連覇。" },
];
const joryuMax = Math.max(...joryuStrength.map((j) => j.titles)); // 68（福間）

// 女流「活やくした時代」の帯：生まれた年の早い順。みなさんご存命。
const joryuByBorn = [...joryuStrength].sort((a, b) => a.born - b.born);
const JW_MIN = 1960;
const JW_MAX = 2030;
const JW_NOW = 2026;
const jwPos = (year: number) => ((year - JW_MIN) / (JW_MAX - JW_MIN)) * 100; // 0〜100%

// 出典（このページで確かめた場所）
const pageSources = [
  SOURCES.jsa,
  SOURCES.jsaHistory,
  { label: "日本将棋連盟（公式）「創立・沿革」", url: SOURCES.jsaAbout.url },
  { label: "ウィキペディア「将棋」", url: "https://ja.wikipedia.org/wiki/将棋" },
  { label: "ウィキペディア「女流棋士 (将棋)」", url: "https://ja.wikipedia.org/wiki/女流棋士_(将棋)" },
  { label: "ウィキペディア「将棋の女流タイトル在位者一覧」", url: "https://ja.wikipedia.org/wiki/将棋の女流タイトル在位者一覧" },
  { label: "東京新聞「女性初、日本将棋連盟会長に就任 清水市代さん」", url: "https://www.tokyo-np.co.jp/article/421940" },
  { label: "ウィキペディア「福間香奈」「清水市代」「西山朋佳」ほか各女流棋士（女流タイトル通算獲得数）", url: "https://ja.wikipedia.org/wiki/福間香奈" },
  { label: "ウィキペディア「棒銀」", url: "https://ja.wikipedia.org/wiki/棒銀" },
  { label: "ウィキペディア「右四間飛車」", url: "https://ja.wikipedia.org/wiki/右四間飛車" },
  { label: "ウィキペディア「雁木囲い」", url: "https://ja.wikipedia.org/wiki/雁木囲い" },
  { label: "ウィキペディア「ひねり飛車」", url: "https://ja.wikipedia.org/wiki/ひねり飛車" },
];

/* =========================================================================
   小さな部品
   ========================================================================= */
function SectionTitle({
  id,
  kicker,
  koma,
  children,
}: {
  id: string;
  kicker: string;
  koma?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} data-era-anchor className="scroll-mt-24">
      <p className="text-shu font-mincho tracking-widest text-sm">{kicker}</p>
      <div className="flex items-center gap-2.5 border-b-2 border-cha-light/40 pb-2 mt-1">
        {koma && <Koma char={koma} className="h-8 w-7 shrink-0" />}
        <h2 className="font-mincho text-2xl sm:text-3xl text-sumi leading-tight">{children}</h2>
      </div>
    </div>
  );
}

function StrategyCard({ s }: { s: Strategy }) {
  return (
    <div className="rounded-lg bg-washi-2 border border-cha-light/30 p-5">
      <p className="font-mincho text-xl text-sumi leading-tight">
        <ruby>
          {s.name}
          <rt>{s.yomi}</rt>
        </ruby>
      </p>
      <p className="text-sumi-soft text-sm leading-relaxed mt-2">{s.summary}</p>
      {s.aim && (
        <p className="mt-2 border-l-2 border-kon-light/60 pl-3 text-sm leading-relaxed text-kon">
          <span className="font-bold">ねらい：</span>
          {s.aim}
        </p>
      )}
      {s.origin && (
        <p className="mt-3 rounded bg-washi-3/60 px-3 py-2 text-sm leading-relaxed text-cha">
          <span className="font-bold">名前の由来：</span>
          {s.origin}
        </p>
      )}
      <ol className="relative border-l-2 border-cha-light/30 ml-1 mt-4 space-y-4">
        {s.timeline.map((e, i) => (
          <li key={i} className="pl-5 relative">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-shu" />
            <p className="font-mincho text-kin text-sm">{e.when}</p>
            <p className="text-sumi-soft text-sm leading-relaxed mt-0.5">{e.what}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* =========================================================================
   ページ本体
   ========================================================================= */
export default function HistoryPage() {
  return (
    <>
      <ReadingAids />
      <PageHero
        kicker="SHOGI HISTORY ・ 年表"
        title="将棋の歴史"
        reading="しょうぎのれきし"
        koma="歩"
        lead="将棋がどこで生まれ、どうやって日本で育ってきたのかを、昔から今まで順番にたどれる年表です。戦い方（戦法）や、女流棋士の歩みもまとめました。むずかしい言葉にはふりがなや言いかえを添えています。"
      />
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">

      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {[
          ["#zentai", "将棋ぜんたいの歴史"],
          ["#senpo", "戦法（戦い方）の歴史"],
          ["#joryu", "女流棋士の歴史"],
          ["#jtitles", "女流タイトルの流れ"],
          ["#sources", "出典"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-cha-light/40 px-4 py-1.5 text-cha hover:bg-washi-3/60 transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-20">
        {/* ============ 将棋ぜんたいの歴史 ============ */}
        <section className="space-y-8">
          <SectionTitle id="zentai" kicker="その一" koma="王">
            将棋ぜんたいの歴史
          </SectionTitle>

          <ol className="relative border-l-2 border-cha-light/40 ml-2 space-y-7">
            {HISTORY.map((it, i) => {
              const src = SOURCES[it.source];
              return (
                <li key={i} className="pl-6 relative">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-shu" />
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mincho text-kin text-sm">{it.year}</span>
                    <span className="text-xs text-cha bg-washi-3/70 rounded px-2 py-0.5">{it.era}</span>
                  </div>
                  <p className="font-mincho text-lg text-sumi mt-1">{it.title}</p>
                  <p className="text-sumi-soft text-sm leading-relaxed mt-1">{it.body}</p>
                  {it.note && (
                    <p className="mt-2 text-xs leading-relaxed text-shu-deep bg-shu/5 border-l-2 border-shu/40 pl-2 py-1">
                      ⚠ {it.note}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-sumi-faint">
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
                </li>
              );
            })}
          </ol>
        </section>

        {/* ============ 戦法（戦い方）の歴史 ============ */}
        <section className="space-y-8">
          <SectionTitle id="senpo" kicker="その二" koma="角">
            戦法（戦い方）の歴史
          </SectionTitle>

          <div className="rounded-lg bg-washi-2 border border-cha-light/30 p-5 text-sm leading-relaxed text-sumi-soft">
            <p>
              <span className="font-bold text-cha">戦法（せんぽう）</span>とは、将棋の「戦い方・作戦」のこと。
              大きく分けて、飛車を左へ動かして戦う <span className="font-bold text-cha">振り飛車（ふりびしゃ）</span> と、
              飛車を動かさずに戦う <span className="font-bold text-cha">居飛車（いびしゃ）</span> があります。
              江戸時代まで歴史をさかのぼれるものも多いです。
            </p>
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-mincho text-xl text-cha">振り飛車の戦法</h3>
              <span className="text-sumi-soft text-sm">飛車を左へ振って戦う形</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {furibisha.map((s) => (
                <StrategyCard key={s.name} s={s} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-mincho text-xl text-cha">居飛車の戦法</h3>
              <span className="text-sumi-soft text-sm">飛車を振らずに戦う形</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ibisha.map((s) => (
                <StrategyCard key={s.name} s={s} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ 女流棋士の歴史 ============ */}
        <section className="space-y-8">
          <SectionTitle id="joryu" kicker="その三" koma="玉">
            女流棋士の歴史
          </SectionTitle>

          <div className="rounded-lg bg-washi-2 border border-cha-light/30 p-5 text-sm leading-relaxed text-sumi-soft">
            <p>
              <span className="font-bold text-cha">女流棋士（じょりゅうきし）</span>とは、女性の将棋のプロのこと。
              男女どちらでもなれる「棋士（きし）」になった女性はまだいません。
              そこで女性だけの世界として「女流棋士」の制度がつくられ、独自のタイトル戦が育ってきました。
            </p>
          </div>

          <ol className="relative border-l-2 border-shu/30 ml-2 space-y-7">
            {joryuHistory.map((it, i) => (
              <li key={i} className="pl-6 relative">
                <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-shu" />
                <p className="font-mincho text-kin text-sm">{it.year}</p>
                <p className="font-mincho text-lg text-sumi mt-0.5">{it.title}</p>
                <p className="text-sumi-soft text-sm leading-relaxed mt-1">{it.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ 女流タイトルの流れ ============ */}
        <section className="space-y-8">
          <SectionTitle id="jtitles" kicker="その四" koma="金">
            女流タイトルの流れ
          </SectionTitle>

          <p className="text-sumi-soft text-sm leading-relaxed">
            女流のタイトル（頂点をかけた戦い）は、最初の1つ（女流名人）から少しずつ増え、
            いまでは <span className="font-bold text-cha">「女流八大タイトル」</span>と呼ばれる8つになりました。
            できた順にならべると、増えてきた様子がよく分かります。
          </p>

          <ol className="space-y-3">
            {joryuTitles.map((t) => (
              <li
                key={t.name}
                className="flex items-center gap-4 rounded-lg bg-washi-2 border border-cha-light/30 px-4 py-3"
              >
                <Koma char={t.koma} className="h-11 w-10 shrink-0" title={`${t.name}（${t.born}）`} />
                <div className="flex-1 min-w-0">
                  <p className="font-mincho text-lg text-sumi leading-tight">
                    <ruby>
                      {t.name}
                      <rt>{t.reading}</rt>
                    </ruby>
                  </p>
                  <p className="text-sumi-soft text-xs mt-0.5">{t.note}</p>
                </div>
                <span className="font-mincho text-kin text-sm shrink-0">{t.born}</span>
              </li>
            ))}
          </ol>

          <div className="rounded-lg bg-kon text-washi p-5">
            <p className="font-mincho text-kin text-sm">いまの女流タイトル保持者（2026年5月時点・変わります）</p>
            <ul className="mt-3 space-y-2 text-sm">
              {joryuHolders.map((h) => (
                <li key={h.who} className="flex flex-col sm:flex-row sm:gap-3">
                  <span className="font-mincho text-lg text-washi shrink-0">{h.who}</span>
                  <span className="text-washi-3">{h.titles}</span>
                </li>
              ))}
            </ul>
            <p className="text-washi-3/80 text-xs mt-4 leading-relaxed">
              ※ 対局の結果でこの顔ぶれは変わります。最新は日本将棋連盟の公式サイトでご確認ください。
            </p>
          </div>

          {/* 女流の強さくらべ（タイトル獲得数の帯グラフ） */}
          <div className="pt-4">
            <h3 className="font-mincho text-xl text-cha">女流の強さくらべ ― タイトルをとった数</h3>
            <p className="mt-2 text-sumi-soft text-sm leading-relaxed">
              女流タイトル戦で頂点に立った回数（通算獲得数）を、多い順にならべました。
              <span className="font-bold text-cha"> 福間香奈 </span>さんが歴代1位、
              いまも記録を伸ばし続けています。
            </p>

            <ul className="mt-5 space-y-2.5">
              {joryuStrength.map((j, i) => {
                const isTop = i === 0;
                return (
                  <li key={j.name} className="flex items-center gap-2.5">
                    <Koma
                      char={j.koma}
                      tone={isTop ? "gold" : "wood"}
                      className="h-9 w-8 shrink-0"
                      title={j.name}
                    />
                    <span className="w-[4.5rem] sm:w-24 shrink-0 font-mincho text-sm text-sumi truncate">
                      {j.name}
                    </span>
                    <div className="flex-1 h-6 rounded-full bg-washi-3/70 overflow-hidden ring-1 ring-cha-light/20">
                      <div
                        className={`h-full rounded-full ${isTop ? "bg-kin" : "bg-shu"}`}
                        style={{ width: `${(j.titles / joryuMax) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right font-mincho text-sm text-cha">
                      {j.titles}期
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-sumi-faint leading-relaxed">
              ※ 女流タイトルの通算獲得数（2026年2月時点・変わります）。出典は各棋士のウィキペディア。
              福間さんの数はその後も増えています。
            </p>
          </div>

          {/* 女流の活やくした時代（生まれた年の帯） */}
          <div className="pt-6">
            <h3 className="font-mincho text-xl text-cha">女流の活やくした時代</h3>
            <p className="mt-2 text-sumi-soft text-sm leading-relaxed">
              いつの時代の人かを帯で表しました（生まれてから今まで／みなさんご存命）。
              <span className="font-bold text-cha"> 林葉・清水・中井 </span>の3人（1968〜69年生まれ）が女流黄金時代をつくり、
              少し間をおいて <span className="font-bold text-cha"> 福間・西山 </span>（1992〜95年生まれ）の世代へと続きます。
            </p>

            <div className="mt-5">
              <div className="space-y-2.5">
                {joryuByBorn.map((j) => {
                  const left = jwPos(j.born);
                  const right = jwPos(JW_NOW);
                  return (
                    <div key={j.name} className="flex items-center gap-2.5">
                      <span className="w-[4.5rem] sm:w-24 shrink-0 font-mincho text-sm text-sumi truncate">
                        {j.name}
                      </span>
                      <div className="relative flex-1 h-7">
                        {/* 目盛りの線（1980・2000・2020年） */}
                        <span className="absolute inset-y-0 left-[28.57%] w-px bg-cha-light/25" aria-hidden="true" />
                        <span className="absolute inset-y-0 left-[57.14%] w-px bg-cha-light/25" aria-hidden="true" />
                        <span className="absolute inset-y-0 left-[85.71%] w-px bg-cha-light/25" aria-hidden="true" />
                        {/* 時代の帯 */}
                        <span
                          className="absolute inset-y-0 my-auto h-5 rounded-full bg-shu flex items-center px-2"
                          style={{ left: `${left}%`, width: `${Math.max(right - left, 4)}%` }}
                          title={`${j.name}（${j.born}年生まれ）`}
                        >
                          <span className="text-[10px] text-washi whitespace-nowrap">{j.born}〜</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 年の目盛り（下） */}
              <div className="relative mt-1 ml-[4.5rem] sm:ml-24 pl-2.5 h-4 text-[10px] text-sumi-faint">
                <span className="absolute left-0">1960年</span>
                <span className="absolute left-[28.57%]">1980年</span>
                <span className="absolute left-[57.14%]">2000年</span>
                <span className="absolute left-[85.71%]">2020年</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-sumi-faint leading-relaxed">
              ※ 生まれた年の出典は各棋士のウィキペディア（林葉1968・清水1969・中井1969・福間1992・西山1995）。
            </p>
          </div>
        </section>

        {/* ============ 出典 ============ */}
        <section className="space-y-5">
          <SectionTitle id="sources" kicker="その五" koma="歩">
            出典（どこで確かめたか）
          </SectionTitle>
          <p className="text-sumi-soft text-sm leading-relaxed">
            このページは、次の場所で内容を確かめてつくりました。起源や伝来の時期など「諸説あり」と書いたものは、
            研究者によって考えがちがう部分です。最終確認日：{LAST_VERIFIED}。
          </p>
          <ul className="space-y-2 text-sm">
            {pageSources.map((s) => (
              <li key={s.url} className="flex gap-2">
                <span className="text-shu">●</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kon-light underline underline-offset-2 hover:text-shu break-all"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
    </>
  );
}

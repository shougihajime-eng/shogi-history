// ===================================================================
// 将棋の歴史アプリ｜データ（すべて公式・信頼できる出典つき）
// -------------------------------------------------------------------
// 【最大のルール】でたらめ・推測は載せない。すべて出典で確認した事実だけ。
// 最終確認日: 2026-05-26
// 出典:
//   - 日本将棋連盟 https://www.shogi.or.jp/
//   - ウィキペディア「将棋」 https://ja.wikipedia.org/wiki/将棋
//   - ウィキペディア「棋戦_(将棋)」 https://ja.wikipedia.org/wiki/棋戦_(将棋)
//   - ウィキペディア「永世称号」 https://ja.wikipedia.org/wiki/永世称号
//   - ウィキペディア「将棋のタイトル在位者一覧」
//   - ウィキペディア「藤井聡太」
// ===================================================================

export const LAST_VERIFIED = "2026年5月26日";

// 出典をまとめて参照できるように
export const SOURCES = {
  jsa: {
    label: "日本将棋連盟（公式）",
    url: "https://www.shogi.or.jp/",
  },
  jsaHistory: {
    label: "日本将棋連盟（公式）「日本将棋の歴史（1）」",
    url: "https://www.shogi.or.jp/history/story/",
  },
  jsaChaturanga: {
    label: "日本将棋連盟（公式）「チャトランガ（古代インド）」",
    url: "https://www.shogi.or.jp/history/world/chaturanga.html",
  },
  jsaAbout: {
    label: "日本将棋連盟（公式）「創立・沿革」",
    url: "https://www.shogi.or.jp/about/history.html",
  },
  wikiShogi: {
    label: "ウィキペディア「将棋」",
    url: "https://ja.wikipedia.org/wiki/将棋",
  },
  wikiKisen: {
    label: "ウィキペディア「棋戦（将棋）」",
    url: "https://ja.wikipedia.org/wiki/棋戦_(将棋)",
  },
  wikiEisei: {
    label: "ウィキペディア「永世称号」",
    url: "https://ja.wikipedia.org/wiki/永世称号",
  },
  wikiZaii: {
    label: "ウィキペディア「将棋のタイトル在位者一覧」",
    url: "https://ja.wikipedia.org/wiki/将棋のタイトル在位者一覧",
  },
  wikiFujii: {
    label: "ウィキペディア「藤井聡太」",
    url: "https://ja.wikipedia.org/wiki/藤井聡太",
  },
} as const;

// -------------------------------------------------------------------
// 1. 将棋の歴史（年表）　出典: ウィキペディア「将棋」
// -------------------------------------------------------------------
export type HistoryEntry = {
  era: string; // 時代（だいたいの年）
  year: string; // 年・年代
  title: string;
  body: string;
  source: keyof typeof SOURCES;
  /** 「諸説あり」「推定」など、断定できない点の注意書き（あれば表示） */
  note?: string;
};

export const HISTORY: HistoryEntry[] = [
  {
    era: "古代",
    year: "紀元前〜",
    title: "もとは古代インドの「チャトランガ」",
    body: "将棋のおおもとは、古代インドで生まれた盤上の遊び「チャトランガ」にあるという説が最有力です。これが世界に広がり、ヨーロッパではチェス、中国ではシャンチー（象棋）、朝鮮半島ではチャンギ、タイではマークルック、日本では将棋へと、それぞれの国の形に育っていきました。",
    source: "jsaChaturanga",
    note: "「いつ生まれたか」は諸説があり、はっきりしていません（日本将棋連盟）。",
  },
  {
    era: "平安",
    year: "時期は諸説あり",
    title: "日本へ伝わる",
    body: "将棋がいつ・どの道すじで日本へ伝わったのかは、はっきり分かっていません。インド→中国→朝鮮→日本、または インド→東南アジア→日本 のどちらかと言われています。最古の文献は、藤原明衡（ふじわらの あきひら）の著書とされる『新猿楽記（しんさるがくき）』（1058〜1064年ごろ？）で、将棋についての記述があります。",
    source: "jsaHistory",
    note: "伝来の時期・経路は物証に乏しく、諸説あります（日本将棋連盟）。",
  },
  {
    era: "平安",
    year: "1058年",
    title: "今に残る最古の駒（奈良・興福寺）",
    body: "奈良県の興福寺（こうふくじ）の境内から、将棋の駒16点が見つかりました。いっしょに「天喜6年（＝1058年）」と書かれた木の札（木簡）が出土していて、今のところ最古の駒とされています。駒はもう五角形をしていました。",
    source: "jsaHistory",
  },
  {
    era: "鎌倉",
    year: "1210〜1221年ごろ",
    title: "『二中歴』に古い将棋の記録",
    body: "この頃に編まれたとされる書物『二中歴（にちゅうれき）』に、大小2種類の将棋（平安将棋・平安大将棋）が記されています。今の将棋になる前の、駒の種類や数がちがう形でした。",
    source: "jsaHistory",
  },
  {
    era: "室町〜戦国",
    year: "15〜16世紀ごろ",
    title: "今の将棋（9×9・40枚）が成立",
    body: "13世紀ごろには駒を増やした「大将棋」、14世紀ごろにはそれを整理した「中将棋」が遊ばれました。やがて小将棋から「醉象（すいぞう）」という駒が除かれ、15〜16世紀に今の将棋（81マス・駒は片方20枚ずつ）の形になったと考えられています。取った駒をもう一度使える「持ち駒」も、この頃に始まった日本ならではのルールです。",
    source: "jsaHistory",
    note: "本将棋の成立時期や持ち駒の始まりは「〜と考えられる／推定される」と書かれており、諸説あります（日本将棋連盟）。",
  },
  {
    era: "江戸",
    year: "1612年",
    title: "江戸幕府が将棋の名人を保護（家元制のはじまり）",
    body: "江戸幕府が、将棋の大橋宗桂（おおはし そうけい）らに給料（俸禄）を出すことを決めました。やがて大橋家・大橋分家・伊藤家の3つの家が「家元（いえもと）」となり、いちばん強い人が「名人」を名乗りました。大橋宗桂が初代名人です。",
    source: "jsaHistory",
  },
  {
    era: "江戸",
    year: "1716年（享保元年）",
    title: "御城将棋（おしろしょうぎ）が制度に",
    body: "八代将軍・徳川吉宗が、将軍の前で将棋を指す「御城将棋」を、年に一度・11月17日に行うことを正式な制度にしました。この日にちなんで、今も11月17日は「将棋の日」になっています。",
    source: "jsaHistory",
  },
  {
    era: "明治",
    year: "1868年〜",
    title: "家元制が終わり、新聞将棋の時代へ",
    body: "江戸幕府が終わると、将棋三家は支えを失って終わりを迎えました。かわりに、新聞が対局を載せるようになり、多くの人が観戦できるようになっていきます。",
    source: "jsaHistory",
  },
  {
    era: "大正",
    year: "1924年",
    title: "東京将棋連盟が結成（日本将棋連盟の前身）",
    body: "1924年9月8日、東京の棋士たちが団結して「東京将棋連盟」を結成しました。これが今の日本将棋連盟のもとになりました（連盟はこの年を創立の年としています）。",
    source: "jsaAbout",
  },
  {
    era: "昭和",
    year: "1935年",
    title: "実力で名人を決める時代へ",
    body: "13世名人の関根金次郎（せきね きんじろう）が、それまで一生ものだった名人の位を、対局の実力で決める「短期名人制」に変える大きな決断をしました。これが今に続くタイトル戦の出発点です。",
    source: "jsaAbout",
  },
  {
    era: "昭和",
    year: "1937年",
    title: "木村義雄が初の「実力制名人」に",
    body: "1935〜37年に行われた名人を決める大きな戦いの結果、1937年に木村義雄（きむら よしお）が初めての「実力制名人」になりました。のちに十四世名人となります。",
    source: "jsaAbout",
    note: "「実力制名人戦が始まった年」は、決断した1935年と、初代名人が決まった1937年の両方が使われます。",
  },
];

// -------------------------------------------------------------------
// 2. 8大タイトル　出典: ウィキペディア「将棋のタイトル在位者一覧」「永世称号」
//    ※「序列（じょれつ＝格の順番）」は賞金額などで毎年変わることがある。
//      竜王と名人が別格（最上位）で、この2つの順番は変わらない。
// -------------------------------------------------------------------
export type Title = {
  name: string;
  reading: string;
  founded: string; // タイトル戦としての始まり（表示用の文字）
  foundedYear: number; // タイトル戦になった年（「できた順」に並べるための数値）
  foundedNote?: string;
  koma: string; // 駒の中に入れる一文字（できた順の図解で使う）
  holder: string; // 今の保持者（2026年5月時点）
  holderNote?: string;
  eiseiName: string; // 永世称号の名前
  eiseiCondition: string; // 永世称号の条件
  special?: boolean; // 別格（竜王・名人）
};

export const TITLES: Title[] = [
  {
    name: "竜王",
    reading: "りゅうおう",
    founded: "1988年",
    foundedYear: 1988,
    foundedNote: "前身の九段戦・十段戦を受けつぎ、賞金最高額のタイトルとして誕生",
    koma: "竜",
    holder: "藤井聡太",
    eiseiName: "永世竜王",
    eiseiCondition: "連続5期 または 通算7期",
    special: true,
  },
  {
    name: "名人",
    reading: "めいじん",
    founded: "1937年",
    foundedYear: 1937,
    foundedNote: "実力で争う名人戦の始まり（名人戦自体は1935年開始）",
    koma: "名",
    holder: "藤井聡太",
    eiseiName: "永世名人（世襲称号・十四世名人〜）",
    eiseiCondition: "通算5期",
    special: true,
  },
  {
    name: "王位",
    reading: "おうい",
    founded: "1960年",
    foundedYear: 1960,
    koma: "位",
    holder: "藤井聡太",
    eiseiName: "永世王位",
    eiseiCondition: "連続5期 または 通算10期",
  },
  {
    name: "叡王",
    reading: "えいおう",
    founded: "2017年",
    foundedYear: 2017,
    foundedNote: "2015年に一般棋戦として始まり、2017年にタイトル戦へ昇格",
    koma: "叡",
    holder: "伊藤匠",
    holderNote: "2026年5月時点（叡王戦五番勝負を防衛中）",
    eiseiName: "永世叡王",
    eiseiCondition: "通算5期（2023年に制定。まだ達成者はいない）",
  },
  {
    name: "王座",
    reading: "おうざ",
    founded: "1983年",
    foundedYear: 1983,
    foundedNote: "1953年に優勝棋戦として始まり、1983年にタイトル戦へ昇格",
    koma: "座",
    holder: "伊藤匠",
    eiseiName: "名誉王座",
    eiseiCondition: "連続5期 または 通算10期",
  },
  {
    name: "棋王",
    reading: "きおう",
    founded: "1975年",
    foundedYear: 1975,
    koma: "棋",
    holder: "藤井聡太",
    eiseiName: "永世棋王",
    eiseiCondition: "連続5期のみ",
  },
  {
    name: "王将",
    reading: "おうしょう",
    founded: "1951年",
    foundedYear: 1951,
    koma: "将",
    holder: "藤井聡太",
    eiseiName: "永世王将",
    eiseiCondition: "通算10期",
  },
  {
    name: "棋聖",
    reading: "きせい",
    founded: "1962年",
    foundedYear: 1962,
    koma: "聖",
    holder: "藤井聡太",
    eiseiName: "永世棋聖",
    eiseiCondition: "通算5期",
  },
];

// 今のタイトル保持者まとめ（2026年5月時点）　出典: ウィキペディア在位者一覧・藤井聡太
export const CURRENT_HOLDERS = {
  note: "2026年5月時点。藤井聡太が六冠（竜王・名人・王位・棋聖・王将・棋王）、伊藤匠が二冠（叡王・王座）を保持。",
  fujii: ["竜王", "名人", "王位", "棋聖", "王将", "棋王"],
  ito: ["叡王", "王座"],
};

// -------------------------------------------------------------------
// 3. タイトル獲得数ランキング
//    出典: ウィキペディア「棋戦（将棋）」（2026年3月29日・第51期棋王戦終了時点）
//    ※一般棋戦の優勝は含まない、タイトル戦だけの獲得期数の合計。
// -------------------------------------------------------------------
export type RankEntry = {
  rank: number;
  name: string;
  reading: string;
  count: number;
  active: boolean; // 現役（数字が今後増える可能性がある）
  note?: string;
};

export const RANKING_AS_OF = "2026年3月29日（第51期棋王戦終了）時点";

export const RANKING: RankEntry[] = [
  { rank: 1, name: "羽生善治", reading: "はぶ よしはる", count: 99, active: true, note: "歴代1位。1996年に当時の全タイトル七冠を独占。十九世名人の資格保持。" },
  { rank: 2, name: "大山康晴", reading: "おおやま やすはる", count: 80, active: false, note: "十五世名人。昭和を代表する大棋士。" },
  { rank: 3, name: "中原誠", reading: "なかはら まこと", count: 64, active: false, note: "十六世名人。" },
  { rank: 4, name: "藤井聡太", reading: "ふじい そうた", count: 34, active: true, note: "2023年に史上初の八冠独占。2026年4月17日時点では通算35期。記録を伸ばし続けている。" },
  { rank: 5, name: "渡辺明", reading: "わたなべ あきら", count: 31, active: true, note: "初代の永世竜王。" },
  { rank: 6, name: "谷川浩司", reading: "たにがわ こうじ", count: 27, active: true, note: "十七世名人。21歳で名人になり、当時の史上最年少名人。" },
  { rank: 7, name: "米長邦雄", reading: "よねなが くにお", count: 19, active: false, note: "49歳で初めて名人になった。" },
  { rank: 8, name: "佐藤康光", reading: "さとう やすみつ", count: 13, active: true },
  { rank: 9, name: "森内俊之", reading: "もりうち としゆき", count: 12, active: true, note: "十八世名人の資格保持。" },
  { rank: 10, name: "加藤一二三", reading: "かとう ひふみ", count: 8, active: false, note: "通算10位タイ。" },
  { rank: 10, name: "木村義雄", reading: "きむら よしお", count: 8, active: false, note: "初代の実力制名人・十四世名人。通算10位タイ。" },
  { rank: 12, name: "升田幸三", reading: "ますだ こうぞう", count: 7, active: false, note: "史上初めて名人・王将・九段を同時に制した。" },
  { rank: 12, name: "南芳一", reading: "みなみ よしかず", count: 7, active: false },
  { rank: 12, name: "久保利明", reading: "くぼ としあき", count: 7, active: true },
  { rank: 15, name: "豊島将之", reading: "とよしま まさゆき", count: 6, active: true },
];

// -------------------------------------------------------------------
// 4. 永世称号の保持者　出典: ウィキペディア「永世称号」
// -------------------------------------------------------------------
export type EiseiTitle = {
  name: string;
  condition: string;
  holders: { name: string; note?: string }[];
};

export const EISEI: EiseiTitle[] = [
  {
    name: "永世名人（世襲称号）",
    condition: "名人 通算5期",
    holders: [
      { name: "木村義雄", note: "十四世名人（初の実力制名人）" },
      { name: "大山康晴", note: "十五世名人" },
      { name: "中原誠", note: "十六世名人" },
      { name: "谷川浩司", note: "十七世名人" },
      { name: "森内俊之", note: "十八世名人（資格保持）" },
      { name: "羽生善治", note: "十九世名人（資格保持）" },
    ],
  },
  {
    name: "永世竜王",
    condition: "竜王 連続5期 または 通算7期",
    holders: [
      { name: "渡辺明", note: "2008年に資格達成（初代）" },
      { name: "羽生善治", note: "2017年に資格達成" },
      { name: "藤井聡太", note: "2025年に資格達成（史上3人目）" },
    ],
  },
  {
    name: "永世王位",
    condition: "王位 連続5期 または 通算10期",
    holders: [{ name: "大山康晴" }, { name: "中原誠" }, { name: "羽生善治" }, { name: "藤井聡太" }],
  },
  {
    name: "名誉王座",
    condition: "王座 連続5期 または 通算10期",
    holders: [{ name: "中原誠" }, { name: "羽生善治" }],
  },
  {
    name: "永世棋王",
    condition: "棋王 連続5期のみ",
    holders: [{ name: "羽生善治" }, { name: "渡辺明" }],
  },
  {
    name: "永世王将",
    condition: "王将 通算10期",
    holders: [{ name: "大山康晴" }, { name: "羽生善治" }],
  },
  {
    name: "永世棋聖",
    condition: "棋聖 通算5期",
    holders: [
      { name: "大山康晴" },
      { name: "中原誠" },
      { name: "米長邦雄" },
      { name: "羽生善治" },
      { name: "佐藤康光" },
      { name: "藤井聡太" },
    ],
  },
  {
    name: "永世叡王",
    condition: "叡王 通算5期（2023年制定）",
    holders: [],
  },
];

// -------------------------------------------------------------------
// 5. 名棋士の話　出典: ウィキペディア各棋士／本アプリのランキング・永世称号データと整合
// -------------------------------------------------------------------
export type Player = {
  name: string;
  reading: string;
  life: string; // 生年（〜没年）
  titleNo: string; // 名人の世（あれば）
  summary: string;
  source: keyof typeof SOURCES;
};

export const PLAYERS: Player[] = [
  {
    name: "木村義雄",
    reading: "きむら よしお",
    life: "1905〜1986年",
    titleNo: "十四世名人",
    summary:
      "実力で争う名人戦で、1937年に初めての「実力制名人」になった人。タイトル通算8期。新しい名人の時代の最初の主役です。",
    source: "wikiEisei",
  },
  {
    name: "大山康晴",
    reading: "おおやま やすはる",
    life: "1923〜1992年",
    titleNo: "十五世名人",
    summary:
      "タイトルを通算80期も獲得した、歴代2位の大棋士。永世名人・永世王位・永世王将・永世棋聖など多くの永世称号をもち、長く将棋界の頂点に立ち続けました。",
    source: "wikiEisei",
  },
  {
    name: "升田幸三",
    reading: "ますだ こうぞう",
    life: "1918〜1991年",
    titleNo: "",
    summary:
      "大山康晴の最大のライバル。史上初めて名人・王将・九段の3つを同時に制しました。新しい手を生み出すことを大切にした「新手一生（しんていっしょう）」の言葉で知られます。",
    source: "wikiKisen",
  },
  {
    name: "中原誠",
    reading: "なかはら まこと",
    life: "1947年〜",
    titleNo: "十六世名人",
    summary:
      "大山康晴のあとの時代をリードした大棋士。タイトル通算64期は歴代3位。永世名人・永世王位・名誉王座・永世棋聖などの資格をもちます。",
    source: "wikiEisei",
  },
  {
    name: "谷川浩司",
    reading: "たにがわ こうじ",
    life: "1962年〜",
    titleNo: "十七世名人",
    summary:
      "21歳で名人になり、当時の史上最年少名人として注目されました。すばやい寄せは「光速の寄せ」と呼ばれます。タイトル通算27期。",
    source: "wikiZaii",
  },
  {
    name: "羽生善治",
    reading: "はぶ よしはる",
    life: "1970年〜",
    titleNo: "十九世名人（資格）",
    summary:
      "タイトル通算99期は歴代1位。1996年には、当時の全7タイトルを同時に持つ「七冠独占」を史上初めて達成しました。長く将棋界の第一人者であり続けています。",
    source: "wikiKisen",
  },
  {
    name: "渡辺明",
    reading: "わたなべ あきら",
    life: "1984年〜",
    titleNo: "",
    summary:
      "竜王を連続で守り続け、初代の「永世竜王」になりました。永世棋王の資格ももちます。タイトル通算31期。",
    source: "wikiEisei",
  },
  {
    name: "藤井聡太",
    reading: "ふじい そうた",
    life: "2002年7月19日〜",
    titleNo: "",
    summary:
      "2023年に史上初めて、8つすべてのタイトルを同時に持つ「八冠独占」を達成。2025年には史上3人目の永世竜王の資格を得ました。タイトル通算は35期（2026年4月17日時点）まで伸び、今も記録を更新し続けています。2026年5月時点では六冠を保持。",
    source: "wikiFujii",
  },
];

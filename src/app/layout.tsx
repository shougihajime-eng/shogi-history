import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteNav from "./SiteNav";
import BackToTop from "./BackToTop";

export const metadata: Metadata = {
  title: "将棋の歴史｜やさしい年表とタイトルの記録",
  description:
    "将棋がどこで生まれ、どう日本で育ってきたのか。名棋士の話、8大タイトル戦の歴史、タイトル獲得数ランキングまで、公式の出典つきでやさしくたどれます。",
  applicationName: "将棋の歴史",
  authors: [{ name: "将棋の歴史" }],
  keywords: ["将棋", "歴史", "年表", "チャトランガ", "タイトル戦", "藤井聡太", "羽生善治", "大山康晴"],
  openGraph: {
    title: "将棋の歴史｜やさしい年表とタイトルの記録",
    description:
      "インドの古い遊びから、藤井聡太の八冠まで。千年の物語と、タイトルの記録を、和の見た目でやさしくたどる。",
    locale: "ja_JP",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#25405d",
  width: "device-width",
  initialScale: 1,
};

// Google Fonts の CSS URL (フォントの読み込みが最初の表示を止めないよう、非ブロッキングで読む)
const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* フォント CSS は非ブロッキング読み込み:
            media="print" のまま読み込み開始 → 完了した瞬間に media を all へ切替。
            読み込み中も本文はシステムフォントで即表示される (描画を止めない)。 */}
        <link rel="preload" as="style" href={FONT_CSS_URL} />
        <link id="gf-css" href={FONT_CSS_URL} rel="stylesheet" media="print" />
        <noscript>
          <link href={FONT_CSS_URL} rel="stylesheet" />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var l=document.getElementById('gf-css');if(!l)return;function on(){l.media='all';}l.addEventListener('load',on);try{if(l.sheet)on();}catch(e){}})();",
          }}
        />
      </head>
      <body>
        {/* サイト共通の行き先メニュー（今いるページが光る） */}
        <SiteNav />

        {children}

        {/* 下までスクロールすると右下に出る「上にもどる」ボタン（年表ページ以外） */}
        <BackToTop />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

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

// サイト全体の行き先メニュー（細い帯。各ページの上に出る）
const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/players", label: "名棋士の話" },
  { href: "/titles", label: "8大タイトル" },
  { href: "/ranking", label: "獲得数ランキング" },
  { href: "/shinkenshi", label: "真剣師の裏話" },
];

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
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* サイト共通の細い行き先メニュー */}
        <nav className="bg-kon text-washi">
          <div className="mx-auto max-w-5xl px-4 py-2.5 flex flex-wrap items-center gap-x-1 gap-y-2">
            <Link href="/" className="font-mincho text-lg mr-3 tracking-wide">
              将棋の歴史
            </Link>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1 text-sm sm:text-base hover:bg-kon-light transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}

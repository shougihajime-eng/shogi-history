import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { LAST_VERIFIED } from "@/data/shogi";

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

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/history", label: "将棋の歴史" },
  { href: "/players", label: "名棋士の話" },
  { href: "/titles", label: "8大タイトル" },
  { href: "/ranking", label: "獲得数ランキング" },
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
      <body className="min-h-screen flex flex-col">
        <header className="bg-kon text-washi shadow-md">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <Link href="/" className="inline-block">
              <span className="font-mincho text-2xl sm:text-3xl tracking-wide">
                将棋の歴史
              </span>
              <span className="ml-2 text-sm text-washi-3">
                やさしい年表とタイトルの記録
              </span>
            </Link>
            <nav className="mt-3 flex flex-wrap gap-x-1 gap-y-2 text-sm sm:text-base">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 hover:bg-kon-light transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-12 border-t-2 border-cha-light/30 bg-washi-2">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-sumi-soft">
            <p className="font-mincho text-base text-cha">このサイトの約束</p>
            <p className="mt-2 leading-relaxed">
              ここに載せている数字や出来事は、すべて公式や信頼できる資料で確かめた事実だけです。
              でたらめや当てずっぽうは載せていません。各ページの下に「どこで確かめたか（出典）」を書いています。
            </p>
            <p className="mt-3 text-xs text-cha">
              最終確認日：{LAST_VERIFIED}　／　主な出典：日本将棋連盟、ウィキペディア（将棋・棋戦・永世称号 ほか）
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

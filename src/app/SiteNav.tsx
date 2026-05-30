"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* =========================================================================
   サイト共通の行き先メニュー（どのページからでも全ページへ飛べる）
   - 看板である「年表」と「クイズ」も必ず入れる
   - 今いるページは色を反転させて「ここにいる」と分かるようにする
   今いるページの判定にブラウザの情報が要るため client component。
   ========================================================================= */

// メニューにならべる行き先（「ホーム」は左の看板＝サイト名がその役目）。
// 「クイズ」は“遊びの入り口”なので、最後に金色で少し目立たせて別あつかいにする。
const NAV = [
  { href: "/history", label: "年表" },
  { href: "/players", label: "名棋士の話" },
  { href: "/titles", label: "8大タイトル" },
  { href: "/ranking", label: "獲得数ランキング" },
  { href: "/shinkenshi", label: "真剣師の裏話" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isQuiz = pathname === "/quiz";

  return (
    <nav className="no-print border-b border-kin/25 bg-kon text-washi shadow-md">
      {/* スマホでは「看板の段」と「行き先の段」をタテに分け（flex-col）、
          パソコン(sm以上)では1行に横ならび（flex-row）に戻す。
          こうすると行き先ボタンの段は必ず画面の幅に収まり、足りなければ
          画面内できれいに折り返す（横にはみ出さない）。 */}
      <div className="mx-auto flex max-w-5xl flex-col gap-y-2 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-x-3 sm:py-3">
        {/* 看板（クリックでホームへ）。小さな駒のしるしを添える */}
        <Link
          href="/"
          aria-current={isHome ? "page" : undefined}
          className="flex shrink-0 items-center gap-2 self-start font-mincho text-lg tracking-wide transition-colors hover:text-kin-light sm:mr-auto sm:self-auto sm:text-xl"
        >
          <span
            className="inline-block h-2.5 w-2.5 rotate-45 bg-shu shadow-sm"
            aria-hidden="true"
          />
          将棋の歴史
        </Link>

        {/* 行き先ボタン：スマホでは画面いっぱいを使って自然に折り返す */}
        <div className="flex flex-wrap items-center gap-1.5 sm:flex-nowrap sm:justify-end">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors sm:text-[15px] ${
                  isActive
                    ? "bg-washi font-bold text-kon"
                    : "text-washi/90 hover:bg-kon-light hover:text-washi"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {/* クイズ＝遊びの入り口。金色のボタンで「ここは楽しいところ」と一目で分かるように */}
          <Link
            href="/quiz"
            aria-current={isQuiz ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-bold transition-colors sm:text-[15px] ${
              isQuiz
                ? "bg-washi text-kon"
                : "bg-kin text-sumi shadow-sm hover:bg-kin-light"
            }`}
          >
            クイズ
          </Link>
        </div>
      </div>
    </nav>
  );
}

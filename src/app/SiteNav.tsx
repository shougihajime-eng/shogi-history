"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* =========================================================================
   サイト共通の行き先メニュー（どのページからでも全ページへ飛べる）
   - 看板である「年表」と「クイズ」も必ず入れる
   - 今いるページは色を反転させて「ここにいる」と分かるようにする
   今いるページの判定にブラウザの情報が要るため client component。
   ========================================================================= */

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/history", label: "年表" },
  { href: "/players", label: "名棋士の話" },
  { href: "/titles", label: "8大タイトル" },
  { href: "/ranking", label: "獲得数ランキング" },
  { href: "/shinkenshi", label: "真剣師の裏話" },
  { href: "/quiz", label: "🎯 クイズ" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-kon text-washi shadow-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-1 gap-y-2 px-4 py-2.5">
        <Link href="/" className="mr-3 font-mincho text-lg tracking-wide hover:text-kin transition-colors">
          将棋の歴史
        </Link>
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-md px-3 py-1 text-sm sm:text-base transition-colors ${
                isActive
                  ? "bg-washi font-bold text-kon"
                  : "text-washi hover:bg-kon-light"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

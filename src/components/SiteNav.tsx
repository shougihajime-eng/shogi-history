"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 上のメニュー。いま見ているページを金色で光らせる。
// スマホでは横スクロール、広い画面では折り返して並ぶ。

const NAV = [
  { href: "/", label: "ホーム" },
  { href: "/history", label: "将棋の歴史" },
  { href: "/players", label: "名棋士の話" },
  { href: "/strategies", label: "戦法の歴史" },
  { href: "/titles", label: "8大タイトル" },
  { href: "/ranking", label: "獲得数ランキング" },
  { href: "/women", label: "女流の歴史" },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto text-sm sm:flex-wrap sm:text-base">
      {NAV.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 transition-colors ${
              active
                ? "bg-kin font-bold text-sumi"
                : "text-washi-2 hover:bg-kon-light"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

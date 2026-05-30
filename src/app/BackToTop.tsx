"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* =========================================================================
   どのページでも、下までスクロールしたら右下に出る「上にもどる」ボタン。
   長いページ（真剣師・タイトルなど）から、一発でメニューのある先頭へ戻れる。
   年表ページ(/history)は ReadingAids が同じボタンを出すので、ここでは出さない。
   印刷時(no-print)には出さない。
   ========================================================================= */

export default function BackToTop() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(document.documentElement.scrollTop > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 年表ページは重複するので出さない
  if (pathname === "/history") return null;

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="ページの先頭にもどる"
      className={`no-print fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-shu text-xl text-washi shadow-lg transition-all duration-300 hover:bg-cha ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

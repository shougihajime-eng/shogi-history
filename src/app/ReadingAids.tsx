"use client";

import { useEffect, useState } from "react";

/* =========================================================================
   読みやすさを助ける部品（操作性まわり）
   - 画面上に追従する「もくじバー」（今読んでいる章が光る）
   - 右下の「上にもどる」ボタン
   - 一番上の「読み進み度」の線
   すべてブラウザ側で動くため client component にしている。
   ========================================================================= */

// 各章の id は page.tsx の SectionTitle と合わせている
const sections = [
  { id: "zentai", label: "将棋ぜんたい" },
  { id: "senpo", label: "戦法の歴史" },
  { id: "joryu", label: "女流の歴史" },
  { id: "jtitles", label: "女流タイトル" },
  { id: "sources", label: "出典" },
];

export default function ReadingAids() {
  const [progress, setProgress] = useState(0); // 0〜100（%）
  const [showBar, setShowBar] = useState(false); // ヘッダーを過ぎたら表示
  const [active, setActive] = useState<string>(""); // 今いる章の id

  // スクロール量 → 読み進み度・バーの表示切替
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
      setShowBar(doc.scrollTop > 360); // だいたいヘッダーの高さ
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 今どの章を見ているかを判定して、もくじを光らせる
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // 画面の上から30%〜下から40%あたりに入った章を「今の章」とみなす
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* 読み進み度の線（画面の一番上） */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 pointer-events-none">
        <div
          className="h-full bg-shu transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* スクロールで現れる、いつでも飛べるもくじバー */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          showBar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-kon/95 text-washi shadow-md backdrop-blur supports-[backdrop-filter]:bg-kon/85">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-3 py-2">
            <button
              type="button"
              onClick={scrollToTop}
              className="shrink-0 font-mincho text-sm tracking-widest text-washi transition-colors hover:text-kin"
            >
              将棋の歴史
            </button>
            <nav className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs transition-colors ${
                    active === s.id
                      ? "bg-kin font-bold text-sumi"
                      : "text-washi-3 hover:bg-washi/10"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* 上にもどるボタン（右下） */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="ページの先頭にもどる"
        className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-shu text-xl text-washi shadow-lg transition-all duration-300 hover:bg-cha ${
          showBar
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}

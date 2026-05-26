"use client";

import { useEffect, useState } from "react";

// 画面の一番上の「読み進み度」の線と、右下の「上にもどる」ボタン。
// どのページでも使えるよう、章の id には頼らない作りにしている。

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
      setShow(doc.scrollTop > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
        <div
          className="h-full bg-shu transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        type="button"
        onClick={toTop}
        aria-label="ページの先頭にもどる"
        className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-shu text-xl text-washi shadow-lg transition-all duration-300 hover:bg-cha ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}

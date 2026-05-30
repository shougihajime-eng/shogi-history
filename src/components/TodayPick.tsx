"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HISTORY } from "@/data/shogi";
import Koma from "@/app/Koma";

// 「きょうの一枚」：その日によって、歴史の出来事をひとつ表示する。
// 日付はブラウザ側で決めるので、表示がぶれないよう画面に出たあと（mount後）に描く。

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export default function TodayPick() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const ev = HISTORY[dayOfYear(new Date()) % HISTORY.length];

  return (
    <section className="today-card p-6 sm:p-8">
      <div className="flex items-center gap-4 sm:gap-6">
        <Koma
          char="今"
          tone="gold"
          className="h-16 w-14 shrink-0 sm:h-20 sm:w-16"
          title="きょうの一枚"
        />
        <div className="min-w-0 flex-1">
          <p className="label">きょうの一枚 ・ 将棋こよみ</p>
          <p className="t-year mt-1 font-mincho text-sm">
            {ev.era}　{ev.year}
          </p>
          <h3 className="mt-0.5 font-mincho text-xl text-washi sm:text-2xl">
            {ev.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-washi-3">
            {ev.body}
          </p>
          <Link href="/history" className="today-jump mt-3 font-mincho text-sm">
            年表でくわしく見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import Koma from "@/app/Koma";

// 各ページの章見出し（小さな駒のしるし＋下線つきの大見出し）。
// 年表ページの SectionTitle と見た目をそろえるための共通部品。
export default function SectionHeading({
  koma,
  className = "",
  children,
}: {
  /** 見出しの左に置く駒の一文字（省略可） */
  koma?: string;
  /** 上の余白などを足したいときに渡す（例：mt-14） */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 border-b-2 border-cha-light/40 pb-2 ${className}`}
    >
      {koma && <Koma char={koma} className="h-8 w-7 shrink-0" />}
      <h2 className="font-mincho text-2xl text-sumi leading-tight">{children}</h2>
    </div>
  );
}

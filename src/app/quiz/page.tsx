import type { Metadata } from "next";
import Link from "next/link";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "将棋の歴史クイズ｜やさしい三択",
  description:
    "将棋の歴史や女流棋士のあゆみから、事実をもとにした三択クイズ。やさしい・ふつう・むずかしいの3段階から選んでランダムに出題。パソコンなら問題用紙として印刷もできます。",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      {/* ヘッダー（印刷には出さない） */}
      <header className="no-print bg-kon text-washi">
        <div className="mx-auto max-w-3xl px-5 py-10 sm:py-12">
          <Link
            href="/"
            className="inline-block text-washi-3 text-sm hover:text-kin transition-colors"
          >
            ← 年表（将棋の歴史）にもどる
          </Link>
          <p className="font-mincho tracking-[0.3em] text-kin text-sm mt-4">
            SHOGI HISTORY QUIZ
          </p>
          <h1 className="font-mincho text-3xl sm:text-4xl mt-2 leading-tight">
            将棋の歴史クイズ
            <span className="block text-lg sm:text-xl mt-2 text-washi-3">
              ― 三択（やさしい・ふつう・むずかしい）―
            </span>
          </h1>
          <p className="mt-5 text-washi-2 leading-relaxed text-sm sm:text-base">
            将棋の歴史や女流棋士のあゆみから、事実をもとにした問題をランダムに出します。
            むずかしさを選んで、ひとつずつ挑戦してもよし。パソコンなら「問題用紙」として印刷もできます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
        <QuizClient />
      </div>

      <footer className="no-print bg-sumi text-washi-3 text-center text-xs py-8 px-5">
        <p className="font-mincho tracking-widest">将棋の歴史クイズ</p>
        <p className="mt-2 opacity-70">
          問題は年表（出典つき）の事実をもとに作成しています。
        </p>
      </footer>
    </main>
  );
}

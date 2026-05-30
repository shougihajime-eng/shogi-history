import type { Metadata } from "next";
import QuizClient from "./QuizClient";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "将棋の歴史クイズ｜やさしい三択",
  description:
    "将棋の歴史・戦法・名棋士・8大タイトル・女流棋士のあゆみから、事実をもとにした三択クイズ。やさしい・ふつう・むずかしいの3段階から選んでランダムに出題。パソコンなら問題用紙として印刷もできます。",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      {/* 見出し（印刷には出さない） */}
      <div className="no-print">
        <PageHero
          kicker="QUIZ ・ 力だめし"
          title="将棋の歴史クイズ"
          koma="問"
          tone="gold"
          lead="将棋の歴史・戦法・名棋士・8大タイトル・女流棋士のあゆみから、事実をもとにした三択問題をランダムに出します。やさしい・ふつう・むずかしいから選んで挑戦。パソコンなら「問題用紙」として印刷もできます。"
        />
      </div>

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

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  buildQuiz,
  LEVEL_LABEL,
  type Level,
  type PreparedQuestion,
} from "@/lib/quiz";

/* =========================================================================
   共通の小物
   ========================================================================= */

type LevelFilter = Level | "all";

const LEVELS: { key: LevelFilter; label: string }[] = [
  { key: "all", label: "ぜんぶ" },
  { key: "easy", label: LEVEL_LABEL.easy },
  { key: "normal", label: LEVEL_LABEL.normal },
  { key: "hard", label: LEVEL_LABEL.hard },
];

// 選択肢につける記号
const MARK = ["ア", "イ", "ウ"];

// ひとつずつ挑戦モードの1ラウンドの問題数
const ROUND = 10;

/** 難易度を選ぶボタンの列 */
function LevelPicker({
  value,
  onChange,
}: {
  value: LevelFilter;
  onChange: (lv: LevelFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {LEVELS.map((lv) => {
        const active = lv.key === value;
        return (
          <button
            key={lv.key}
            type="button"
            onClick={() => onChange(lv.key)}
            className={
              "rounded-full px-4 py-1.5 text-sm border transition-colors " +
              (active
                ? "bg-kon text-washi border-kon"
                : "bg-washi text-sumi border-cha-light/40 hover:bg-washi-3")
            }
          >
            {lv.label}
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   モード1：ひとつずつ挑戦
   ========================================================================= */

function PlayMode() {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 新しい10問を用意する（ランダム）
  const start = useCallback((lv: LevelFilter) => {
    setQuestions(buildQuiz(lv, ROUND));
    setIndex(0);
    setSelected(null);
    setScore(0);
  }, []);

  // サーバーと食いちがわないように、画面が出てから問題を作る
  useEffect(() => {
    setMounted(true);
    start("all");
  }, [start]);

  function changeLevel(lv: LevelFilter) {
    setLevel(lv);
    start(lv);
  }

  function choose(i: number) {
    if (selected !== null) return; // もう答えたら受け付けない
    setSelected(i);
    if (i === questions[index].answerIndex) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  if (!mounted || questions.length === 0) {
    return <p className="text-sumi-soft text-sm">問題を読み込んでいます…</p>;
  }

  const finished = index >= questions.length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sumi-soft text-sm">むずかしさを選んでね</p>
        <LevelPicker value={level} onChange={changeLevel} />
      </div>

      {finished ? (
        <Result
          score={score}
          total={questions.length}
          onRetry={() => start(level)}
        />
      ) : (
        <Card
          question={questions[index]}
          index={index}
          total={questions.length}
          score={score}
          selected={selected}
          onChoose={choose}
          onNext={next}
        />
      )}
    </div>
  );
}

/** 1問ぶんのカード */
function Card({
  question,
  index,
  total,
  score,
  selected,
  onChoose,
  onNext,
}: {
  question: PreparedQuestion;
  index: number;
  total: number;
  score: number;
  selected: number | null;
  onChoose: (i: number) => void;
  onNext: () => void;
}) {
  const answered = selected !== null;
  const correct = answered && selected === question.answerIndex;

  return (
    <div className="rounded-xl border border-cha-light/30 bg-washi-2 p-5 sm:p-6 space-y-5">
      {/* 進み具合と点数 */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-kin font-mincho">
          第{index + 1}問 / 全{total}問
        </span>
        <span className="text-sumi-soft">
          正解 {score} / {index + (answered ? 1 : 0)}
        </span>
      </div>

      {/* むずかしさのしるし */}
      <span className="inline-block rounded bg-cha/10 text-cha text-xs px-2 py-0.5 font-mincho">
        {LEVEL_LABEL[question.level]}
      </span>

      {/* 問題文 */}
      <p className="font-mincho text-lg sm:text-xl text-sumi leading-relaxed">
        {question.q}
      </p>

      {/* 選択肢 */}
      <div className="space-y-3">
        {question.choices.map((c, i) => {
          const isAnswer = i === question.answerIndex;
          const isPicked = i === selected;

          let cls =
            "border-cha-light/40 bg-washi hover:bg-washi-3 text-sumi";
          if (answered) {
            if (isAnswer) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
            else if (isPicked) cls = "border-shu bg-shu/10 text-shu";
            else cls = "border-cha-light/30 bg-washi text-sumi-soft opacity-60";
          }

          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => onChoose(i)}
              className={
                "w-full text-left rounded-lg border px-4 py-3 flex items-center gap-3 transition-colors " +
                cls
              }
            >
              <span className="font-mincho shrink-0 w-6 text-center text-cha">
                {MARK[i]}
              </span>
              <span className="flex-1">{c}</span>
              {answered && isAnswer && <span className="text-emerald-600">◯</span>}
              {answered && isPicked && !isAnswer && (
                <span className="text-shu">✕</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 答えあわせ */}
      {answered && (
        <div className="space-y-4">
          <div
            className={
              "rounded-lg p-4 text-sm leading-relaxed " +
              (correct
                ? "bg-emerald-50 text-emerald-900"
                : "bg-shu/10 text-sumi")
            }
          >
            <p className="font-bold mb-1">
              {correct ? "せいかい！🎉" : "ざんねん…"}
            </p>
            <p>{question.explain}</p>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="w-full rounded-lg bg-kon text-washi py-3 font-mincho hover:bg-kon-light transition-colors"
          >
            {index + 1 < total ? "次の問題へ →" : "結果を見る →"}
          </button>
        </div>
      )}
    </div>
  );
}

/** 結果発表 */
function Result({
  score,
  total,
  onRetry,
}: {
  score: number;
  total: number;
  onRetry: () => void;
}) {
  const ratio = score / total;
  let message = "おつかれさま！";
  if (ratio === 1) message = "全問正解！将棋はかせだ！🏆";
  else if (ratio >= 0.8) message = "すごい！よく知ってるね！";
  else if (ratio >= 0.5) message = "いい調子！もう一回いってみよう。";
  else message = "これから少しずつ覚えていこう！";

  return (
    <div className="rounded-xl border border-cha-light/30 bg-kon text-washi p-8 text-center space-y-5">
      <p className="font-mincho text-kin">けっか</p>
      <p className="font-mincho text-4xl">
        {score}
        <span className="text-2xl"> / {total} 問</span>
      </p>
      <p className="text-washi-2">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-washi text-kon px-6 py-3 font-mincho hover:bg-washi-3 transition-colors"
      >
        もう一回（べつの{ROUND}問）
      </button>
    </div>
  );
}

/* =========================================================================
   モード2：印刷して使う
   ========================================================================= */

const COUNTS: { value: number; label: string }[] = [
  { value: 10, label: "10問" },
  { value: 20, label: "20問" },
  { value: 0, label: "ぜんぶ" },
];

function PrintMode() {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [count, setCount] = useState<number>(10);
  const [items, setItems] = useState<PreparedQuestion[]>([]);
  const [mounted, setMounted] = useState(false);

  const make = useCallback((lv: LevelFilter, c: number) => {
    setItems(buildQuiz(lv, c));
  }, []);

  useEffect(() => {
    setMounted(true);
    make("all", 10);
  }, [make]);

  function changeLevel(lv: LevelFilter) {
    setLevel(lv);
    make(lv, count);
  }
  function changeCount(c: number) {
    setCount(c);
    make(level, c);
  }

  if (!mounted) {
    return <p className="text-sumi-soft text-sm">じゅんび中…</p>;
  }

  const levelName = LEVELS.find((l) => l.key === level)?.label ?? "ぜんぶ";

  return (
    <div className="space-y-6">
      {/* 設定（印刷には出さない） */}
      <div className="no-print space-y-5 rounded-xl border border-cha-light/30 bg-washi-2 p-5">
        <div className="space-y-2">
          <p className="text-sumi-soft text-sm">むずかしさ</p>
          <LevelPicker value={level} onChange={changeLevel} />
        </div>
        <div className="space-y-2">
          <p className="text-sumi-soft text-sm">問題の数</p>
          <div className="flex flex-wrap gap-2">
            {COUNTS.map((c) => {
              const active = c.value === count;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => changeCount(c.value)}
                  className={
                    "rounded-full px-4 py-1.5 text-sm border transition-colors " +
                    (active
                      ? "bg-kon text-washi border-kon"
                      : "bg-washi text-sumi border-cha-light/40 hover:bg-washi-3")
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={() => make(level, count)}
            className="rounded-lg border border-cha-light/50 bg-washi px-5 py-2.5 text-sm text-cha hover:bg-washi-3 transition-colors"
          >
            🔀 問題をつくりなおす
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-shu text-washi px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
          >
            🖨️ 印刷する
          </button>
        </div>
        <p className="text-sumi-soft text-xs leading-relaxed">
          ※「印刷する」を押すと、パソコンの印刷画面が開きます。下に見えている問題用紙がそのまま印刷されます。
          答え（解答）は最後のページにまとまっているので、配るときは前のページだけ渡せます。
        </p>
      </div>

      {/* ここから下が印刷される「問題用紙」 */}
      <div className="print-area rounded-xl border border-cha-light/30 bg-white p-6 sm:p-8">
        {/* 見出し */}
        <div className="text-center border-b-2 border-sumi/30 pb-4 mb-6">
          <h2 className="font-mincho text-2xl text-sumi">将棋の歴史クイズ</h2>
          <p className="text-sumi-soft text-sm mt-1">
            三択問題（{levelName}）・全{items.length}問
          </p>
          <p className="text-sumi-soft text-sm mt-3">
            なまえ ＿＿＿＿＿＿＿＿＿＿　　てんすう ＿＿＿ / {items.length}
          </p>
        </div>

        {/* 問題 */}
        <ol className="space-y-5">
          {items.map((it, n) => (
            <li key={it.id} className="break-inside-avoid">
              <p className="font-mincho text-sumi leading-relaxed">
                <span className="text-shu mr-1">問{n + 1}.</span>
                {it.q}
              </p>
              <ul className="mt-2 ml-5 space-y-1 text-sumi-soft">
                {it.choices.map((c, i) => (
                  <li key={i}>
                    <span className="text-cha mr-1">{MARK[i]}.</span>
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* 解答（こたえ）。印刷では新しいページから始まる */}
        <div className="mt-10 pt-6 border-t-2 border-sumi/30 print:break-before-page">
          <h3 className="font-mincho text-xl text-sumi mb-4">解答（こたえ）</h3>
          <ol className="space-y-2 text-sm text-sumi-soft">
            {items.map((it, n) => (
              <li key={it.id} className="break-inside-avoid">
                <span className="font-mincho text-sumi mr-1">
                  問{n + 1}．{MARK[it.answerIndex]}　{it.choices[it.answerIndex]}
                </span>
                <span className="block ml-4 text-xs leading-relaxed">
                  {it.explain}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   親（モードの切り替え）
   ========================================================================= */

export default function QuizClient() {
  const [mode, setMode] = useState<"play" | "print">("play");

  return (
    <div className="space-y-6">
      {/* モード切り替え（印刷には出さない） */}
      <div className="no-print flex gap-2 rounded-full bg-washi-2 border border-cha-light/30 p-1 w-full max-w-sm">
        {(
          [
            { key: "play", label: "ひとつずつ挑戦" },
            { key: "print", label: "印刷して使う" },
          ] as const
        ).map((m) => {
          const active = m.key === mode;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={
                "flex-1 rounded-full py-2 text-sm transition-colors " +
                (active
                  ? "bg-kon text-washi"
                  : "text-sumi-soft hover:text-sumi")
              }
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {mode === "play" ? <PlayMode /> : <PrintMode />}
    </div>
  );
}

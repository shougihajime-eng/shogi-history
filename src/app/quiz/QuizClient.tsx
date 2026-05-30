"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildQuiz,
  LEVEL_LABEL,
  type Level,
  type PreparedQuestion,
} from "@/lib/quiz";
import Koma from "@/app/Koma";

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
              "rounded-full px-4 py-2 text-sm border transition-colors " +
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

  // キーボードでも遊べるように（パソコン向け）：1・2・3 で回答、Enter / スペースで次へ
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (questions.length === 0 || index >= questions.length) return;
      if (selected === null) {
        const map: Record<string, number> = { "1": 0, "2": 1, "3": 2 };
        const n = map[e.key];
        if (n !== undefined && n < questions[index].choices.length) {
          e.preventDefault();
          choose(n);
        }
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, index, questions]);

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
        {!finished && (
          <p className="hidden sm:block pt-1 text-xs text-sumi-faint">
            💡 パソコンなら、キーボードの「1・2・3」で答えを選べます。答え合わせのあとは「Enter」で次の問題へ。
          </p>
        )}
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

  // 答えたら「次へ」ボタンを画面内に入れる（スマホで見落とさないように）
  const nextRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (answered) {
      nextRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [answered]);

  return (
    <div className="rounded-xl border border-cha-light/30 bg-washi-2 p-5 sm:p-6 space-y-5">
      {/* 進み具合と点数 */}
      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-kin font-mincho">
            第{index + 1}問 / 全{total}問
          </span>
          <span className="text-sumi-soft">
            正解 {score} / {index + (answered ? 1 : 0)}
          </span>
        </div>
        {/* あと何問かが一目で分かる進みバー */}
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-washi-3/70"
          role="progressbar"
          aria-valuenow={index + (answered ? 1 : 0)}
          aria-valuemin={0}
          aria-valuemax={total}
        >
          <div
            className="h-full rounded-full bg-kin transition-[width] duration-300 ease-out"
            style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
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

          // ボタン全体の色（未回答／正解＝抹茶／選んだまちがい＝朱／その他）
          let cls = "border-cha-light/40 bg-washi hover:bg-washi-3 text-sumi";
          // 左の丸い番号バッジの色
          let badge = "border-cha-light/50 bg-washi text-cha";
          if (answered) {
            if (isAnswer) {
              cls = "border-[#6f8f5a] bg-[#eef3e6] text-[#33502a]";
              badge = "border-transparent bg-[#6f8f5a] text-white";
            } else if (isPicked) {
              cls = "border-shu bg-shu/10 text-shu";
              badge = "border-transparent bg-shu text-washi";
            } else {
              cls = "border-cha-light/30 bg-washi text-sumi-soft opacity-60";
            }
          }

          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => onChoose(i)}
              className={
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors " +
                (answered ? "" : "active:scale-[0.99] ") +
                cls
              }
            >
              <span
                className={
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mincho text-sm transition-colors " +
                  badge
                }
              >
                {MARK[i]}
              </span>
              <span className="flex-1 leading-snug">{c}</span>
              {answered && isAnswer && (
                <span className="shrink-0 text-lg text-[#5a7a45]">◯</span>
              )}
              {answered && isPicked && !isAnswer && (
                <span className="shrink-0 text-lg text-shu">✕</span>
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
              "rounded-lg border p-4 text-sm leading-relaxed " +
              (correct
                ? "border-[#6f8f5a]/40 bg-[#eef3e6] text-[#33502a]"
                : "border-shu/30 bg-shu/10 text-sumi")
            }
          >
            <p className="mb-1 font-bold">
              {correct ? "せいかい！🎉" : "ざんねん…"}
            </p>
            <p>{question.explain}</p>
          </div>
          <button
            ref={nextRef}
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
      <Koma
        char={ratio >= 0.8 ? "祝" : "棋"}
        tone="gold"
        className="mx-auto h-16 w-14"
        title="けっか"
      />
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
                    "rounded-full px-4 py-2 text-sm border transition-colors " +
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

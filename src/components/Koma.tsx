import type { CSSProperties } from "react";

// 将棋の駒（五角形）のモチーフ。SVG なのでどんな大きさでもくっきり。
// tone で色味を変える：墨（ink）・朱（red）・金（gold）・紺（indigo）・線だけ（outline）

export type KomaTone = "ink" | "red" | "gold" | "indigo" | "outline";

const TONES: Record<KomaTone, { fill: string; stroke: string; text: string }> = {
  ink: { fill: "var(--color-washi-2)", stroke: "var(--color-sumi)", text: "var(--color-sumi)" },
  red: { fill: "var(--color-shu)", stroke: "var(--color-shu-deep)", text: "var(--color-washi)" },
  gold: { fill: "var(--color-kin)", stroke: "#8a6526", text: "#fffaf0" },
  indigo: { fill: "var(--color-kon)", stroke: "#16263a", text: "var(--color-washi)" },
  outline: { fill: "var(--color-washi)", stroke: "var(--color-cha)", text: "var(--color-cha)" },
};

export function Koma({
  char,
  tone = "ink",
  className,
  style,
  title,
}: {
  char?: string;
  tone?: KomaTone;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  const t = TONES[tone];
  const fontSize = char && char.length > 1 ? 30 : 46;
  return (
    <span className={`koma ${className ?? ""}`} style={style} aria-hidden={title ? undefined : true}>
      <svg viewBox="0 0 100 110" role={title ? "img" : undefined} aria-label={title}>
        {/* 駒の輪郭（上が細く下が広い五角形） */}
        <polygon
          points="38,5 62,5 87,29 93,105 7,105 13,29"
          style={{ fill: t.fill, stroke: t.stroke }}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {/* 彫りのような内側の細い線 */}
        <polygon
          points="38,11 60,11 81,31 86,99 14,99 19,31"
          fill="none"
          style={{ stroke: t.stroke }}
          strokeOpacity={0.3}
          strokeWidth={1}
        />
        {char ? (
          <text
            x="50"
            y="68"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fill: t.text, fontFamily: "var(--font-mincho)" }}
            fontWeight={700}
            fontSize={fontSize}
          >
            {char}
          </text>
        ) : null}
      </svg>
    </span>
  );
}

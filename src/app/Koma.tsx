/* =========================================================================
   駒（将棋の駒の五角形）の部品
   - 中に一文字を入れて、将棋の駒の形で見せる飾り。
   - tone（色味）で「木目／金（別格用）／紺」を切りかえる。
   - 純粋な見た目だけの部品なので、サーバー側で描ける（client 不要）。
   ========================================================================= */

type Tone = "wood" | "gold" | "navy";

const TONES: Record<Tone, { fill: string; stroke: string; text: string }> = {
  // 木目（ふつうの駒）
  wood: { fill: "var(--color-washi-3)", stroke: "var(--color-cha)", text: "var(--color-sumi)" },
  // 金（別格＝竜王・名人など特別なもの）
  gold: { fill: "var(--color-kin-light)", stroke: "var(--color-kin)", text: "var(--color-sumi)" },
  // 紺（濃い背景の上に置くとき）
  navy: { fill: "var(--color-kon)", stroke: "var(--color-kon-light)", text: "var(--color-washi)" },
};

export default function Koma({
  char,
  tone = "wood",
  className = "",
  title,
}: {
  /** 駒の中に入れる一文字（例：「名」「竜」） */
  char: string;
  tone?: Tone;
  /** 大きさは Tailwind の w-/h- で外から指定する（例：w-11 h-12） */
  className?: string;
  /** 読み上げ用の説明（あれば） */
  title?: string;
}) {
  const c = TONES[tone];
  // 上がとがって下が広い、将棋の駒の五角形
  const points = "24,3 37,16 41,49 7,49 11,16";
  return (
    <span className={`koma ${className}`} aria-hidden={title ? undefined : true}>
      <svg viewBox="0 0 48 52" role={title ? "img" : undefined} aria-label={title}>
        {title && <title>{title}</title>}
        <polygon
          points={points}
          fill={c.fill}
          stroke={c.stroke}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        <text
          x="24"
          y="36"
          textAnchor="middle"
          fontSize="23"
          fontWeight={700}
          fill={c.text}
          style={{ fontFamily: "var(--font-mincho)" }}
        >
          {char}
        </text>
      </svg>
    </span>
  );
}

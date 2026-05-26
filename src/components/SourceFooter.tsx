import { SOURCES, LAST_VERIFIED } from "@/data/shogi";

// 各ページの下に出す「出典（どこで確かめたか）」と、このサイトの約束。
export default function SourceFooter({
  sourceKeys,
}: {
  sourceKeys: (keyof typeof SOURCES)[];
}) {
  return (
    <footer className="mt-16 border-t-2 border-cha-light/30 bg-washi-2">
      <div className="mx-auto max-w-4xl px-5 py-8 text-sm text-sumi-soft">
        <p className="font-mincho text-base text-cha">
          出典（どこで確かめたか）
        </p>
        <ul className="mt-3 space-y-2">
          {sourceKeys.map((key) => {
            const s = SOURCES[key];
            return (
              <li key={key} className="flex gap-2">
                <span className="text-shu">●</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kon-light underline underline-offset-2 hover:text-shu break-all"
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 leading-relaxed">
          このページの数字や出来事は、上の公式・信頼できる資料で確かめた事実だけを載せています。
          でたらめや当てずっぽうは載せていません。
        </p>
        <p className="mt-2 text-xs text-cha">最終確認日：{LAST_VERIFIED}</p>
      </div>
    </footer>
  );
}

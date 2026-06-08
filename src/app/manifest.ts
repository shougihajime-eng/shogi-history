import type { MetadataRoute } from "next";

// スマホの「ホーム画面に追加」で、本物のアプリのように全画面で開くための設定
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "将棋の歴史｜年表とクイズ",
    short_name: "将棋の歴史",
    description:
      "将棋が生まれてから藤井聡太の八冠まで、千年の歩みをやさしい年表とクイズでたどれる和風の読み物アプリ。",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f7f1e3",
    theme_color: "#f7f1e3",
    lang: "ja",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}

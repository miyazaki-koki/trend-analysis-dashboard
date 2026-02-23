import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'トレンド分析ダッシュボード 2025-2026',
  description: '2025〜2026年のトレンド分析と未来展望 - SNS・AI・消費・コミュニティの構造変化を可視化',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

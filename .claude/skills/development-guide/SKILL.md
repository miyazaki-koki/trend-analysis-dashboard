---
name: development-guide
description: トレンド分析ダッシュボードプロジェクトの開発ガイドライン。Next.js 14、Recharts、Tailwind CSS、TypeScript構成、開発コマンド、アーキテクチャ、Git操作について案内。コードを書く前、新機能実装時、環境構築時に使用。
allowed-tools: Read, Glob, Grep, Bash
---

# トレンド分析ダッシュボード 開発ガイドライン

このSkillはトレンド分析ダッシュボードプロジェクトの開発規約とベストプラクティスを提供します。

## プロジェクト構成

### シンプル Next.js 構成（モノレポではなし）

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # ホームページ
│   │   ├── dashboard/
│   │   │   └── page.tsx        # ダッシュボード
│   │   └── api/                # API Routes
│   │       └── data/
│   │           └── route.ts    # データAPI
│   │
│   ├── components/             # React コンポーネント
│   │   ├── charts/             # チャートコンポーネント
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── ...
│   │   ├── dashboard/          # ダッシュボードコンポーネント
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── KPICard.tsx
│   │   │   └── ...
│   │   └── ui/                 # 汎用UIコンポーネント
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   │
│   ├── lib/                    # ユーティリティ
│   │   ├── data.ts             # データ処理関数
│   │   ├── calculations.ts     # 計算関数（移動平均など）
│   │   ├── formats.ts          # フォーマット関数
│   │   └── utils.ts
│   │
│   ├── types/                  # TypeScript型定義
│   │   ├── metrics.ts
│   │   ├── chart.ts
│   │   └── api.ts
│   │
│   └── data/                   # ダミーデータ
│       ├── mock-data.ts
│       └── fixtures.ts
│
├── public/                     # 静的ファイル
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

### 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **チャート**: Recharts
- **UI基盤**: Headless Components
- **フォーム**: React Hook Form
- **バリデーション**: Zod

## 開発コマンド

### 開発サーバー起動

```bash
npm run dev
# localhost:3000 で起動
```

### ビルド

```bash
npm run build      # ビルド実行
npm run start      # ビルド後の本番モードで起動
```

### リント・フォーマット

```bash
npm run lint       # ESLint実行
npm run format     # Prettier フォーマット
```

### テスト

```bash
npm run test       # Jest テスト実行
npm run test:watch # ウォッチモード
```

### 型チェック

```bash
npm run type-check # TypeScript型チェック
```

## アーキテクチャ

### レイヤー構成

```
app/               # ページ層（ルーティング）
├── page.tsx       # App Router ページコンポーネント
└── layout.tsx     # レイアウト定義

components/        # UI/プレゼンテーション層
├── charts/        # チャートコンポーネント
├── dashboard/     # ダッシュボード機能コンポーネント
└── ui/            # 汎用UIコンポーネント

lib/              # ビジネスロジック層
├── data.ts       # データ処理
├── calculations.ts # メトリクス計算
└── formats.ts    # フォーマット

types/            # 型定義層
└── *.ts          # ドメイン型定義

data/             # データ層
└── mock-data.ts  # ダミーデータ
```

### データフロー

```
Page (app/)
  ↓
Container Component
  ↓ (useEffect / API call)
lib/data.ts (データ取得・加工)
  ↓
Presentation Component (components/)
  ↓
Recharts / UI Components
```

### Server Components vs Client Components

- **Server Components（デフォルト）**: ページ、レイアウト、データ取得関数
- **Client Components（'use client'）**: インタラクティブ機能、フック使用、イベントハンドラ

```typescript
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}

// components/dashboard/Dashboard.tsx (Client Component)
'use client';
export function Dashboard({ data }) {
  const [filter, setFilter] = useState();
  return <...></>;
}
```

## データ管理

### ダミーデータの利用

本プロジェクトはデータベース、API不要のため、すべてダミーデータで対応：

```typescript
// src/data/mock-data.ts
export const mockChartData = [
  { date: '2024-01-01', sales: 12000, growth: 5 },
  { date: '2024-01-02', sales: 15000, growth: 8 },
  // ...
];

// src/app/dashboard/page.tsx
import { mockChartData } from '@/data/mock-data';

export default function DashboardPage() {
  return <Dashboard data={mockChartData} />;
}
```

## 新規コンポーネント作成

### チャートコンポーネント例

```typescript
// src/components/charts/TrendLineChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendLineChartProps {
  data: Array<{ date: string; value: number }>;
  title: string;
  color?: string;
}

export function TrendLineChart({ data, title, color = '#0ea5e9' }: TrendLineChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### UIコンポーネント例

```typescript
// src/components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
```

## Git操作規約

### 重要な禁止事項

- **フォースプッシュ禁止**: `git push --force`は必ず事前に許可を取る
- **main へのforce push禁止**
- **--no-verify禁止**: フック省略はしない

### コミット作成

```bash
# コミット前に必ず確認
git status
git diff --staged

# コミットメッセージ形式
git commit -m "$(cat <<'EOF'
機能説明：フロントエンド実装

詳細な説明（必要に応じて）

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

## コーディング規約

### 言語設定

- **会話**: 日本語
- **コードコメント**: 日本語
- **UI文言**: 日本語
- **API レスポンス**: 英語（ただし日本語説明は UI に）

### ファイル命名

- **コンポーネント**: `PascalCase.tsx`
- **ユーティリティ**: `camelCase.ts`
- **型定義**: `*.types.ts` または `*.model.ts`
- **定数**: `UPPER_SNAKE_CASE`

### インポート順序

```typescript
// 1. React/Next.js
import React from 'react';
import { useState } from 'react';

// 2. 外部ライブラリ
import { LineChart, Line } from 'recharts';

// 3. 内部モジュール（@/）
import { TrendLineChart } from '@/components/charts/TrendLineChart';
import { calculateMovingAverage } from '@/lib/calculations';
import type { MetricData } from '@/types/metrics';

// 4. 相対パス
import { formatDate } from './utils';
```

### TypeScript型定義

```typescript
// src/types/metrics.ts
export interface MetricData {
  date: string;
  value: number;
  label?: string;
}

export interface ChartDataPoint {
  x: number | string;
  y: number;
}

export type TrendType = 'uptrend' | 'downtrend' | 'sideway';
```

## 推奨プラクティス

### コンポーネント設計

1. **単一責任**: 1コンポーネント = 1つの責任
2. **Props の型**: 必ず TypeScript で型定義
3. **デフォルト値**: オプション Props には defaults を設定
4. **Memo 活用**: 頻繁に再レンダリングされるコンポーネントは `React.memo`

```typescript
interface ChartProps {
  data: MetricData[];
  title: string;
  height?: number;
}

export const Chart = React.memo(({ data, title, height = 300 }: ChartProps) => {
  return <...></>;
});
```

### データ処理

1. **計算関数は lib/ へ**: ビジネスロジックはコンポーネント外へ
2. **型安全性**: 計算関数は必ず型定義
3. **エラーハンドリング**: try-catch で API エラーに対応

```typescript
// src/lib/calculations.ts
export function calculateMovingAverage(data: MetricData[], window: number): MetricData[] {
  // 実装
}

// src/components/charts/Chart.tsx
try {
  const smoothedData = calculateMovingAverage(data, 7);
} catch (error) {
  console.error('計算エラー:', error);
}
```

## 環境変数

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## 開発環境セットアップ

```bash
# 1. 依存インストール
npm install

# 2. 開発サーバー起動
npm run dev

# 3. ブラウザで確認
open http://localhost:3000
```

## トラブルシューティング

| 問題 | 対処 |
|-----|------|
| ポート 3000 が使用中 | `PORT=3001 npm run dev` または他のポート指定 |
| 型エラー表示 | `npm run type-check` で詳細確認 |
| 変更が反映されない | キャッシュクリア: `.next` フォルダ削除後再起動 |

## 関連ドキュメント

詳細は以下を参照:
- [CLAUDE.md](../../CLAUDE.md) - プロジェクト全体の指針
- [DESIGN_RULE.md](../../DESIGN_RULE.md) - デザインシステム
- [README.md](../../README.md) - プロジェクト概要

# プロジェクト構造・アーキテクチャ

## ディレクトリ構成

```
trend-analysis-dashboard/
├── .kiro/                           # Kiro設定ファイル
│   ├── steering/                    # このディレクトリ（開発標準）
│   └── settings/                    # プロジェクト設定
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # ルートレイアウト
│   │   ├── page.tsx                 # ホームページ
│   │   └── globals.css              # グローバルスタイル
│   ├── components/                  # React コンポーネント
│   │   ├── ui/                      # 基本UIコンポーネント
│   │   │   ├── Card.tsx             # カード要素
│   │   │   ├── Button.tsx           # ボタン
│   │   │   ├── Badge.tsx            # バッジ
│   │   │   └── Metric.tsx           # メトリクス表示
│   │   ├── charts/                  # チャートコンポーネント
│   │   │   ├── LineChart.tsx        # 折れ線グラフ
│   │   │   ├── BarChart.tsx         # 棒グラフ
│   │   │   ├── AreaChart.tsx        # エリアチャート
│   │   │   └── ChartTooltip.tsx     # 共通ツールチップ
│   │   └── dashboard/               # ダッシュボード関連
│   │       ├── Dashboard.tsx        # メインダッシュボード
│   │       ├── Header.tsx           # ヘッダー
│   │       └── Sidebar.tsx          # サイドバー
│   ├── lib/                         # ユーティリティ関数
│   │   ├── utils.ts                 # 汎用ユーティリティ
│   │   ├── colors.ts                # カラーシステム
│   │   ├── math.ts                  # 数学計算
│   │   └── formatting.ts            # データフォーマット
│   ├── types/                       # TypeScript型定義
│   │   ├── index.ts                 # 型エクスポート
│   │   ├── trend.ts                 # トレンドデータ型
│   │   ├── chart.ts                 # チャート関連型
│   │   └── api.ts                   # API レスポンス型
│   └── data/                        # 静的データソース
│       ├── trends.ts                # トレンドデータ
│       ├── metrics.ts               # メトリクスデータ
│       └── sample-data.ts           # サンプルデータ
├── public/                          # 静的アセット
│   └── favicon.ico
├── .eslintrc.json                   # ESLint設定
├── tsconfig.json                    # TypeScript設定
├── tailwind.config.ts               # Tailwind CSS設定
├── next.config.js                   # Next.js設定
├── package.json                     # 依存パッケージ
└── README.md                        # プロジェクト説明
```

## コンポーネント設計原則

### UI コンポーネント（src/components/ui/）
- 再利用可能な基本要素
- プロップスで完全にカスタマイズ可能
- スタイルロジックは clsx + tailwind-merge で実装
- 単一責任原則を厳守

```typescript
// Good: 再利用可能で拡張性がある
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'subtle';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return <div className={cn('base-styles', variantStyles[variant], className)}>{children}</div>;
}
```

### チャートコンポーネント（src/components/charts/）
- Recharts をラップする高レベルコンポーネント
- データフォーマットを正規化
- 共通のツールチップやレジェンド
- レスポンシブ対応

```typescript
interface ChartData {
  timestamp: string;
  value: number;
  category?: string;
}

interface LineChartProps {
  data: ChartData[];
  title: string;
  yAxisLabel?: string;
}
```

### ダッシュボードコンポーネント（src/components/dashboard/）
- ページレベルのコンポーネント
- 複数の子コンポーネントを組み合わせ
- ステート管理を担当
- レイアウトを定義

## 型定義の構成

### src/types/trend.ts
```typescript
export interface Trend {
  id: string;
  name: string;
  description: string;
  data: TrendDataPoint[];
  unit: string;
  baseline?: number;
}

export interface TrendDataPoint {
  timestamp: Date;
  value: number;
  metadata?: Record<string, unknown>;
}
```

### src/types/chart.ts
```typescript
export type ChartType = 'line' | 'bar' | 'area';
export interface ChartConfig {
  type: ChartType;
  dataKey: string;
  stroke?: string;
  fill?: string;
}
```

## データフロー

```
src/data/ (データソース)
    ↓
src/components/ (コンポーネント)
    ↓
src/types/ (型チェック)
    ↓
src/lib/ (変換・フォーマット)
    ↓
UI表示
```

## インポート組織

```typescript
// Layer 1: React & Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Layer 2: External libraries
import { LineChart, BarChart } from 'recharts';
import { AlertIcon, TrendingUpIcon } from 'lucide-react';

// Layer 3: Internal - Components
import { Card } from '@/components/ui/Card';
import { Dashboard } from '@/components/dashboard/Dashboard';

// Layer 4: Internal - Utils & Types
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/formatting';
import type { Trend } from '@/types/trend';

// Layer 5: Internal - Data
import { SAMPLE_TRENDS } from '@/data/trends';
```

## ファイルサイズの目安

- UI コンポーネント: 100-300行
- チャートコンポーネント: 200-500行
- ダッシュボードコンポーネント: 300-800行
- ユーティリティ関数: 50-200行
- 型定義ファイル: 50-150行

大きくなりすぎたら分割を検討してください。

## 依存関係の方向

```
子コンポーネント → 親コンポーネント（許可）
同一レベルコンポーネント → お互い（禁止、共通コンポーネント経由）
utils → コンポーネント（許可）
コンポーネント → utils（許可）
data → コンポーネント（許可）
types → 全て（許可）
```

## 環境変数の場所

`src/lib/config.ts` で環境変数を集中管理

```typescript
export const config = {
  apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000',
  dataRefreshInterval: process.env.DATA_REFRESH_INTERVAL ? parseInt(process.env.DATA_REFRESH_INTERVAL) : 60000,
} as const;
```

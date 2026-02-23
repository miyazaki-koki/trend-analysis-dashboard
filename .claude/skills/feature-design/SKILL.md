---
name: feature-design
description: トレンド分析ダッシュボードの機能設計パターン。ダッシュボードウィジェット、チャートコンポーネント、データフィルタ、レスポンシブレイアウト、コンポーネント合成パターン。新機能実装時、チャート機能作成時、ダッシュボード設計時に使用。
allowed-tools: Read, Glob, Grep
---

# トレンド分析ダッシュボード 機能設計パターン

ダッシュボード機能の設計パターンと実装ガイドラインです。

## 標準的なディレクトリ構成

```
app/
├── page.tsx                    # ホームページ
└── dashboard/
    └── page.tsx               # ダッシュボードページ

components/
├── charts/                     # チャートコンポーネント
│   ├── LineChart.tsx           # 折れ線グラフ
│   ├── BarChart.tsx            # 棒グラフ
│   ├── AreaChart.tsx           # エリアチャート
│   └── ChartContainer.tsx      # チャートラッパー
├── dashboard/                  # ダッシュボード機能
│   ├── Dashboard.tsx           # メインダッシュボード
│   ├── DashboardHeader.tsx     # ヘッダー（フィルタ）
│   ├── KPICard.tsx             # KPI表示カード
│   ├── MetricsGrid.tsx         # メトリクスグリッド
│   └── DateRangePicker.tsx     # 期間選択
└── ui/                         # 汎用UIコンポーネント
    ├── Button.tsx
    ├── Card.tsx
    ├── Select.tsx
    └── ...

lib/
├── data.ts                     # データ取得・キャッシング
├── calculations.ts             # 移動平均、成長率など
├── formats.ts                  # 日付、数値フォーマット
└── constants.ts                # 定数（色、閾値など）

types/
├── metrics.ts                  # メトリクス型定義
├── chart.ts                    # チャート型定義
└── dashboard.ts                # ダッシュボード型定義

data/
└── mock-data.ts                # ダミーデータ
```

## ダッシュボード設計パターン

### レイアウトパターン

```
┌─────────────────────────────────────┐
│  ダッシュボード            [日付選択]  │
├─────────────────────────────────────┤
│ KPI1  KPI2  KPI3  KPI4             │  ← 4列KPIカード
├─────────────────────────────────────┤
│                                      │
│      メインチャート（折れ線）        │
│      売上推移 / アクティブユーザー   │
│                                      │
├─────────────────────────────────────┤
│ チャート1    │   チャート2          │  ← 2列グリッド
├─────────────────────────────────────┤
│ チャート3    │   チャート4          │
└─────────────────────────────────────┘
```

### レスポンシブグリッド

```typescript
// Tailwind Grid クラス
// Mobile: 1列
// Tablet(md): 2列
// Desktop(lg): 4列

// KPI カード
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// チャートグリッド
className="grid grid-cols-1 lg:grid-cols-2 gap-6"
```

## コンポーネント設計パターン

### KPI カード

```typescript
// src/components/dashboard/KPICard.tsx
interface KPICardProps {
  label: string;
  value: number | string;
  unit?: string;
  changePercent?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function KPICard({
  label,
  value,
  unit = '',
  changePercent,
  icon,
  trend = 'neutral'
}: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value}
            {unit && <span className="text-lg ml-1">{unit}</span>}
          </p>
        </div>
        {icon && <div className="text-sky-500">{icon}</div>}
      </div>
      {changePercent !== undefined && (
        <p className={`text-sm font-medium mt-4 ${
          trend === 'up' ? 'text-green-600' :
          trend === 'down' ? 'text-red-600' :
          'text-gray-600'
        }`}>
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {Math.abs(changePercent)}%
        </p>
      )}
    </div>
  );
}
```

### チャート コンテナ

```typescript
// src/components/charts/ChartContainer.tsx
interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ChartContainer({
  title,
  subtitle,
  children,
  footer
}: ChartContainerProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="mb-4">
        {children}
      </div>
      {footer && <div className="border-t border-gray-200 pt-4">{footer}</div>}
    </div>
  );
}
```

### 日付範囲選択

```typescript
// src/components/dashboard/DateRangePicker.tsx
'use client';

interface DateRangePickerProps {
  onDateRangeChange: (start: Date, end: Date) => void;
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div className="flex gap-4">
      <input
        type="date"
        value={formatDate(startDate, 'YYYY-MM-DD')}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          setStartDate(newDate);
          onDateRangeChange(newDate, endDate);
        }}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
      />
      <span className="text-gray-600">〜</span>
      <input
        type="date"
        value={formatDate(endDate, 'YYYY-MM-DD')}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          setEndDate(newDate);
          onDateRangeChange(startDate, newDate);
        }}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
      />
    </div>
  );
}
```

## チャートコンポーネント設計

### 折れ線チャート

```typescript
// src/components/charts/LineChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface LineChartProps {
  title: string;
  data: Array<{ date: string; [key: string]: any }>;
  dataKeys: Array<{ key: string; color: string; name: string }>;
  height?: number;
}

export function TrendLineChart({
  title,
  data,
  dataKeys,
  height = 300
}: LineChartProps) {
  return (
    <ChartContainer title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff'
          }} />
          <Legend />
          {dataKeys.map(({ key, color, name }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              name={name}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

### 棒グラフ

```typescript
// src/components/charts/BarChart.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';

interface BarChartProps {
  title: string;
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  color: string;
  xAxisKey: string;
  height?: number;
}

export function CategoryBarChart({
  title,
  data,
  dataKey,
  color,
  xAxisKey,
  height = 300
}: BarChartProps) {
  return (
    <ChartContainer title={title}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={xAxisKey} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff'
          }} />
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

## 型定義パターン

```typescript
// src/types/metrics.ts

export interface MetricData {
  date: string;
  value: number;
}

export interface DashboardData {
  timeSeriesData: MetricData[];
  categoryData: Array<{ category: string; value: number }>;
  kpis: {
    totalSales: number;
    salesGrowth: number;
    activeUsers: number;
    conversionRate: number;
  };
}

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export type TrendType = 'uptrend' | 'downtrend' | 'sideway';
```

## データ処理パターン

### 移動平均計算

```typescript
// src/lib/calculations.ts

export function calculateMovingAverage(
  data: MetricData[],
  window: number = 7
): MetricData[] {
  return data.map((point, idx) => {
    const start = Math.max(0, idx - window + 1);
    const window_data = data.slice(start, idx + 1);
    const avg = window_data.reduce((sum, d) => sum + d.value, 0) / window_data.length;

    return {
      date: point.date,
      value: Math.round(avg * 100) / 100
    };
  });
}
```

### 成長率計算

```typescript
export function calculateGrowthRate(
  current: number,
  previous: number
): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
```

### データフィルタリング

```typescript
export function filterDataByDateRange(
  data: MetricData[],
  startDate: Date,
  endDate: Date
): MetricData[] {
  return data.filter(point => {
    const date = new Date(point.date);
    return date >= startDate && date <= endDate;
  });
}
```

## ダッシュボード ページ例

```typescript
// src/app/dashboard/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { mockChartData } from '@/data/mock-data';
import { filterDataByDateRange, calculateMovingAverage } from '@/lib/calculations';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  });

  const filteredData = useMemo(() => {
    return filterDataByDateRange(mockChartData, dateRange.start, dateRange.end);
  }, [dateRange]);

  const smoothedData = useMemo(() => {
    return calculateMovingAverage(filteredData, 7);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onDateRangeChange={setDateRange} />
      <Dashboard
        data={filteredData}
        smoothedData={smoothedData}
        dateRange={dateRange}
      />
    </div>
  );
}
```

## 関連ドキュメント

詳細は以下を参照:
- [DESIGN_RULE.md](../../DESIGN_RULE.md) - デザインシステム
- [development-guide](./development-guide/SKILL.md) - 開発ガイドライン

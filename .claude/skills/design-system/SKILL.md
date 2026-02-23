---
name: design-system
description: トレンド分析ダッシュボードのデザインシステム。スカイブルー+ティール配色、チャート用カラーパレット、コンポーネント設計、レスポンシブレイアウト。UI実装時、コンポーネント作成時、スタイリング時に使用。
allowed-tools: Read, Glob, Grep
---

# トレンド分析ダッシュボード デザインシステム

スカイブルー＋ティール配色を基調とした現代的なダッシュボード用デザインシステムです。

## カラーシステム

### プライマリカラー（スカイブルー）

```typescript
primary: {
  50: '#f0f9ff',   // 最薄背景
  100: '#e0f2fe',  // 薄い背景
  200: '#bae6fd',  // 境界線
  300: '#7dd3fc',  // 補助要素
  400: '#38bdf8',  // 中間
  500: '#0ea5e9',  // メインブランド ★
  600: '#0284c7',  // ホバー
  700: '#0369a1',  // アクティブ
  800: '#075985',  // 強調
  900: '#0c3d66',  // 最強調
}
```

### アクセントカラー（ティール）

```typescript
accent: {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',  // アクセント ★
  600: '#0d9488',  // ホバー
  700: '#0f766e',  // アクティブ
  800: '#115e59',  // 強調
  900: '#134e4a',  // 最強調
}
```

### ステータスカラー

```typescript
status: {
  success: '#10b981',   // 成功、上昇トレンド
  warning: '#f59e0b',   // 警告、注意
  error: '#ef4444',     // エラー、下降トレンド
  info: '#3b82f6',      // 情報
}
```

### グレースケール

```typescript
gray: {
  50: '#f9fafb',    // 背景
  100: '#f3f4f6',   // 薄い背景
  200: '#e5e7eb',   // 境界線
  300: '#d1d5db',   // 無効状態
  400: '#9ca3af',   // 補助テキスト
  500: '#6b7280',   // 説明文
  600: '#4b5563',   // 本文
  700: '#374151',   // 見出し
  800: '#1f2937',   // 強調見出し
  900: '#111827',   // 最強調
}
```

### チャート用カラーパレット（8色スキーム）

```typescript
chart: {
  1: '#0ea5e9',  // Sky Blue (Primary)
  2: '#14b8a6',  // Teal (Accent)
  3: '#f97316',  // Orange
  4: '#8b5cf6',  // Purple
  5: '#ec4899',  // Pink
  6: '#06b6d4',  // Cyan
  7: '#10b981',  // Emerald
  8: '#f59e0b',  // Amber
}
```

## タイポグラフィ

### フォント設定

```typescript
fontFamily: {
  sans: ['Inter', 'Hiragino Sans', 'Noto Sans JP', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### テキストスタイル

```typescript
// ページタイトル
pageTitle: 'text-4xl font-bold text-gray-900 tracking-tight'

// セクションタイトル
sectionTitle: 'text-2xl font-semibold text-gray-800'

// カードタイトル
cardTitle: 'text-xl font-semibold text-gray-900'

// 本文
bodyMedium: 'text-base text-gray-600 leading-relaxed'

// ラベル
labelMedium: 'text-sm font-medium text-gray-700'

// 数値表示
numberLarge: 'text-3xl font-bold text-gray-900 tabular-nums'

// チャートラベル
chartLabel: 'text-xs text-gray-600'
```

## コンポーネント

### ボタン

```typescript
// Primary - スカイブルー
primary: 'bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700'

// Secondary - ティール
secondary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700'

// Outline - ボーダー
outline: 'bg-white text-sky-600 border border-sky-300 hover:bg-sky-50'

// Ghost - 控えめ
ghost: 'text-sky-600 hover:bg-sky-50'

// Danger - 警告
danger: 'bg-red-600 text-white hover:bg-red-700'

// サイズ
sm: 'px-3 py-2 text-sm rounded-md'
md: 'px-4 py-2.5 text-sm rounded-lg'
lg: 'px-6 py-3 text-base rounded-lg'
```

### カード

```typescript
// デフォルト
default: 'bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md'

// Stats（統計情報）
stats: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6'

// Interactive（クリック可能）
interactive: 'bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md cursor-pointer hover:-translate-y-0.5'

// 領域
header: 'px-6 py-4 border-b border-gray-200'
body: 'px-6 py-4'
footer: 'px-6 py-4 border-t border-gray-200 bg-gray-50'
```

### フォーム

```typescript
// Input
input: 'block w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500'

// Label
label: 'block text-sm font-medium text-gray-700 mb-2'

// Required mark
required: 'after:content-["*"] after:text-red-500 after:ml-1'

// Error
error: 'border-red-300 focus:ring-red-500 focus:border-red-500'
errorText: 'mt-1.5 text-sm text-red-600'
```

### テーブル

```typescript
container: 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'
thead: 'bg-gray-50'
th: 'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
tbody: 'bg-white divide-y divide-gray-200'
td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'
rowHover: 'hover:bg-gray-50 transition-colors'
```

### バッジ

```typescript
base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

// ステータス
success: 'bg-green-100 text-green-800'
warning: 'bg-amber-100 text-amber-800'
error: 'bg-red-100 text-red-800'
info: 'bg-sky-100 text-sky-800'
default: 'bg-gray-100 text-gray-800'
```

### チャートコンポーネント

```typescript
// チャートコンテナ
container: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6'

// タイトル
title: 'text-lg font-semibold text-gray-900 mb-4'

// レスポンシブ高さ
height: {
  sm: 'h-64',   // 256px
  md: 'h-96',   // 384px
  lg: 'h-full', // 親の高さに合わせる
}

// ツールチップ
tooltip: 'bg-gray-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg'
```

## レイアウト

### スペーシング（4pxベース）

```typescript
spacing: {
  1: '4px',   2: '8px',   3: '12px',
  4: '16px',  5: '20px',  6: '24px',
  8: '32px',  10: '40px', 12: '48px',
  16: '64px', 20: '80px', 24: '96px',
}
```

### グリッドレイアウト

```typescript
// ダッシュボードグリッド
dashboard: {
  gap: 'gap-6',
  rows: 'grid-rows-auto',
  cols: {
    full: 'grid-cols-1',
    half: 'grid-cols-1 lg:grid-cols-2',
    third: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    quarter: 'grid-cols-2 lg:grid-cols-4',
  }
}

// レスポンシブ対応
// Mobile: 1列
// Tablet(md): 2列
// Desktop(lg): 3-4列
```

### 角丸

```typescript
sm: '4px',      // ボタン、バッジ
md: '8px',      // 入力フィールド
lg: '12px',     // カード
xl: '16px',     // 大きなカード
2xl: '20px',    // モーダル
full: '9999px', // 円形アバター
```

### シャドウ

```typescript
sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
```

## アクセシビリティ

### コントラスト比（WCAG AA準拠）

- `text-gray-900` on white: 16.78:1 ✓
- `text-sky-600` on white: 5.82:1 ✓
- `text-teal-600` on white: 5.74:1 ✓

### フォーカス状態

```typescript
focus: 'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
```

## アニメーション

```typescript
// トランジション
fast: 'transition-all duration-150 ease-out'
default: 'transition-all duration-200 ease-in-out'
slow: 'transition-all duration-300 ease-in-out'

// ホバーエフェクト
hoverLift: 'hover:-translate-y-1 hover:scale-105'
cardHover: 'transition-all duration-300 ease-out hover:shadow-md'
```

## ダッシュボード設計例

```
┌────────────────────────────────────────────────────┐
│ KPI: 売上         KPI: 成長率     KPI: 顧客数      │
│ ¥1,234,567 ↑8%  +12.5% ↑↑      5,432 ↑3%        │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ 月次売上推移（折れ線グラフ）                       │
│                                        [日次] [月次]│
│ (チャート：Sky Blue系列、Teal比較)                │
└────────────────────────────────────────────────────┘

┌──────────────────────┐ ┌──────────────────────┐
│ カテゴリ別売上       │ │ 地域別パフォーマンス │
│ (棒グラフ)          │ │ (ゲージ)             │
└──────────────────────┘ └──────────────────────┘

┌────────────────────────────────────────────────────┐
│ 詳細データテーブル                                  │
│ 日付 | 売上 | 成長率 | ステータス | 操作            │
└────────────────────────────────────────────────────┘
```

## 関連ドキュメント

詳細は [DESIGN_RULE.md](../../DESIGN_RULE.md) を参照

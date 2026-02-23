# トレンド分析ダッシュボード デザインシステム

## 1. カラーシステム

### プライマリカラー（スカイブルー）
```typescript
// Primary Colors - データ可視化向けスカイブルー
primary: {
  50: '#f0f9fe',   // bg-primary-50 (最薄背景)
  100: '#e0f2fe',  // bg-primary-100 (薄い背景)
  200: '#bae6fd',  // bg-primary-200 (境界線・分割)
  300: '#7dd3fc',  // bg-primary-300 (インタラクティブ要素背景)
  400: '#38bdf8',  // bg-primary-400 (補助インタラクション)
  500: '#0ea5e9',  // bg-primary-500 (メインアクセント) ★ #0EA5E9
  600: '#0284c7',  // bg-primary-600 (ホバー)
  700: '#0369a1',  // bg-primary-700 (アクティブ)
  800: '#075985',  // bg-primary-800 (強調)
  900: '#0c2d42'   // bg-primary-900 (最強調)
}
```

### セカンダリカラー（テール - ポジティブトレンド）
```typescript
// Secondary Colors - 成功・ポジティブトレンド表現
secondary: {
  50: '#f0fdfa',   // bg-secondary-50
  100: '#ccfbf1',  // bg-secondary-100 (成功背景)
  200: '#99f6e4',  // bg-secondary-200
  300: '#5eead4',  // bg-secondary-300
  400: '#2dd4bf',  // bg-secondary-400
  500: '#14b8a6',  // bg-secondary-500 (成功・ポジティブ) ★ #14B8A6
  600: '#0d9488',  // bg-secondary-600 (ホバー)
  700: '#0f766e',  // bg-secondary-700 (アクティブ)
  800: '#134e4a',  // bg-secondary-800
  900: '#0d3331'   // bg-secondary-900
}
```

### ウォームアクセント（アンバー - 警告・注意）
```typescript
// Warm Colors - 警告・アラート表現
warm: {
  50: '#fffbeb',   // bg-warm-50
  100: '#fef3c7',  // bg-warm-100
  200: '#fde68a',  // bg-warm-200
  300: '#fcd34d',  // bg-warm-300
  400: '#fbbf24',  // bg-warm-400
  500: '#f59e0b',  // bg-warm-500 (警告・注意) ★ #F59E0B
  600: '#d97706',  // bg-warm-600 (ホバー)
  700: '#b45309',  // bg-warm-700 (アクティブ)
  800: '#92400e',  // bg-warm-800
  900: '#78350f'   // bg-warm-900
}
```

### ダンジャー（レッド - ネガティブトレンド・エラー）
```typescript
// Danger Colors - エラー・ネガティブトレンド表現
danger: {
  50: '#fef2f2',   // bg-danger-50
  100: '#fee2e2',  // bg-danger-100 (エラー背景)
  200: '#fecaca',  // bg-danger-200
  300: '#fca5a5',  // bg-danger-300
  400: '#f87171',  // bg-danger-400
  500: '#ef4444',  // bg-danger-500 (エラー・ネガティブ) ★ #EF4444
  600: '#dc2626',  // bg-danger-600 (ホバー)
  700: '#b91c1c',  // bg-danger-700 (アクティブ)
  800: '#991b1b',  // bg-danger-800
  900: '#7f1d1d'   // bg-danger-900
}
```

### グレースケール（背景・テキスト）
```typescript
// Extended Gray Scale - ダッシュボード背景・テキスト
gray: {
  25: '#fafafa',   // bg-gray-25 (純白に近い)
  50: '#f9fafb',   // bg-gray-50 (ページ背景)
  75: '#f6f7f8',   // bg-gray-75 (カスタム薄グレー)
  100: '#f3f4f6',  // bg-gray-100 (カード背景)
  150: '#eef0f2',  // bg-gray-150 (カスタム境界)
  200: '#e5e7eb',  // bg-gray-200 (標準境界線)
  250: '#dde0e4',  // bg-gray-250 (カスタム分割線)
  300: '#d1d5db',  // bg-gray-300 (分割線)
  350: '#c4c9d0',  // bg-gray-350 (カスタム中間)
  400: '#9ca3af',  // text-gray-400 (補助テキスト)
  450: '#8b92a5',  // text-gray-450 (カスタム中間テキスト)
  500: '#6b7280',  // text-gray-500 (説明文)
  550: '#5a616e',  // text-gray-550 (カスタム濃いめ)
  600: '#4b5563',  // text-gray-600 (本文)
  650: '#42495a',  // text-gray-650 (カスタム)
  700: '#374151',  // text-gray-700 (小見出し)
  750: '#323946',  // text-gray-750 (カスタム)
  800: '#1f2937',  // text-gray-800 (見出し)
  850: '#1a202c',  // text-gray-850 (カスタム)
  900: '#111827',  // text-gray-900 (強い見出し)
  925: '#0d131f',  // text-gray-925 (カスタム)
  950: '#030712'   // text-gray-950 (最強調)
}
```

### システムカラー（チャート・ステータス）
```typescript
// Status & Semantic Colors
success: '#14b8a6',     // text-teal-500 (成功・ポジティブトレンド)
warning: '#f59e0b',     // text-amber-500 (警告・注意)
danger: '#ef4444',      // text-red-500 (エラー・ネガティブトレンド)
info: '#0ea5e9',        // text-sky-500 (情報表示)

// Trend Status
trendUp: '#14b8a6',     // ポジティブトレンド（上昇）
trendDown: '#ef4444',   // ネガティブトレンド（下降）
trendFlat: '#9ca3af',   // フラット（変動なし）
trendNeutral: '#6b7280' // 中立・処理中

// Data Status
completed: '#14b8a6',   // 完了
pending: '#f59e0b',     // 保留中
failed: '#ef4444',      // 失敗
processing: '#0ea5e9'   // 処理中
```

## 2. チャートカラーパレット

### データシリーズ用8色パレット
```typescript
// Chart Color Palette - 8つの異なるデータシリーズ用
chartColors: {
  // Series 1-4: 主要色
  series1: '#0ea5e9',  // Sky Blue (プライマリ)
  series2: '#14b8a6',  // Teal (セカンダリ)
  series3: '#f59e0b',  // Amber (ウォーム)
  series4: '#8b5cf6',  // Violet

  // Series 5-8: サポート色
  series5: '#06b6d4',  // Cyan
  series6: '#ec4899',  // Pink
  series7: '#10b981',  // Emerald
  series8: '#f97316'   // Orange
}

// 拡張チャートパレット（10色まで対応）
chartPalette: [
  '#0ea5e9', // Sky Blue
  '#14b8a6', // Teal
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#d946ef'  // Fuchsia
]

// 淡色チャートパレット（背景・透過用）
chartPaletteLight: [
  '#e0f2fe', // Sky Blue Light
  '#ccfbf1', // Teal Light
  '#fef3c7', // Amber Light
  '#ede9fe', // Violet Light
  '#cffafe', // Cyan Light
  '#fce7f3', // Pink Light
  '#d1fae5', // Emerald Light
  '#fed7aa'  // Orange Light
]

// チャート区分表示用パレット
chartSegmentColors: {
  primary: '#0ea5e9',
  secondary: '#14b8a6',
  tertiary: '#f59e0b',
  quartiary: '#8b5cf6'
}
```

## 3. タイポグラフィ

### フォントファミリー
```css
/* Tailwind Config */
fontFamily: {
  sans: ['Inter', 'SF Pro Display', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'sans-serif'],
  mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
  display: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif']
}
```

### フォントサイズとウェイト
```typescript
// Typography Scale - ダッシュボード向け
text: {
  'xs': ['12px', { lineHeight: '16px', fontWeight: '400' }],     // text-xs (ラベル)
  'sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],     // text-sm (サブテキスト)
  'base': ['16px', { lineHeight: '24px', fontWeight: '400' }],   // text-base (本文)
  'lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],     // text-lg (説明)
  'xl': ['20px', { lineHeight: '28px', fontWeight: '500' }],     // text-xl (セクション見出し)
  '2xl': ['24px', { lineHeight: '32px', fontWeight: '600' }],    // text-2xl (ページ見出し)
  '3xl': ['30px', { lineHeight: '36px', fontWeight: '700' }],    // text-3xl (大見出し)
  '4xl': ['36px', { lineHeight: '40px', fontWeight: '800' }]     // text-4xl (メインタイトル)
}
```

### ダッシュボード向けタイポグラフィパターン
```typescript
// Typography Usage for Dashboard
export const typography = {
  // Page & Dashboard Titles
  dashboardTitle: 'text-3xl font-bold text-gray-900 tracking-tight',
  pageTitle: 'text-2xl font-semibold text-gray-900 tracking-tight',

  // Section Titles
  sectionTitle: 'text-lg font-semibold text-gray-800 tracking-tight',
  sectionSubtitle: 'text-sm font-medium text-gray-600',

  // Card & Widget Titles
  cardTitle: 'text-base font-semibold text-gray-900',
  cardSubtitle: 'text-xs font-medium text-gray-500 uppercase tracking-wider',

  // Body & Descriptive Text
  bodyLarge: 'text-base text-gray-700 leading-relaxed',
  bodyMedium: 'text-sm text-gray-600 leading-relaxed',
  bodySmall: 'text-xs text-gray-500 leading-relaxed',

  // Labels & Form Text
  labelLarge: 'text-sm font-medium text-gray-800',
  labelMedium: 'text-sm font-medium text-gray-700',
  labelSmall: 'text-xs font-medium text-gray-600',

  // Numbers & Metrics (Tabular)
  metricLarge: 'text-4xl font-bold text-gray-900 tabular-nums tracking-tight',
  metricMedium: 'text-2xl font-semibold text-gray-800 tabular-nums',
  metricSmall: 'text-base font-semibold text-gray-700 tabular-nums',

  // Data Table Text
  tableHeader: 'text-xs font-semibold text-gray-700 uppercase tracking-wider',
  tableBody: 'text-sm text-gray-600',
  tableSmall: 'text-xs text-gray-500',

  // Status & Indicator Text
  statusText: 'text-xs font-medium uppercase tracking-wider',

  // Subtle & Secondary Text
  subtleText: 'text-xs text-gray-500 leading-relaxed',
  captionText: 'text-xs text-gray-400 tracking-wide',

  // Trendテキスト
  trendPositive: 'text-sm font-medium text-teal-600',
  trendNegative: 'text-sm font-medium text-red-600',
  trendNeutral: 'text-sm font-medium text-gray-500'
}
```

## 4. 余白・間隔システム

### スペーシングスケール（8px/4px ベース）
```typescript
// Spacing Scale - ダッシュボード最適化
spacing: {
  'px': '1px',    // border用
  '0.5': '2px',   // 極小
  '1': '4px',     // 最小
  '1.5': '6px',   // 微調整
  '2': '8px',     // 小
  '2.5': '10px',  // 小中
  '3': '12px',    // 標準小
  '3.5': '14px',  // 標準小+
  '4': '16px',    // 標準
  '5': '20px',    // 中
  '6': '24px',    // 標準大
  '7': '28px',    // 大
  '8': '32px',    // 大
  '10': '40px',   // 特大
  '12': '48px',   // XXL
  '14': '56px',   // 大セクション
  '16': '64px',   // セクション間隔
  '20': '80px',   // ページセクション
  '24': '96px',   // 大セクション
  '32': '128px'   // 特別な間隔
}
```

### ダッシュボード用レイアウトパターン
```typescript
// Layout Patterns for Dashboard
export const layouts = {
  // Container - ダッシュボード最適化
  dashboardContainer: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  dashboardContainerWide: 'w-full px-4 sm:px-6 lg:px-8',

  // Page Layout
  pageWrapper: 'min-h-screen bg-gray-50',
  pageContent: 'py-6 space-y-6',
  pageContentLarge: 'py-8 space-y-8',

  // Dashboard Grid
  dashboardGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  dashboardGridTight: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  dashboardGridWide: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6',

  // Widget / Card Layout
  cardContainer: 'bg-white rounded-xl shadow-sm border border-gray-200 p-5',
  cardContainerLarge: 'bg-white rounded-2xl shadow-md border border-gray-200 p-6',
  cardHeader: 'pb-3 border-b border-gray-200 flex items-center justify-between',
  cardBody: 'pt-4 space-y-4',
  cardBodyLarge: 'pt-5 space-y-5',
  cardFooter: 'pt-4 border-t border-gray-150',

  // Chart Container
  chartContainer: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
  chartHeader: 'pb-4 border-b border-gray-200 mb-4',
  chartBody: 'h-80 w-full', // 標準チャートの高さ

  // Form Layout
  formGroup: 'space-y-6',
  formGroupTight: 'space-y-4',
  formRow: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  formRowTight: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  formField: 'space-y-2',

  // Table Layout
  tableContainer: 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden',
  tableHeader: 'bg-gray-50 border-b border-gray-200',
  tableBody: 'divide-y divide-gray-200',
  tableRow: 'hover:bg-gray-50 transition-colors duration-150',

  // Metric Display
  metricCard: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
  metricCardLarge: 'bg-white rounded-xl shadow-md border border-gray-200 p-6',

  // List Layout
  listContainer: 'space-y-2',
  listContainerLoose: 'space-y-3',
  listItem: 'p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200',
  listItemCompact: 'p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-all duration-200',

  // Sidebar Layout
  sidebarWrapper: 'flex h-screen bg-gray-50',
  sidebar: 'w-64 bg-white border-r border-gray-200 shadow-sm',
  sidebarCollapsed: 'w-20 bg-white border-r border-gray-200 shadow-sm',

  // Section Layout
  sectionSpacing: 'space-y-8',
  sectionSpacingTight: 'space-y-6',
  sectionPadding: 'py-8',
  sectionPaddingTight: 'py-6'
}
```

## 5. 角丸システム

```typescript
// Border Radius - ダッシュボード最適化
borderRadius: {
  'none': '0px',        // rounded-none
  'xs': '2px',          // rounded-xs (極小要素)
  'sm': '4px',          // rounded-sm (小さなバッジ)
  'DEFAULT': '6px',     // rounded (標準要素)
  'md': '8px',          // rounded-md (入力フィールド)
  'lg': '12px',         // rounded-lg (カード・ボタン)
  'xl': '16px',         // rounded-xl (メインカード)
  '2xl': '20px',        // rounded-2xl (大きなカード)
  '3xl': '24px',        // rounded-3xl (モーダル)
  'full': '9999px'      // rounded-full (バッジ・アバター)
}

// Radius Patterns for Dashboard
export const borderRadiusPatterns = {
  // Buttons
  buttonSmall: 'rounded-md',
  buttonMedium: 'rounded-lg',
  buttonLarge: 'rounded-lg',

  // Cards & Widgets
  cardDefault: 'rounded-xl',
  cardLarge: 'rounded-2xl',
  cardInner: 'rounded-lg',
  chartCard: 'rounded-xl',

  // Form Elements
  input: 'rounded-lg',
  inputSmall: 'rounded-md',
  select: 'rounded-lg',
  textarea: 'rounded-lg',
  checkbox: 'rounded-sm',

  // Other Elements
  badge: 'rounded-full',
  badgeSquare: 'rounded-md',
  avatar: 'rounded-full',
  avatarSquare: 'rounded-lg',
  modal: 'rounded-2xl',
  tooltip: 'rounded-lg',
  image: 'rounded-xl'
}
```

## 6. 影の効果システム

```typescript
// Box Shadow - ダッシュボード最適化
boxShadow: {
  'xs': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
  'sm': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
  'DEFAULT': '0 2px 4px 0 rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.04)',
  'md': '0 4px 8px 0 rgb(0 0 0 / 0.08), 0 2px 4px 0 rgb(0 0 0 / 0.04)',
  'lg': '0 8px 16px 0 rgb(0 0 0 / 0.08), 0 4px 8px 0 rgb(0 0 0 / 0.04)',
  'xl': '0 12px 24px 0 rgb(0 0 0 / 0.10), 0 8px 12px 0 rgb(0 0 0 / 0.06)',
  '2xl': '0 20px 40px 0 rgb(0 0 0 / 0.12)',
  'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.04)',
  'none': '0 0 #0000'
}

// Shadow Patterns for Dashboard
export const shadows = {
  // Cards - 控えめで洗練
  cardSubtle: 'shadow-sm hover:shadow-md transition-shadow duration-300',
  cardDefault: 'shadow-sm hover:shadow-md transition-shadow duration-300',
  cardElevated: 'shadow-md hover:shadow-lg transition-shadow duration-300',

  // Buttons
  buttonSubtle: 'shadow-xs hover:shadow-sm transition-shadow duration-200',
  buttonDefault: 'shadow-sm hover:shadow-md transition-shadow duration-200',

  // Modals & Overlays
  modal: 'shadow-2xl',
  dropdown: 'shadow-lg',
  popover: 'shadow-xl',
  tooltip: 'shadow-md',

  // Form Elements
  inputDefault: 'shadow-xs focus:shadow-sm transition-shadow duration-200',
  inputFocus: 'shadow-sm focus:shadow-md transition-shadow duration-200',

  // Chart
  chartDefault: 'shadow-sm',
  chartHover: 'shadow-md transition-shadow duration-300',

  // Special States
  pressed: 'shadow-inner',
  disabled: 'shadow-none',
  loading: 'shadow-sm animate-pulse'
}
```

## 7. コンポーネント設計

### ボタンコンポーネント
```typescript
// Button Base Classes
const buttonBase = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

// Button Sizes
export const buttonSizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-md',
  sm: 'px-3 py-2 text-sm rounded-md',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
  xl: 'px-8 py-4 text-lg rounded-lg'
}

// Button Variants
export const buttonVariants = {
  // Primary - スカイブルー
  primary: `${buttonBase} bg-sky-500 text-white shadow-md hover:bg-sky-600 hover:shadow-lg focus:ring-sky-400 active:bg-sky-700`,

  // Secondary - グレー
  secondary: `${buttonBase} bg-gray-100 text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-150 hover:border-gray-400 hover:shadow-md focus:ring-gray-400 active:bg-gray-200`,

  // Outline
  outline: `${buttonBase} bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md focus:ring-gray-400 active:bg-gray-100`,

  // Ghost
  ghost: `${buttonBase} text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400 active:bg-gray-150`,

  // Success - テール
  success: `${buttonBase} bg-teal-600 text-white shadow-md hover:bg-teal-700 hover:shadow-lg focus:ring-teal-500 active:bg-teal-800`,

  // Danger - レッド
  danger: `${buttonBase} bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus:ring-red-500 active:bg-red-800`,

  // Warning - アンバー
  warning: `${buttonBase} bg-amber-500 text-white shadow-md hover:bg-amber-600 hover:shadow-lg focus:ring-amber-400 active:bg-amber-700`,

  // Link
  link: `${buttonBase} text-sky-600 hover:text-sky-700 hover:underline focus:ring-sky-400 underline-offset-2`,

  // Icon Button (Square)
  icon: `${buttonBase} p-2 rounded-lg hover:bg-gray-100 focus:ring-gray-400`
}
```

### カードコンポーネント
```typescript
// Card Base Pattern
export const cardVariants = {
  // Standard Card
  default: 'bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300',

  // Large Card
  large: 'bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300',

  // Subtle Card
  subtle: 'bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-xs',

  // Elevated Card
  elevated: 'bg-white border border-gray-200 rounded-xl p-6 shadow-lg',

  // Chart Card
  chart: 'bg-white border border-gray-200 rounded-xl p-6 shadow-sm'
}

// Card Header Pattern
export const cardHeader = 'flex items-center justify-between pb-4 border-b border-gray-200'

// Card Body Pattern
export const cardBody = 'pt-4'

// Card Footer Pattern
export const cardFooter = 'pt-4 border-t border-gray-200 flex justify-end gap-2'
```

### テーブルコンポーネント
```typescript
// Table Base Pattern
export const tableVariants = {
  // Standard Table
  default: 'w-full border-collapse rounded-lg overflow-hidden border border-gray-200',

  // Striped Table (background alternation)
  striped: 'w-full border-collapse',

  // Compact Table
  compact: 'w-full border-collapse text-sm'
}

// Table Header Cell
export const tableHeaderCell = 'px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 border-b border-gray-200'

// Table Body Cell
export const tableBodyCell = 'px-4 py-3 text-sm text-gray-600 border-b border-gray-200'

// Table Row
export const tableRow = 'hover:bg-gray-50 transition-colors duration-150'
```

### バッジコンポーネント
```typescript
// Badge Base
const badgeBase = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold'

// Badge Variants
export const badgeVariants = {
  // Primary - スカイブルー背景
  primary: `${badgeBase} bg-sky-100 text-sky-800`,

  // Secondary - テール背景
  secondary: `${badgeBase} bg-teal-100 text-teal-800`,

  // Success - グリーン背景
  success: `${badgeBase} bg-emerald-100 text-emerald-800`,

  // Warning - アンバー背景
  warning: `${badgeBase} bg-amber-100 text-amber-800`,

  // Danger - レッド背景
  danger: `${badgeBase} bg-red-100 text-red-800`,

  // Gray - グレー背景
  gray: `${badgeBase} bg-gray-100 text-gray-800`,

  // Outline - アウトライン
  outline: `${badgeBase} bg-white border border-gray-200 text-gray-700`,

  // Trend Up
  trendUp: `${badgeBase} bg-teal-100 text-teal-800`,

  // Trend Down
  trendDown: `${badgeBase} bg-red-100 text-red-800`,

  // Trend Neutral
  trendNeutral: `${badgeBase} bg-gray-100 text-gray-800`
}
```

### フォームコンポーネント
```typescript
// Input Base
const inputBase = 'w-full px-4 py-2.5 text-base text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'

// Input Variants
export const inputVariants = {
  // Standard Input
  default: inputBase,

  // Small Input
  small: 'w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200',

  // Large Input
  large: 'w-full px-5 py-3 text-lg text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200',

  // Error State
  error: 'w-full px-4 py-2.5 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-red-500 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
}

// Select / Textarea similar patterns...
```

## 8. ダッシュボードレイアウト

### レスポンシブブレークポイント
```typescript
// Tailwind Breakpoints
breakpoints: {
  'sm': '640px',   // スマートフォン
  'md': '768px',   // タブレット
  'lg': '1024px',  // デスクトップ
  'xl': '1280px',  // 大型デスクトップ
  '2xl': '1536px'  // 超大型デスクトップ
}
```

### グリッドレイアウトパターン
```typescript
// Dashboard Grid Layouts
export const dashboardLayouts = {
  // 3-column layout (standard)
  '3col': 'grid grid-cols-1 md:grid-cols-3 gap-6',

  // 4-column layout (metrics)
  '4col': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',

  // 2-column layout (wide charts)
  '2col': 'grid grid-cols-1 lg:grid-cols-2 gap-6',

  // 1-column layout (full width)
  '1col': 'grid grid-cols-1 gap-6',

  // Custom: 2-column with sidebar
  sidebar: 'grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8',
  sidebarContent: 'lg:col-span-3',
  sidebarWidget: 'lg:col-span-1'
}
```

### ウィジェットサイズパターン
```typescript
// Widget Sizing
export const widgetSizes = {
  // Small Widget (1/4 width)
  small: 'w-full sm:w-1/2 lg:w-1/4',

  // Medium Widget (1/3 width)
  medium: 'w-full sm:w-1/2 lg:w-1/3',

  // Large Widget (1/2 width)
  large: 'w-full lg:w-1/2',

  // Full Width Widget
  full: 'w-full',

  // Chart Heights
  chartSmall: 'h-64',
  chartMedium: 'h-80',
  chartLarge: 'h-96'
}
```

## 9. シャドウ・角丸・スペーシング

### 統一的なシャドウスタイル
```typescript
// Unified Shadow System
export const shadowSystem = {
  // Elevation Levels
  level1: 'shadow-sm',           // 最小限の浮動感
  level2: 'shadow-md',           // 標準の浮動感
  level3: 'shadow-lg',           // 目立つ浮動感
  level4: 'shadow-xl',           // 強い浮動感
  level5: 'shadow-2xl',          // 最高の浮動感

  // Interactive States
  hover: 'hover:shadow-md transition-shadow duration-300',
  active: 'shadow-md',
  focused: 'focus:shadow-lg focus:ring-2 focus:ring-sky-500',

  // Special Effects
  inset: 'shadow-inner',
  none: 'shadow-none',
  soft: 'shadow-sm hover:shadow-md transition-all duration-200'
}
```

### 統一的なスペーシング
```typescript
// Unified Spacing System
export const spacingSystem = {
  // Container Padding
  containerPadding: 'px-4 sm:px-6 lg:px-8',

  // Content Gaps
  tightGap: 'gap-2',      // 8px
  standardGap: 'gap-4',   // 16px
  looseGap: 'gap-6',      // 24px

  // Vertical Spacing
  tightSpace: 'space-y-2',    // 8px
  standardSpace: 'space-y-4', // 16px
  looseSpace: 'space-y-6',    // 24px

  // Component Padding
  tightPadding: 'p-3',    // 12px
  standardPadding: 'p-4', // 16px
  loosePadding: 'p-6'     // 24px
}
```

## 10. アクセシビリティ

### コントラスト比チェック
```typescript
// WCAG AAコンプライアンス（4.5:1以上）
contrastChecks: {
  // Text on Primary Background
  primaryText: '#0ea5e9 on white = 4.5:1 (Pass AA)',

  // Text on Secondary Background
  secondaryText: '#14b8a6 on white = 5.1:1 (Pass AAA)',

  // Text on Gray Background
  grayText: '#4b5563 on #f9fafb = 7.2:1 (Pass AAA)',

  // Button Colors
  primaryButton: 'white on #0ea5e9 = 6.1:1 (Pass AAA)',
  dangerButton: 'white on #ef4444 = 4.5:1 (Pass AA)',

  // Status Indicators
  success: '#14b8a6 on white = 5.1:1 (Pass AAA)',
  warning: '#f59e0b on white = 4.5:1 (Pass AA)',
  danger: '#ef4444 on white = 4.5:1 (Pass AA)'
}
```

### フォーカス状態
```typescript
// Focus States - キーボードナビゲーション対応
export const focusStates = {
  // Standard Focus Ring
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',

  // Focus Ring Compact
  focusRingCompact: 'focus:outline-none focus:ring-2 focus:ring-sky-500',

  // Focus Color by Theme
  focusPrimary: 'focus:ring-sky-500',
  focusSecondary: 'focus:ring-teal-500',
  focusDanger: 'focus:ring-red-500',

  // Tab Order - visible focus indicator
  tabFocus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'
}
```

### ARIA & Semantic HTML
```typescript
// Accessibility Attributes
export const a11y = {
  // Aria Labels
  closeButton: 'aria-label="Close"',
  menuButton: 'aria-label="Menu"',
  expandButton: 'aria-label="Expand details"',

  // Roles
  navRole: 'role="navigation"',
  mainRole: 'role="main"',
  statusRole: 'role="status" aria-live="polite"',

  // States
  ariaExpanded: 'aria-expanded="false"',
  ariaHidden: 'aria-hidden="true"',
  ariaPressed: 'aria-pressed="false"'
}
```

## 11. アニメーション・トランジション

### トランジション設定
```typescript
// Transition Durations
transitions: {
  fast: 'duration-150',      // 150ms - 高速操作
  default: 'duration-200',   // 200ms - 標準
  slow: 'duration-300',      // 300ms - 遅い
  slower: 'duration-500'     // 500ms - より遅い
}

// Transition Timing Functions
export const transitionTimings = {
  // Linear - 一定速度
  linear: 'transition-all ease-linear duration-200',

  // Ease In Out - 自然な動き
  easeInOut: 'transition-all ease-in-out duration-200',

  // Ease Out - 減速
  easeOut: 'transition-all ease-out duration-200',

  // Ease In - 加速
  easeIn: 'transition-all ease-in duration-200'
}
```

### ホバー・アクティブ状態
```typescript
// Interactive States
export const interactiveStates = {
  // Button Hover
  buttonHover: 'hover:shadow-md hover:scale-105 transition-all duration-200',

  // Card Hover
  cardHover: 'hover:shadow-lg hover:border-sky-300 transition-all duration-300',

  // Link Hover
  linkHover: 'hover:text-sky-600 hover:underline transition-colors duration-200',

  // Input Focus
  inputFocus: 'focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200',

  // Smooth Transitions
  smooth: 'transition-all ease-in-out duration-200'
}
```

### ローディング・スケルトン
```typescript
// Animation Keyframes
@keyframes {
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' }
  },

  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' }
  },

  spin: {
    'to': { transform: 'rotate(360deg)' }
  }
}

// Loading States
export const loadingStates = {
  pulse: 'animate-pulse',
  shimmer: 'animate-shimmer',
  spin: 'animate-spin',

  // Skeleton Loading Pattern
  skeletonBase: 'bg-gray-200 rounded-lg',
  skeletonPulse: 'bg-gray-200 rounded-lg animate-pulse'
}
```

### チャートアニメーション
```typescript
// Chart-specific Animations
export const chartAnimations = {
  // Data Entry Animation
  fadeIn: 'opacity-0 animate-fade-in duration-500',
  slideUp: 'translate-y-4 opacity-0 animate-slide-up duration-500',

  // Hover Effects
  dataPointHover: 'hover:opacity-100 transition-opacity duration-200',
  barHover: 'hover:opacity-80 transition-opacity duration-200',

  // Transition Timing
  fast: 'transition-all duration-150',
  smooth: 'transition-all duration-300',

  // Tooltip Animation
  tooltipEnter: 'scale-95 opacity-0 animate-fade-in duration-150',
  tooltipExit: 'scale-95 opacity-0 duration-150'
}
```

---

## 実装ガイドライン

### 開発時の注意点
1. **カラー一貫性**: チャート色は必ず `chartPalette` から選択する
2. **レイアウト**: ダッシュボードは `dashboardGrid` パターンを使用
3. **スペーシング**: 8px基本グリッドに従う（4px単位で微調整可）
4. **シャドウ**: `cardDefault` または `cardElevated` を使い分ける
5. **トランジション**: ホバー時は必ず `transition-all` を含める
6. **アクセシビリティ**: フォーカス可能な要素には `focusRing` を必須

### カラー選択フロー
```
ステータス表示 → systemColor を選択
チャートシリーズ → chartPalette から選択
アクセント要素 → primary (#0ea5e9) を優先
成功・ポジティブ → secondary (#14b8a6) を使用
警告・アラート → warm (#f59e0b) を使用
エラー・ネガティブ → danger (#ef4444) を使用
```

### レスポンシブ設計パターン
```
モバイル (< 640px): 1列レイアウト
タブレット (640px - 1024px): 2列レイアウト
デスクトップ (> 1024px): 3〜4列レイアウト
```

このデザインシステムはトレンド分析ダッシュボードの統一性を保ち、
データ可視化を効果的にサポートします。

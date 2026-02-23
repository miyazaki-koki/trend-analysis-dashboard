# デザインシステム

## カラーシステム

### プライマリカラー（スカイブルー）
データ可視化の主要アクセント。メインのCTA、選択状態、重要な情報表示に使用。

```typescript
export const colors = {
  primary: {
    50: '#f0f9fe',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',    // ★ Main Primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c2d42',
  },
} as const;

// 使用例
// 背景: bg-primary-50, bg-primary-100
// ボタン: bg-primary-500, hover:bg-primary-600
// ボーダー: border-primary-200, border-primary-300
```

### セカンダリカラー（テール - ポジティブ）
成功、ポジティブトレンド、増加を表現。

```typescript
export const colors = {
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',    // ★ Success / Positive Trend
    600: '#0d9488',
    700: '#0f766e',
    800: '#134e4a',
    900: '#0d3331',
  },
} as const;

// 使用例
// トレンド上昇: text-secondary-600, border-secondary-500
// 成功インジケータ: bg-secondary-100, text-secondary-700
```

### ウォームアクセント（アンバー - 警告）
注意喚起、警告、やや低いパフォーマンスを表現。

```typescript
export const colors = {
  warm: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',    // ★ Warning / Caution
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
} as const;

// 使用例
// 警告メッセージ: bg-warm-100, border-warm-300, text-warm-800
```

### ダンジャー（レッド - エラー・ネガティブ）
エラー、ネガティブトレンド、低下、危険な状態を表現。

```typescript
export const colors = {
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',    // ★ Error / Negative Trend
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const;

// 使用例
// エラー: bg-danger-100, border-danger-300, text-danger-800
// トレンド低下: text-danger-600
```

### グレースケール（背景・テキスト）
中立的な背景、テキスト、ボーダー。情報階層を視覚的に表現。

```typescript
export const colors = {
  gray: {
    25: '#fafafa',     // ほぼ白
    50: '#f9fafb',     // ページ背景
    100: '#f3f4f6',    // カード背景
    200: '#e5e7eb',    // 標準ボーダー
    300: '#d1d5db',    // 分割線
    400: '#9ca3af',    // 補助テキスト
    500: '#6b7280',    // 説明文
    600: '#4b5563',    // 本文
    700: '#374151',    // 小見出し
    800: '#1f2937',    // 見出し
    900: '#111827',    // 強い見出し
  },
} as const;

// 使用例
// ページ背景: bg-gray-50
// カード: bg-white border border-gray-200
// テキスト: text-gray-700 (本文), text-gray-600 (説明)
```

## チャートカラーパレット

8色の多色データシリーズ用パレット。各種チャートで一貫性を保つ。

```typescript
export const chartColors = [
  '#0ea5e9',  // Primary Sky Blue
  '#14b8a6',  // Secondary Teal
  '#f59e0b',  // Warm Amber
  '#ef4444',  // Danger Red
  '#8b5cf6',  // Purple
  '#06b6d4',  // Cyan
  '#ec4899',  // Pink
  '#6366f1',  // Indigo
] as const;

// 使用例
// データシリーズのループ
// data.forEach((series, index) => {
//   series.color = chartColors[index % chartColors.length];
// });
```

## タイポグラフィ

### フォント
```
ベースフォント: システムフォント (Tailwind デフォルト)
font-family: ui-sans-serif, system-ui, sans-serif

コードフォント: monospace
font-family: ui-monospace, SFMono-Regular, Menlo, monospace
```

### テキストサイズと使用例
```typescript
// タイトル
.text-4xl { font-size: 2.25rem; }   // ページタイトル
.text-3xl { font-size: 1.875rem; }  // セクションタイトル
.text-2xl { font-size: 1.5rem; }    // カード見出し

// 本文
.text-lg { font-size: 1.125rem; }   // 説明文
.text-base { font-size: 1rem; }     // デフォルト本文
.text-sm { font-size: 0.875rem; }   // 補助情報
.text-xs { font-size: 0.75rem; }    // ラベル・説明
```

### ウェイト
```
font-light: 300     // 不要、使用禁止
font-normal: 400    // デフォルト本文
font-medium: 500    // 中程度強調
font-semibold: 600  // 強調・小見出し
font-bold: 700      // 見出し・強調
```

## スペーシング

**8px グリッドシステム** を採用。全てのマージン・パディングは8の倍数。

```typescript
export const spacing = {
  xs: '0.5rem',    // 4px  (使用禁止)
  sm: '1rem',      // 8px
  md: '1.5rem',    // 12px (使用禁止)
  lg: '2rem',      // 16px
  xl: '3rem',      // 24px
  '2xl': '4rem',   // 32px
  '3xl': '6rem',   // 48px
} as const;

// 使用例
// Padding: p-4 (16px), p-2 (8px)
// Margin: m-4, m-2
// Gap: gap-4, gap-2
```

**許可されたスペーシング値:**
- `0`, `1` (8px), `2` (16px), `3` (24px), `4` (32px), `5` (40px), `6` (48px)
- `8`, `10`, `12` (Tailwind 拡張)

**禁止:**
- `1.5` (12px), `2.5` (20px) などの中途半端な値

## コンポーネントパターン

### ダッシュボードカード
```tsx
<Card className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-900 mb-4">カード タイトル</h2>
  {/* コンテンツ */}
</Card>
```

### メトリクス表示
```tsx
<div className="space-y-2">
  <p className="text-sm font-medium text-gray-600">メトリクス名</p>
  <div className="text-4xl font-bold text-gray-900">1,234.5</div>
  <p className="text-sm text-secondary-600">↑ 12.5% from last month</p>
</div>
```

### チャートコンテナ
```tsx
<Card className="p-4 sm:p-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">チャート タイトル</h3>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      {/* チャート内容 */}
    </LineChart>
  </ResponsiveContainer>
</Card>
```

## レスポンシブデザイン

### ブレークポイント
```
sm: 640px   // タブレット
md: 768px   // 小さいPC
lg: 1024px  // 標準PC
xl: 1280px  // 大きいPC
```

### レスポンシブ例
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1列 -> 2列 -> 3列 */}
</div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  {/* テキストサイズが段階的に増大 */}
</h1>
```

## アクセシビリティ

### コントラスト
- テキスト: WCAG AA以上（4.5:1の比率）
- グラフィック: WCAG AA（3:1の比率）

### インタラクティブ要素
```tsx
// ボタン・リンク
<button className="...focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Click me
</button>

// フォーム入力
<input className="...focus:ring-primary-500 focus:border-primary-500" />
```

### 意味的なマークアップ
```tsx
// Good
<h1>Main Title</h1>
<h2>Section Title</h2>
<button>Action</button>

// Bad
<div className="text-2xl font-bold">Main Title</div>
<div className="text-lg font-bold">Section Title</div>
<div onClick={handler} role="button">Action</div>
```

## ダークモード（将来拡張）
現在はライトモード対応のみ。ダークモード追加時は以下を考慮：
- `dark:` クラスの活用
- グレースケール調整（コントラスト維持）
- 色オーバーライドの定義

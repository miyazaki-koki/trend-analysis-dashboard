# テクノロジースタック・開発標準

## 言語・コア環境

- **TypeScript**: 5.0以上、strict モード必須
  - `strict: true` を tsconfig.json で有効化
  - 型推論に依存しすぎず、明示的な型宣言を心がける
  - `any` の使用は禁止、やむを得ない場合は `unknown` を使用

- **Node.js**: 18.x以上

- **React**: 18.x
  - Server Components と Client Components の使い分けを明確にする
  - useState, useEffect などの Hooks を適切に使用

## フレームワーク・ライブラリ

### フロントエンド
```
- next: 14.2.0 (App Router)
- react: 18.x
- react-dom: 18.x
```

### UI・スタイリング
```
- tailwindcss: 3.4.1 (CSS フレームワーク)
- tailwind-merge: 2.3.0 (クラス名マージング)
- clsx: 2.1.1 (条件付きクラス名）
- lucide-react: 0.378.0 (アイコンライブラリ)
```

### チャート・ビジュアライゼーション
```
- recharts: 2.12.7 (チャートライブラリ)
```

## 開発環境・ツール

### ビルド・実行
```bash
npm run dev      # 開発サーバー起動 (localhost:3000)
npm run build    # プロダクションビルド
npm start        # ビルド済みアプリケーション実行
npm run lint     # ESLint実行
```

### ノード環境
```
- eslint: 8.x
- eslint-config-next: 14.2.0
```

## コード品質基準

### TypeScript 厳密性
```typescript
// Good
function processData(items: DataItem[]): Result {
  const processed: Result[] = items.map(item => ({
    id: item.id,
    value: calculateValue(item)
  }));
  return processed[0];
}

// Bad
function processData(items: any): any {
  return items.map(item => item);
}
```

### インポート規則
```typescript
// 1. React/Next.js からのインポート
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. 外部ライブラリ
import { LineChart } from 'recharts';
import { AlertIcon } from 'lucide-react';

// 3. 内部モジュール（@ エイリアスを使用）
import { cn } from '@/lib/utils';
import { Dashboard } from '@/components/dashboard';
import { type TrendData } from '@/types/trend';

// 3つのグループは空行で区切る
```

### ファイル命名規則
```
コンポーネント: PascalCase (Button.tsx, TrendChart.tsx)
ユーティリティ: camelCase (utils.ts, mathHelpers.ts)
型定義: PascalCase (TrendData.ts, types.ts)
定数: UPPER_SNAKE_CASE (COLORS.ts, CONFIG.ts)
```

## パフォーマンス基準

### バンドルサイズ
- メインバンドル: 100KB以下（gzip）
- チャックサイズ: 50KB以下（gzip）

### ランタイムパフォーマンス
```
Core Web Vitals:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
```

### メモリ使用
- React コンポーネントツリー: 深さ最大20レベル
- 大規模データセット: Virtual Scrolling 使用時のみ

## 環境変数

```
.env.local (開発時、プライベート)
.env.example (テンプレート、リポジトリにコミット)
```

## 開発ワークフロー

```
1. ブランチ作成: feature/[feature-name]
2. ローカル開発: npm run dev
3. 動作確認: ブラウザで http://localhost:3000
4. Lint チェック: npm run lint
5. ビルド確認: npm run build
6. コミット: 明確なメッセージで
7. PR 作成: 変更内容を説明
```

## 禁止事項

- `eval()` の使用
- グローバル変数の定義
- `window.location` による強制ナビゲーション（next/navigation を使用）
- `any` 型の使用（やむを得ない場合のみ）
- 外部CDNへの直接依存（npm からのインストール推奨）

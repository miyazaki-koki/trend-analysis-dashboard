# CLAUDE.md

Claude Code向けのプロジェクトガイド。詳細は `.kiro/steering/` を参照。

## Project Overview

**Trend Analysis Dashboard** はトレンド分析・可視化のためのダッシュボードアプリケーション。データを視覚的に表現し、インサイトを導き出すための分析ツール。

### Core Capabilities

- **トレンド可視化**: 時系列データのチャート表示・分析
- **データ分析**: 各種指標の集計・比較・評価
- **インサイト抽出**: データから得られる知見の整理・表示
- **レスポンシブUI**: デスクトップ・モバイル対応のダッシュボード

### Design Philosophy

- **データ視認性重視**: 複雑なデータをわかりやすく可視化
- **シンプルなUI**: 分析に集中できるクリーンなインターフェース
- **日本市場特化**: 日本語UI、日本のビジネスコンテキストに対応

## Technology Stack

- **Language**: TypeScript 5+ (strict mode)
- **Web Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS 3.4.x
- **Charts**: Recharts 2.x
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # メインダッシュボード
│   └── globals.css       # グローバルスタイル
├── components/           # UIコンポーネント（今後拡張）
│   ├── ui/               # 汎用UIコンポーネント
│   ├── charts/           # チャートコンポーネント
│   └── dashboard/        # ダッシュボード固有コンポーネント
├── lib/                  # ユーティリティ・ヘルパー
├── types/                # 型定義
└── data/                 # データソース・モックデータ
```

## Development Commands

```bash
# Dev
npm run dev

# Build
npm run build

# Start (production)
npm run start

# Lint
npm run lint

# Test（導入後）
npm test
```

## Architecture Principles

### Component Design
- **コンポーネント分離**: 表示 / ロジック / データの分離
- **再利用性**: 汎用コンポーネントは `components/ui/` に配置
- **型安全性**: すべてのpropsに型定義を付与

### Data Flow
```
データソース → 型定義 → コンポーネント → 可視化
```

### チャート設計
- Rechartsベースの統一的なチャートAPI
- レスポンシブ対応（ResponsiveContainer使用）
- 一貫したカラーパレット使用

## Implementation: Canon TDD

実装タスクはKent BeckのCanon TDDに従う。

### TDD Cycle (厳守)

```
🔴 RED   → 🟢 GREEN → 🔵 BLUE → Repeat
```

| Phase | Action | Rule |
|-------|--------|------|
| 🔴 RED | テストを書く | 実装コードより先にテストを書く。テストは失敗すること |
| 🟢 GREEN | 実装を書く | テストを通す最小限のコードのみ |
| 🔵 BLUE | リファクタリング | テストをGREENに保ちながら改善 |

### Two Hats Rule (Kent Beck)

```
🎩 HAT 1 (GREEN): Make it work - 動くコードを書く
🎩 HAT 2 (BLUE):  Make it right - 構造を改善する

⚠️ 2つの帽子を同時にかぶらない
```

### Implementation Flow

1. **Test List作成**: 実装前に振る舞いシナリオをリスト化
   - Happy path（正常系）
   - Edge cases（境界値）
   - Error cases（異常系）

2. **One Test at a Time**: リストから1つずつテスト→実装→リファクタリング

3. **Checkpoint**: 各フェーズ完了時に状態を報告
   - `🔴 RED: [behavior] test fails as expected`
   - `🟢 GREEN: [behavior] implemented and test passes`
   - `🔵 BLUE: Refactoring complete, tests remain GREEN`

### Test Commands

```bash
# テスト実行（テストフレームワーク導入後）
npm test
npm test -- --watch
```

詳細は `.claude/commands/kiro/spec-impl.md` を参照。

## Design System

ダークブルー・ティールアクセント + ライトグレーベースのデザインシステム。

```typescript
// Primary Colors
accent.primary: '#0EA5E9'    // スカイブルー（メインアクセント）
accent.secondary: '#14B8A6'  // ティール（セカンダリアクセント）
accent.danger: '#EF4444'     // 危険・警告
primary: '#0F172A'           // メインテキスト（スレート900）

// Gray Scale
gray.50 - gray.900           // 背景〜テキスト
```

詳細は `DESIGN_RULE.md` を参照。

## Git操作ルール

- **フォースプッシュ禁止**: `git push --force` は事前承認なしに実行しない
- コミットは Working Tree がクリーンな状態で行う
- コミットメッセージは変更の「why」を説明

## 応答言語

- **会話**: 日本語
- **コード**: 英語（変数名、関数名）
- **UIテキスト**: 日本語

## 詳細ドキュメント

- `.kiro/steering/product.md` - プロダクト概要
- `.kiro/steering/tech.md` - 技術スタック
- `.kiro/steering/structure.md` - プロジェクト構造
- `.kiro/steering/design.md` - デザインシステム
- `.kiro/steering/testing.md` - テスト規約

# 副業OS / プロダクト開発戦略ダッシュボード

> AI時代の最強ポジション：「作る人が発信する」

2025〜2026年のトレンド分析をベースに、**個人の試行錯誤を支援するプロダクト**の設計・戦略を可視化したNext.js製ダッシュボードです。

## このプロジェクトが解決する問題

| 今のユーザー | このプロダクトで |
|-------------|----------------|
| 何すればいいかわからない | 何やるか決まる |
| 続かない | 続けられる |
| 成果出ない | 改善される |

## 稼げる構造（3層）

```
① 集客（Attention）  → バズはここだけ
② 価値提供（Value）  → 信頼を積む
③ 収益化（Monetization） → ①②が設計されて初めて稼げる
```

## ダッシュボードの内容

### 1. 稼げる構造3層
集客・価値提供・収益化の設計を可視化。「バズだけで稼げない理由」を構造で理解。

### 2. 3つの仮説と1週間プラン
- 🧩 **③ プロダクト開発（本命）** - 「小さなツールで課金される」仮説
- 🎬 **① YouTube（信頼構築）** - 「作る過程を見せると信頼が爆上がり」
- 🔗 **② アフィリ（即金検証）** - 「レビュー記事で収益化」

各仮説のKPI・Day1〜Day7の1週間タスク・強みを比較できる。

### 3. 副業OS プロダクト設計
**コンセプト：** 「個人の試行錯誤を支援するプロダクト」

**MVP機能：**
- 仮説生成（最初の一手を決める）
- 1週間プラン自動生成
- タスク管理（日次5〜7個）
- 成果ログ（数値記録）
- 振り返り（良かった/ダメだった）
- 収益化条件表示（NEW）
- 進捗ゲージ（NEW）

**データモデル：**
```
Profile: skills[], available_hours_per_week, monthly_goal
Sprint: start_date, end_date, selected_hypothesis_id, kpi_targets, status
Task: date, title, estimated_minutes, done, note
DailyLog: date, worked_minutes, output_counts, result_metrics, reflection
RequirementProgress: platform, current, required
```

### 4. プロダクトの進化
- MVP（今まで）: TODO → 仮説 → 実行
- 強化（今回）: + 結果ログ + 失敗記録 + 学習履歴

日次タスク完了ログのチャートで進捗を可視化。

### 5. ブランド・発信戦略
- 投稿内容：「この仮説でやってみた」「3日でこうなった」「これ無駄だった」
- ❌ダメ：宣伝・機能紹介
- ✅強い：実験ログ・過程・失敗

### 6. マネタイズ導線
- メルマガ・LINE登録（MVP段階から）
- 有料機能（将来）
- コミュニティ運営（信頼ベース）
- BtoB小規模支援（即金性が高い）

## 技術スタック

- **Next.js 14** (App Router + Client Components)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (BarChart・RadarChartで進捗・スコア可視化)
- **Lucide React** (アイコン)

## セットアップ

```bash
git clone https://github.com/miyazaki-koki/trend-analysis-dashboard.git
cd trend-analysis-dashboard
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

## プロジェクト構成

```
trend-analysis-dashboard/
├── src/
│   └── app/
│       ├── globals.css      # グローバルスタイル
│       ├── layout.tsx       # ルートレイアウト
│       └── page.tsx         # メインダッシュボード（568行）
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## 本質

> 「机上の設計」じゃなくて「実験できる状態を作る」

> **これ、ほぼ勝ちパターン**

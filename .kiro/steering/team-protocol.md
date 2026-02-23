# チームプロトコル・開発プロセス

## プロジェクト管理構造

### 階層的エージェント構造

```
User (プロジェクト所有者)
  ↓
Team Lead (Claude AI - 1つの永続的エージェント)
  ↓
Engineers (必要に応じて複数のClaude AIエージェント)
```

### 役割と責任

**User:**
- プロジェクト目標の定義
- 優先度決定
- 最終承認者
- Team Lead へのハイレベル指示

**Team Lead:**
- プロジェクト全体の方針決定
- 品質基準の維持
- Engineers への詳細指示
- 進捗管理とリスク報告
- Code Review と整合性チェック

**Engineers:**
- 具体的な実装タスク
- 単一責任範囲の開発
- 品質基準への準拠
- Team Lead への実装報告

## 開発プロセス

### TDD (Test-Driven Development) 強制

全てのコード変更は以下の順序で実施：

```
1. RED: テスト作成（失敗する）
2. GREEN: 最小限の実装でテストを通す
3. REFACTOR: コードを改善（テストは常に成功）
```

**実装順序の厳密化:**
```
step 1. npm test が全て PASS する状態を確認
step 2. テストファイルを新規作成・編集
step 3. npm test が失敗することを確認
step 4. 実装コードを編集
step 5. npm test が全て PASS することを確認
step 6. リファクタリング（テストは PASS のまま）
```

### 完了ゲーティング

タスクは以下を全て満たさない限り完了にしない：

```
✓ npm test で全テスト成功
✓ npm run build で成功（エラー・警告なし）
✓ npm run lint で警告なし
✓ コードレビュー合格（Team Lead）
✓ ドキュメント更新完了
✓ Git コミット完了
```

### ブランチ戦略

```
main ← production 対応（常に安定）
  ↓
develop ← 統合ブランチ
  ↓
feature/* ← 機能開発（develop から分岐）
```

**ブランチ命名:**
```
feature/add-metric-card
feature/fix-chart-rendering
feature/improve-performance
bugfix/null-pointer-exception
refactor/extract-hook-logic
```

## 実装タスク分割基準

### Engineer が担当できるタスク粒度

1つのタスク = 1-2時間で実装完了できるサイズ

**Good:**
- Button コンポーネント実装
- 数値フォーマット関数追加
- 単一チャートコンポーネント
- エラーハンドリング追加
- 小規模リファクタリング

**Bad - 分割が必要:**
- ダッシュボード全体（複数タスクに分割）
- API統合から UI 実装まで（分離）
- 大規模リファクタリング（段階的に）

### チェックリスト駆動タスク定義

タスク定義には以下のテンプレートを使用：

```markdown
## Task: [功能名] を実装

### 目的
[何のために、なぜこれが必要か]

### 完了条件（チェックリスト）
- [ ] Card コンポーネントを実装
- [ ] 該当するユニットテスト作成
- [ ] テスト全て PASS
- [ ] Lint チェック PASS
- [ ] ビルド成功
- [ ] Code Review 合格
- [ ] Git にコミット

### コンテキスト
[関連ファイル、型、既存実装への参照]

### 実装例・参考コード
[デザインシステムの参照、類似コンポーネントへのリンク]
```

## コミュニケーションプロトコル

### Team Lead ↔ Engineer

**タスク指示:**
```
Team Lead:
"Button コンポーネントを実装してください。
仕様:
- props: label (string), variant ('primary' | 'secondary'), disabled (boolean)
- 型定義: src/components/ui/Button.tsx に追加
- テスト: Button.test.tsx を同時に作成
- デザインシステム参照: .kiro/steering/design.md

完了ゲーティングをクリアしたら報告してください。"
```

**完了報告:**
```
Engineer:
"Button コンポーネント実装完了です。

実装内容:
- src/components/ui/Button.tsx (45行)
- src/components/ui/Button.test.tsx (3テスト, 全て PASS)

テスト: npm test ✓
ビルド: npm run build ✓
Lint: npm run lint ✓ (警告なし)

コミット: 1ce9a2d "feat: add Button component with variants"

レビュー・マージをお願いします。"
```

**レビューコメント:**
```
Team Lead:
"実装を確認しました。

指摘:
1. Button.test.tsx で onClick ハンドラーのテストを追加してください
2. accessibility (aria-label) のテストケースを追加
3. TypeScript の型定義が完全か確認

上記を修正後、再度報告をお願いします。"
```

### User ↔ Team Lead

**ハイレベル指示:**
```
User:
"ダッシュボードのトレンド表示機能を実装してください。
期限: 3日以内
要件: トレンド線グラフと前月比メトリクスを並べて表示"
```

**進捗報告（毎日）:**
```
Team Lead:
"トレンド表示機能の進捗報告です。

完了:
✓ Trend 型定義
✓ サンプルデータセット作成
✓ TrendChart コンポーネント

進行中:
→ MetricCard コンポーネント実装中（本日中に完了予定）

リスク: なし
次のマイルストーン: 明日中にダッシュボード統合"
```

## 品質基準の監視

### Code Review チェックリスト

Team Lead がマージ前に確認：

```
テスト
- [ ] npm test が全て PASS か
- [ ] 新機能に対応するテストが存在するか
- [ ] テストカバレッジが要件を満たすか

コード品質
- [ ] TypeScript strict モードで型チェック PASS か
- [ ] 変数名・関数名が明確か
- [ ] 200行超のファイルはないか（リファクタリング候補）
- [ ] コメント・ドキュメント更新されているか

デザイン
- [ ] デザインシステムに準拠しているか
- [ ] 色・スペーシング・タイポグラフィが正しいか

パフォーマンス
- [ ] 不要な re-render はないか（memo 使用検討）
- [ ] バンドルサイズは増加していないか

その他
- [ ] ビルド警告はないか
- [ ] lint エラーはないか
```

## 開発環境の標準化

### Node.js & npm バージョン
```
Node.js: 18.x LTS
npm: 9.x以上
```

### 開発ツール
```bash
# 推奨エディタ: VS Code

# 推奨拡張機能
- TypeScript Vue Plugin
- ESLint
- Prettier (プロジェクトで未使用だが、個人使用推奨)
- Tailwind CSS IntelliSense
```

### 初期セットアップ
```bash
cd trend-analysis-dashboard
node --version          # 18.x か確認
npm install             # 依存パッケージ インストール
npm run dev             # 開発サーバー起動
npm test                # テスト実行確認
npm run build           # ビルド確認
```

## トラブルシューティング

### Engineer が詰まった場合のエスカレーション

```
1. 15分以上詰まった → Team Lead に相談
2. Team Lead が30分以内に解決できない → 別の Engineer に引き継ぎ
3. Architecture の問題の場合 → User に報告
```

### よくある問題

**Q: テストが失敗する**
```
A: 以下の順序で確認
1. npm install を再実行
2. npm test -- --clearCache で キャッシュ削除
3. ローカル環境で再現確認
4. Team Lead に詳細レポート
```

**Q: ビルドに失敗した**
```
A: TypeScript エラーの可能性が高い
1. npm run lint で詳細確認
2. tsconfig.json の strict: true で再チェック
3. 型定義を見直す
```

## タスク終了のサイン

Engineer がタスク完了を報告したら、Team Lead は以下を確認：

```typescript
// 1. テスト実行
const testsPass = await run('npm test');

// 2. ビルド確認
const buildSuccess = await run('npm run build');

// 3. Lint チェック
const lintPass = await run('npm run lint');

// 4. Git 状態確認
const gitLog = await run('git log --oneline -1');

// 全て成功したら → merge to develop ✓
```

## 定期的な見直し

### 週 1 回（金曜）
- テストカバレッジ確認
- 技術的負債の評価
- パフォーマンス指標確認

### 月 1 回
- プロセス改善（このドキュメント更新）
- チーム間のコミュニケーション品質評価
- 新しい依存パッケージのセキュリティアップデート確認

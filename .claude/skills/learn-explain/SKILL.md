---
name: learn-explain
description: 生成後理解プロセス。コードの「なぜ」を徹底的に解説し、借り物のコードを自分の知識に昇華させる。実装完了後、コードを理解したい時に使用。
allowed-tools: Bash, Read, Glob, Grep
argument-hint: [--selection | --file <path>] [focus-area]
---

# Learn Explain - 生成後理解プロセス

AIが生成したコードや変更内容を深く理解するためのスキルです。
Anthropicの研究に基づく「Generation-then-comprehension」アプローチを実践します。

## 目的

> AIが書いたコードを「借り物」ではなく、ロジックを1行ずつ説明できるレベルまで「自分の知識」に昇華させる

## 使用方法

```bash
# 現在のブランチの変更を解説（デフォルト）
/learn-explain

# IDEで選択中のコードを解説
/learn-explain --selection

# 特定ファイルを解説
/learn-explain --file src/components/charts/LineChart.tsx

# 特定の観点で解説
/learn-explain "Rechartsの使い方について"
/learn-explain --selection "なぜこのデータ構造を使ったか"
```

## 実行フロー

### 1. 対象コードの特定

$ARGUMENTSを解析：

- `--selection` → IDEで選択中のコードを対象
- `--file <path>` → 指定ファイルを対象
- 空 / その他 → 現在のブランチの変更（main比較）を対象

**diffモードの場合**:
```bash
git diff main --name-only  # 変更ファイル一覧
git diff main              # 詳細な変更内容
```

**選択コードがある場合**:
`$SELECTION` 変数から取得

### 2. コンテキスト収集

対象コードに関連する情報を収集：

- 変更されたファイルの全体像
- 関連する型定義やインターフェース
- 呼び出し元・呼び出し先のコード
- 関連するテストコード（あれば）

### 3. 段階的解説

以下の順序で解説を提供：

#### A. 概要レベル（What）
- このコードは何をしているか
- 全体的な処理フロー

#### B. 詳細レベル（How）
- 各関数・メソッドの役割
- データの流れ
- 状態の変化

#### C. 理由レベル（Why）- **最重要**
- なぜこのアプローチを選んだか
- 他の選択肢との比較
- トレードオフの説明

### 4. 深掘り質問

解説後、理解を深めるための質問を提示：

```
🤔 深掘りポイント:
1. 「なぜここで○○パターンを使ったか説明できますか？」
2. 「この処理を別のアプローチで書くとどうなりますか？」
3. 「エラーが発生した場合、どう伝播しますか？」
```

## 出力フォーマット

### 変更ファイルが複数ある場合

```markdown
## 📂 変更概要
- `src/components/charts/LineChart.tsx` - チャート実装の追加
- `src/lib/calculations.ts` - 移動平均計算関数の追加
- `src/types/metrics.ts` - 型定義の追加

## 📖 詳細解説

### src/components/charts/LineChart.tsx

#### What: 何をしているか
Recharts の LineChart を使用して時系列トレンドを可視化するコンポーネント。
SKY_BLUE と TEAL の 2 つのシリーズを表示し、日付ごとの値を折れ線グラフで表現します。

#### How: どう実装しているか
- ResponsiveContainer でコンテナの幅に応じた自動リサイズ
- XAxis で日付軸、YAxis で値軸を定義
- Line コンポーネントで各シリーズをプロット
- Tooltip でホバー時に詳細値を表示

#### Why: なぜそうしたか
- ResponsiveContainer を使うことで、モバイル・デスクトップ対応が自動化される
- 2シリーズを比較表示することで、トレンドの相関性が視覚的に理解しやすい

---

### src/lib/calculations.ts

[同様の構造]

---

## 🤔 深掘りポイント
1. 「なぜ Recharts を選んだのか」
2. 「ResponsiveContainer の動作原理は」
3. 「データ構造を別の形にするとどうなるか」

💡 気になる点があれば「○○について詳しく」と聞いてください
```

### 単一ファイル・選択コードの場合

より詳細な行単位の解説を提供：

```markdown
## 📖 コード解説

### コードスニペット

```typescript
function calculateMovingAverage(data: MetricData[], window: number = 7) {
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

### 行ごとの解説

**L1: 関数シグネチャ**
- `data: MetricData[]` - 時系列データの配列
- `window: number = 7` - デフォルト 7 日間の移動平均
- なぜデフォルト値 7 か: 週間トレンド表示が最も一般的

**L2-3: map + インデックス**
- 各データポイントについて新しい値を計算
- インデックスを使用して「このデータの前からいくつ遡るか」を判定

**L4: Math.max(0, idx - window + 1)**
- 配列の開始（idx=0）を超えないようにする境界値チェック
- 例: idx=2, window=7 の場合も、start=0（負の値にしない）

**L5: slice() で ウィンドウ内のデータ抽出**
- start から idx+1 までのデータだけを取得
- なぜ idx+1 か: JavaScript の slice は終了インデックスを含まないため

**L6: reduce で平均計算**
- 合計を計算してから、要素数で割る
- なぜ reduce か: 一度のループで合計を求められる

**L7-10: 結果オブジェクト**
- 元のデータの日付はそのまま保持
- 値を平滑化（小数第2位で四捨五入）

### 代替アプローチ

別の書き方との比較：

| アプローチ | メリット | デメリット |
|-----------|---------|-----------|
| 現在の実装（map + slice + reduce） | シンプル、理解しやすい | 各ポイントで毎回 slice |
| 代替案A: キューを使用 | パフォーマンス最適化 | コードが複雑 |
| 代替案B: ライブラリ（lodash） | テスト済み | 外部依存増加 |

### 🤔 深掘りポイント

1. **時間計算量**: このコードの計算量は O(n * window) です。なぜですか？
2. **エッジケース**: 最初の 6 ポイント（window より少ない）の処理は正しいですか？
3. **精度**: なぜ Math.round(avg * 100) / 100 なのか？
```

## 学習効果を高めるコツ

1. **受動的に読まない**: 解説を読んだら、自分の言葉で要約してみる
2. **疑問を持つ**: 「なぜ？」と思った点は追加で質問する
3. **比較する**: 代替アプローチとの違いを理解する
4. **実践する**: 類似のコードを自分で書いてみる

## よくある「Why」質問への回答例

### Q: なぜ `map` を使うのか？
A: **map** は「データ配列を変換して新しい配列を作る」という意図を明確に表現します。
他の選択肢：
- **for ループ**: より低レベル、変数管理が増える
- **forEach**: 新しい配列を返さない（副作用が多い）
- **reduce**: より複雑な場合向け

### Q: なぜこのデータ構造か？
A: コンポーネントが `{ date, value }` 構造を期待しているため。
別構造にするなら、コンポーネント側の変更が必要。

## 関連スキル

- `/learn-quiz` - 理解度をテストするクイズ
- `/learn-break` - 意図的に壊して学ぶ
- `/codex-review` - コードレビュー（品質チェック）

# テスト戦略・品質保証

## テスト哲学

### 核となる原則

1. **振る舞いテスト** - 実装詳細ではなく、ユーザーの視点からテスト
2. **信頼できるテスト** - テストの失敗は真実の問題を示す
3. **迅速なテスト** - テストスイート実行は30秒以下を目指す
4. **メンテナンス性** - テストコードは本体コードと同じ品質で

### テスト vs 実装
```
テストコード行数 : 実装コード行数 ≈ 1 : 2
```

## テストフレームワーク・ツール

### ユニットテスト・コンポーネントテスト
```
Framework: Jest (またはVitest)
Components: React Testing Library
```

### セットアップ
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @types/jest
```

### 実行コマンド
```bash
npm test                      # テスト実行（1回）
npm test -- --watch          # ウォッチモード
npm test -- --coverage       # カバレッジレポート付き実行
npm test -- src/components   # 特定ディレクトリのみ
```

## テストファイル構成

### ファイル配置
```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx      # コンポーネント隣に配置
├── lib/
│   ├── math.ts
│   └── math.test.ts         # ユーティリティ隣に配置
└── types/
    └── trend.ts             # テスト不要（型定義のみ）
```

### ファイル命名規則
```
Button.tsx          → Button.test.tsx
utils.ts            → utils.test.ts
formatNumber.ts     → formatNumber.test.ts
```

## テストの種類と内容

### ユニットテスト

**対象:** ユーティリティ関数、純粋関数、ロジック

```typescript
// src/lib/formatting.test.ts
import { formatNumber } from '@/lib/formatting';

describe('formatNumber', () => {
  it('should format numbers with thousand separator', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('should handle decimal places correctly', () => {
    expect(formatNumber(1234.567, 2)).toBe('1,234.57');
  });

  it('should handle edge cases', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(-100)).toBe('-100');
  });
});
```

### コンポーネントテスト

**対象:** React コンポーネント（UI と振る舞い）

```typescript
// src/components/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply className prop', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should support variant prop', () => {
    const { container } = render(<Card variant="outlined">Content</Card>);
    expect(container.firstChild).toHaveClass('outlined-variant');
  });
});
```

### インテグレーションテスト

**対象:** 複数コンポーネント間の協調動作

```typescript
// src/components/dashboard/Dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '@/components/dashboard/Dashboard';

describe('Dashboard', () => {
  it('should render dashboard with charts and metrics', async () => {
    render(<Dashboard />);

    // チャートの読み込み待機
    await waitFor(() => {
      expect(screen.getByText('Trend Analytics')).toBeInTheDocument();
    });

    // メトリクスが表示されているか確認
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('should update chart when date range changes', async () => {
    render(<Dashboard />);
    // ... テスト実装
  });
});
```

## テストの構造（AAA パターン）

全てのテストは以下の3段階に分ける：

```typescript
describe('calculateTrendChange', () => {
  it('should calculate percentage change correctly', () => {
    // Arrange: テストデータの準備
    const previousValue = 100;
    const currentValue = 125;

    // Act: テスト対象の実行
    const result = calculateTrendChange(previousValue, currentValue);

    // Assert: 結果の検証
    expect(result).toBe(25);
  });
});
```

## モッキングパターン

### モジュールのモック
```typescript
jest.mock('@/lib/api', () => ({
  fetchTrendData: jest.fn().mockResolvedValue([
    { id: '1', value: 100, timestamp: '2024-01-01' }
  ])
}));

import { fetchTrendData } from '@/lib/api';

it('should load trend data', async () => {
  const data = await fetchTrendData();
  expect(data).toHaveLength(1);
});
```

### 関数のモック
```typescript
const mockCallback = jest.fn();
render(<Button onClick={mockCallback}>Click</Button>);
fireEvent.click(screen.getByRole('button'));
expect(mockCallback).toHaveBeenCalledTimes(1);
```

## テストカバレッジ目標

```
Statements: >= 80%
Branches: >= 75%
Functions: >= 80%
Lines: >= 80%
```

### 対象外のコード
- 型定義ファイル
- 設定ファイル（next.config.js など）
- ページコンポーネント（src/app/*.tsx）
- スタイルのみのコンポーネント

## テスト実行時の注意事項

### 環境変数
```typescript
// jest.setup.ts
process.env.NEXT_PUBLIC_API_ENDPOINT = 'http://localhost:3000';
```

### 非同期テスト
```typescript
// async/await を使用する
it('should load data', async () => {
  const data = await loadData();
  expect(data).toBeDefined();
});

// または waitFor を使用
it('should update state', async () => {
  render(<Component />);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

### React Testing Library のベストプラクティス
```typescript
// Good: ユーザーが見る要素でテスト
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')
screen.getByText('Welcome')

// Bad: 実装詳細でテスト
wrapper.find('.submit-button')
document.querySelector('#btn-submit')
screen.getByTestId('submit-btn')  // テストIDは最後の手段
```

## デバッグ方法

### コンソール出力
```typescript
import { screen } from '@testing-library/react';

it('debug test', () => {
  render(<YourComponent />);
  screen.debug();  // DOMツリー全体を出力
  screen.debug(screen.getByRole('button'));  // 特定要素のみ
});
```

### テスト中の一時停止
```typescript
// デバッガーで停止
it('inspect element', () => {
  render(<Component />);
  // 次の行でデバッガー停止
  debugger;
  // ブラウザのDevToolsで検査可能
});
```

## CI/CD との統合

### GitHub Actions の例
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
      - run: npm run build
```

## テスト時間の最適化

### 遅いテストへの対策
```typescript
// setTimeout を避ける
// ❌ it('waits', (done) => { setTimeout(() => { done(); }, 1000); });

// ✓ waitFor を使用
it('waits', async () => {
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

### バッチ実行
```bash
# 複数テストファイルを並列実行（デフォルト）
npm test

# シリアル実行（デバッグ時のみ）
npm test -- --runInBand
```

## テスト命名規則

```typescript
// モジュール内の主要な機能
describe('formatNumber', () => {
  // 単一の振る舞いをテスト
  it('should format numbers with thousand separator', () => {});

  // エッジケースをテスト
  it('should handle zero', () => {});
  it('should handle negative numbers', () => {});
});
```

## よくあるテストミス

```typescript
// ❌ 実装詳細をテスト
it('sets state to true', () => {
  const [isOpen, setIsOpen] = useState(false);
  // ...
});

// ✓ 振る舞いをテスト
it('opens modal when button is clicked', () => {
  render(<Button onClick={() => setOpen(true)}>Open</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
```

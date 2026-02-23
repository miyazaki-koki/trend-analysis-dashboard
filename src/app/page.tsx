'use client';

import { useState } from 'react';
import {
  TrendingUp, Brain, Target, Rocket, CheckCircle, XCircle,
  ArrowRight, Layers, DollarSign, Users, Zap, BookOpen,
  Play, BarChart2, Clock, Star, AlertTriangle, ChevronDown, ChevronUp
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// ========== データ ==========

const moneyStructure = [
  {
    step: 1,
    icon: '👁',
    label: '集客（Attention）',
    description: 'バズで人を集める。ここはきっかけに過ぎない',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    note: 'バズはここだけ',
  },
  {
    step: 2,
    icon: '💎',
    label: '価値提供（Value）',
    description: '信頼・継続・体験を届ける。ここで差がつく',
    color: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    note: '信頼を積む',
  },
  {
    step: 3,
    icon: '💰',
    label: '収益化（Monetization）',
    description: '課金・アフィリ・継続契約。①と②が設計されて初めて稼げる',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    note: '稼げるのは①②が設計されてから',
  },
];

const hypotheses = [
  {
    id: 'product',
    emoji: '🧩',
    label: '③ プロダクト開発（本命）',
    badge: '本命',
    badgeColor: 'bg-rose-100 text-rose-700',
    hypothesis: '「小さなツールで課金される」',
    kpi: ['MVP完成：1個', 'ユーザー：5人', '反応：1件以上'],
    week: [
      { day: 'Day1', task: 'アイデア決定' },
      { day: 'Day2', task: 'MVP設計' },
      { day: 'Day3', task: '実装スタート' },
      { day: 'Day4-5', task: 'コア機能完成' },
      { day: 'Day6', task: 'リリース' },
      { day: 'Day7', task: 'フィードバック収集' },
    ],
    strength: '検証しやすい・スキルが残る・プロダクト開発の延長',
    border: 'border-rose-300',
    bg: 'bg-rose-50',
  },
  {
    id: 'youtube',
    emoji: '🎬',
    label: '① YouTube（信頼爆上がり）',
    badge: '信頼構築',
    badgeColor: 'bg-blue-100 text-blue-700',
    hypothesis: '「作る過程を見せると信頼が爆上がりする」',
    kpi: ['登録者：100人', 'MVPリリース動画：1本', '反応：5件以上'],
    week: [
      { day: 'Day1', task: 'チャンネル設計・ネタ決め' },
      { day: 'Day2', task: '撮影・編集' },
      { day: 'Day3', task: '投稿' },
      { day: 'Day4-5', task: 'ネタ分析・改善' },
      { day: 'Day6', task: '次のネタ収録' },
      { day: 'Day7', task: '振り返り' },
    ],
    strength: '「作ってる人が語る人になる」から信頼が深い・リアル・差別化',
    border: 'border-blue-300',
    bg: 'bg-blue-50',
  },
  {
    id: 'affiliate',
    emoji: '🔗',
    label: '② アフィリ（即金検証）',
    badge: '即金',
    badgeColor: 'bg-amber-100 text-amber-700',
    hypothesis: '「レビュー記事 or 投稿で収益化できる」',
    kpi: ['記事：5本', 'クリック：100件', '成約：1件'],
    week: [
      { day: 'Day1', task: 'ジャンル・ASP選定' },
      { day: 'Day2', task: 'キーワード調査' },
      { day: 'Day3', task: '記事1本目作成' },
      { day: 'Day4-5', task: '記事2-3本' },
      { day: 'Day6', task: 'SNS投稿テスト' },
      { day: 'Day7', task: 'クリック分析' },
    ],
    strength: '即金性・スピード検証',
    border: 'border-amber-300',
    bg: 'bg-amber-50',
  },
];

const productOS = {
  concept: '「個人の試行錯誤を支援するプロダクト」',
  tagline: '副業OS - 仮説→実行→記録→学習が回るツール',
  problem: ['何すればいいかわからない', '続かない', '成果出ない'],
  solution: ['何やるか決まる', '続けられる', '改善される'],
  mvpFeatures: [
    { icon: '🎯', label: '仮説生成', desc: '「プロダクト開発で稼ぐ」など最初の一手を決める' },
    { icon: '📅', label: '1週間プラン', desc: '自動 or 半自動でDay1〜Day7のタスクを生成' },
    { icon: '✅', label: 'タスク管理', desc: '日次5〜7個。done/undoneで記録' },
    { icon: '📝', label: '成果ログ', desc: '完了/未完了・簡単なメモ・数値記録' },
    { icon: '🔄', label: '振り返り', desc: '良かった/ダメだったを1行で記録' },
    { icon: '📊', label: '収益化条件表示（NEW）', desc: '収益化条件をチェックリスト化' },
    { icon: '⚡', label: '進捗ゲージ（NEW）', desc: '「どこまでいけば稼げるか」が分かる' },
  ],
  dataModel: [
    { name: 'Profile', fields: 'skills[], available_hours_per_week, monthly_goal' },
    { name: 'Sprint', fields: 'start_date, end_date, selected_hypothesis_id, kpi_targets, status' },
    { name: 'Task', fields: 'date, title, estimated_minutes, done, note' },
    { name: 'DailyLog', fields: 'date, worked_minutes, output_counts, result_metrics, reflection' },
    { name: 'RequirementProgress', fields: 'platform (YouTube/ASP/etc), current, required' },
  ],
  techStack: 'Next.js + localStorage/JSON（壊れたらSQLiteに移行）',
  positionBrand: ['誠実', '実験的', '途中を出す', '失敗を出す'],
  contentStrategy: [
    '「この仮説でやってみた」',
    '「3日でこうなった」',
    '「これ無駄だった」',
  ],
};

const aiEraPosition = {
  title: 'AI時代の最強ポジション',
  quote: '「作る人が発信する」',
  comparison: [
    { type: '普通', flow: 'YouTube → 作る', result: '浅くなる・信頼弱い' },
    { type: 'あなた', flow: '作る → YouTube', result: '深い・リアル・差別化' },
  ],
  future: [
    { label: '他人の実験を見る', desc: '成功例・失敗例' },
    { label: '仮説の精度が上がる', desc: 'データ蓄積' },
    { label: '自動最適化', desc: 'AIが提案' },
  ],
};

const growthStructure = [
  { label: 'TODO → 仮説 → 実行', before: 'MVP（今まで）' },
  { label: '結果ログ + 失敗記録 + 学習履歴', before: '強化（今回追加）' },
];

const weeklyDataModel = [
  { name: 'Day1', tasks: 3, done: 3 },
  { name: 'Day2', tasks: 5, done: 4 },
  { name: 'Day3', tasks: 6, done: 5 },
  { name: 'Day4', tasks: 5, done: 3 },
  { name: 'Day5', tasks: 7, done: 6 },
  { name: 'Day6', tasks: 4, done: 4 },
  { name: 'Day7', tasks: 3, done: 2 },
];

// ========== コンポーネント ==========

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const [activeHypothesis, setActiveHypothesis] = useState<string>('product');
  const [showDataModel, setShowDataModel] = useState(false);

  const active = hypotheses.find(h => h.id === activeHypothesis) ?? hypotheses[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">副業OS / プロダクト開発戦略</h1>
              <p className="text-xs text-slate-500">トレンド × 仮説 × 実行 × 収益化設計</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-medium text-rose-700">2025〜2026 AI時代の戦略</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* ヒーロー */}
        <section className="text-center py-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-full px-5 py-2 mb-6 text-sm font-medium">
            🔥 AI時代の最強ポジション
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            「<span className="gradient-text">作る人が発信する</span>」
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-3">
            普通：YouTube → 作る（浅い・信頼弱い）
          </p>
          <p className="text-xl font-bold text-slate-800 max-w-2xl mx-auto">
            あなた：<span className="text-rose-600">作る → YouTube</span>（深い・リアル・差別化）
          </p>
        </section>

        {/* 稼げる構造3層 */}
        <section>
          <SectionHeader
            icon={<Layers className="w-6 h-6 text-rose-500" />}
            title="稼げる構造は3層でできている"
            subtitle="どんな案でも、最終的に稼げるかはこの構造に乗るかどうか"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moneyStructure.map((item) => (
              <div key={item.step} className={`card-hover ${item.bg} border ${item.border} rounded-2xl p-6 relative overflow-hidden`}>
                <div className="absolute top-3 right-3 text-xs font-bold text-slate-400">STEP {item.step}</div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.label}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="mt-auto">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                    {item.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-slate-900 text-white rounded-xl p-4 text-center">
            <p className="text-sm">
              <span className="text-yellow-400 font-bold">バズは①だけ</span> ／
              <span className="text-green-400 font-bold ml-2">稼げるのは①②が設計されて初めて</span>
            </p>
          </div>
        </section>

        {/* 仮説3択 */}
        <section>
          <SectionHeader
            icon={<Target className="w-6 h-6 text-purple-500" />}
            title="3つの仮説と1週間プラン"
            subtitle="「仮説を立てて、1週間で検証する」がOSのコア"
          />

          {/* タブ切替 */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {hypotheses.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHypothesis(h.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeHypothesis === h.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {h.emoji} {h.label.replace(/[①②③]s/, '')}
              </button>
            ))}
          </div>

          {/* アクティブ仮説 */}
          <div className={`border-2 ${active.border} ${active.bg} rounded-2xl p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{active.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{active.label}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active.badgeColor}`}>
                  {active.badge}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 仮説とKPI */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-1">仮説</p>
                  <p className="text-lg font-bold text-slate-800">{active.hypothesis}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-2">KPI（1週間）</p>
                  {active.kpi.map((k) => (
                    <div key={k} className="flex items-center gap-2 text-sm text-slate-700 mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {k}
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 mb-1">強み</p>
                  <p className="text-sm text-slate-700">{active.strength}</p>
                </div>
              </div>

              {/* 1週間タスク */}
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 mb-3">1週間タスク</p>
                <div className="space-y-2">
                  {active.week.map((w) => (
                    <div key={w.day} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 w-14 shrink-0">{w.day}</span>
                      <span className="text-sm text-slate-700">{w.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* プロダクトOS */}
        <section>
          <SectionHeader
            icon={<BookOpen className="w-6 h-6 text-indigo-500" />}
            title="副業OS プロダクト設計（本命）"
            subtitle={productOS.concept}
          />

          {/* 解く課題 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-red-700 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 今のユーザーの問題
              </h3>
              {productOS.problem.map((p) => (
                <p key={p} className="text-sm text-red-700 flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />{p}
                </p>
              ))}
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> あなたのプロダクトで
              </h3>
              {productOS.solution.map((s) => (
                <p key={s} className="text-sm text-emerald-700 flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />{s}
                </p>
              ))}
            </div>
          </div>

          {/* MVP機能 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
            <h3 className="text-base font-bold text-slate-700 mb-4">MVP統合版（必須機能）</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {productOS.mvpFeatures.map((f) => (
                <div key={f.label} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                  <span className="text-xl shrink-0">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{f.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* データモデル（トグル） */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowDataModel(!showDataModel)}
              className="w-full flex items-center justify-between p-4 text-white hover:bg-slate-800 transition-colors"
            >
              <span className="text-sm font-semibold">🗂 データモデル（最小スキーマ）</span>
              {showDataModel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showDataModel && (
              <div className="px-4 pb-4 space-y-2">
                {productOS.dataModel.map((d) => (
                  <div key={d.name} className="bg-slate-800 rounded-xl p-3">
                    <span className="text-emerald-400 font-mono text-sm font-bold">{d.name}</span>
                    <p className="text-slate-300 text-xs mt-1 font-mono">{d.fields}</p>
                  </div>
                ))}
                <div className="bg-slate-800 rounded-xl p-3 mt-2">
                  <span className="text-yellow-400 text-xs font-semibold">Tech Stack:</span>
                  <p className="text-slate-300 text-xs mt-1">{productOS.techStack}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* プロダクトの進化 */}
        <section>
          <SectionHeader
            icon={<Rocket className="w-6 h-6 text-amber-500" />}
            title="プロダクトの進化（ここが強い）"
            subtitle="これ入れると「やれば稼げる」じゃなくて「どこまでいけば稼げるか」が分かる"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
              <p className="text-xs font-bold text-slate-500 mb-2">MVP（今まで）</p>
              {['TODO', '仮説', '実行'].map((i) => (
                <p key={i} className="text-sm text-slate-600 flex items-center gap-2 mb-1">
                  <ArrowRight className="w-3 h-3 text-slate-400" />{i}
                </p>
              ))}
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl p-5 border border-orange-200">
              <p className="text-xs font-bold text-orange-600 mb-2">🔥 強化（今回追加）→ 完全に別物になる</p>
              {['結果ログ', '失敗記録', '学習履歴'].map((i) => (
                <p key={i} className="text-sm text-orange-700 flex items-center gap-2 mb-1">
                  <Star className="w-3 h-3 text-orange-500" />{i}
                </p>
              ))}
            </div>
          </div>

          {/* タスク完了率チャート */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4">日次タスク完了ログ（サンプル）</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyDataModel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Bar dataKey="tasks" name="タスク数" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="done" name="完了数" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-slate-400 mt-2 text-center">このログがそのままコンテンツ・改善素材になる</p>
          </div>
        </section>

        {/* ブランド・発信戦略 */}
        <section>
          <SectionHeader
            icon={<Users className="w-6 h-6 text-pink-500" />}
            title="ブランドとしての立ち位置"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-3">ブランド特性</h3>
              <div className="flex flex-wrap gap-2">
                {productOS.positionBrand.map((b) => (
                  <span key={b} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-3 bg-slate-50 rounded-xl">
                <p className="text-xs font-semibold text-slate-500 mb-1">あなたの強みを最大化する形</p>
                <p className="text-sm font-bold text-slate-800">「副業を研究している人」</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-3">発信戦略（投稿内容）</h3>
              <div className="space-y-2">
                {productOS.contentStrategy.map((s) => (
                  <div key={s} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <p className="text-sm text-green-800 font-medium">{s}</p>
                  </div>
                ))}
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs font-bold text-red-600 mb-1">❌ ダメ</p>
                  {['宣伝', '機能紹介'].map((d) => (
                    <p key={d} className="text-xs text-red-600">• {d}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* マネタイズ導線 */}
        <section>
          <SectionHeader
            icon={<DollarSign className="w-6 h-6 text-emerald-500" />}
            title="マネタイズ導線（最初から仕込む）"
            subtitle="MVP段階でこれだけ入れる"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: '📧', label: '「続けたい人はこちら」', desc: 'メルマガ・LINE登録', color: 'bg-blue-50 border-blue-200' },
              { icon: '💳', label: '有料機能（将来）', desc: '継続収益・プロダクト開発の延長', color: 'bg-purple-50 border-purple-200' },
              { icon: '👥', label: 'コミュニティ運営', desc: '信頼ベース・継続収益・コンテンツと相性良い', color: 'bg-emerald-50 border-emerald-200' },
            ].map((m) => (
              <div key={m.label} className={`${m.color} border rounded-2xl p-5 card-hover`}>
                <span className="text-2xl">{m.icon}</span>
                <p className="text-sm font-bold text-slate-800 mt-2">{m.label}</p>
                <p className="text-xs text-slate-500 mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-800 text-white rounded-2xl p-5">
            <p className="text-sm font-bold text-yellow-400 mb-2">BtoB小規模支援（地味だけど強い）</p>
            <p className="text-sm text-slate-300">例：店舗のSNS運用・業務効率化ツール</p>
            <p className="text-sm text-emerald-400 mt-1 font-semibold">即金性が高い</p>
          </div>
        </section>

        {/* 最後に（かなり本質） */}
        <section>
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="text-center mb-6">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl font-black mt-2">最後に（かなり本質）</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400 mb-3">あなたの状況だとこれ</p>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-rose-400">
                    → "プロダクトを作る人"じゃなくて
                  </p>
                  <p className="text-lg font-bold text-emerald-400">
                    → "意思決定を売る人"になれる
                  </p>
                </div>
                <p className="text-sm text-slate-400 mt-4">これできる人、実はかなり少ない</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-yellow-400 mb-3">初動の動き（超具体）1週間目</p>
                {[
                  { day: 'Day1', task: 'データモデル + 保存（JSON/localStorage）+ ホーム' },
                  { day: 'Day2', task: 'Sprint/Task（生成・チェック）' },
                  { day: 'Day3', task: 'DailyLog/振り返り + 要件ゲージ（固定データでOK）' },
                ].map((d) => (
                  <div key={d.day} className="flex gap-3 text-sm mb-2">
                    <span className="text-yellow-400 font-bold shrink-0 w-10">{d.day}</span>
                    <span className="text-slate-300">{d.task}</span>
                  </div>
                ))}
                <p className="text-xs text-slate-400 mt-3">ここまでで「仮説→実行→記録→学習」が回る</p>
              </div>
            </div>
            <div className="text-center mt-6 pt-6 border-t border-slate-700">
              <p className="text-lg font-bold text-white">「机上の設計」じゃなくて「実験できる状態を作る」</p>
              <p className="text-rose-400 font-bold mt-2 text-xl">これ、ほぼ勝ちパターン</p>
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-xs py-4">
          <p>副業OS / プロダクト開発戦略ダッシュボード | Built with Next.js + Recharts + Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}

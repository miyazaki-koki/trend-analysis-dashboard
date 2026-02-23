'use client';

import { useState } from 'react';
import { TrendingUp, Brain, Users, ShoppingBag, Globe, ArrowRight, ChevronDown, ChevronUp, Shield, Zap } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const structuralChanges = [
  {
    id: 'attention',
    icon: '👁',
    title: '注意（Attention）の希少化',
    description: '広告も投稿も供給過多で、見る側の体力がボトルネックに',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    id: 'trust',
    icon: '🔐',
    title: '信頼（Trust）の再設計',
    description: 'AI生成・切り抜き・炎上・詐欺で、何を信じるかが再び難しくなった',
    color: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    id: 'agency',
    icon: '🤖',
    title: '行為（Agency）の外部化',
    description: '検索・比較・制作・交渉をAIに委譲。人がやるから人が監督するへ',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
];

const globalTrends = [
  { category: 'SNS一体化', score: 85, description: 'WorkTok・ソーシャルコマース加速' },
  { category: 'AIエージェント化', score: 92, description: 'タスク分解・実行型AIへの移行' },
  { category: '信頼再設計', score: 78, description: '出所検証・透明性UXの台頭' },
  { category: '規制強化', score: 70, description: 'EU AI Act・SNS年齢規制' },
  { category: '消費文脈化', score: 80, description: 'データ最適化より体験・信頼重視' },
];

const japanTrends = [
  { category: '推し界隈化', score: 88, description: 'エンタメ消費の高熱量化' },
  { category: 'リセール文化', score: 75, description: '循環購買の標準化' },
  { category: 'アナログ回帰', score: 65, description: 'デジタル成熟の反動' },
  { category: 'インバウンド需要', score: 82, description: '内需構造の変化' },
  { category: 'コミュニティ化', score: 79, description: '社会インフラとしての界隈' },
];

const cycleData = [
  { phase: '技術ジャンプ', value: 100, fill: '#3b82f6' },
  { phase: '過剰適用', value: 85, fill: '#f59e0b' },
  { phase: '副作用可視化', value: 60, fill: '#ef4444' },
  { phase: '反動', value: 45, fill: '#8b5cf6' },
  { phase: '統合・再設計', value: 90, fill: '#10b981' },
];

const futureServices = [
  {
    type: '長命サービス',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    items: [
      '信頼を設計している（透明性・説明責任）',
      'AI×コミュニティ運営（モデレーション・暗黙知整理）',
      'ワークフローに深く刺さっている',
      '循環（リセール）を前提にできる',
      '人間の役割が明確に分かれている',
    ],
  },
  {
    type: '短命サービス',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-red-600',
    bg: 'bg-red-50',
    items: [
      '流行フォーマットだけに依存',
      '信頼を外注している',
      '解く課題が浅い（便利っぽいが必需品にならない）',
      '炎上・切り抜き依存のアテンション裁定',
      '人間サポートを削りすぎた自動化',
    ],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">トレンド分析ダッシュボード</h1>
                <p className="text-xs text-slate-500">2025〜2026年 構造変化マップ</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-blue-700">Live Analysis</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ヒーロー */}
        <section className="text-center py-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">2025〜2026年 グローバル・日本トレンド分析</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            <span className="gradient-text">注意・信頼・主体性</span>を
            <br />どう設計し直すか
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            供給過多の時代に、SNS・AI・消費・コミュニティの形を作り変える3つの構造変化
          </p>
        </section>

        {/* 3つの構造変化 */}
        <section>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" />
            0. 前提：3つの構造変化
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {structuralChanges.map((change) => (
              <div
                key={change.id}
                className={`card-hover ${change.bg} border ${change.border} rounded-2xl p-6 cursor-pointer`}
              >
                <div className="text-4xl mb-4">{change.icon}</div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{change.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{change.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* トレンドスコア */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              世界のトレンドスコア
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={globalTrends}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="スコア" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              日本のトレンドスコア
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={japanTrends}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="スコア" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 循環パターン */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            技術進化の循環パターン
          </h3>
          <p className="text-slate-500 text-sm mb-6">技術ジャンプ → 過剰適用 → 副作用可視化 → 反動 → 統合</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cycleData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="phase" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} name="強度" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: '現在の反動例', items: ['未成年SNS規制強化', '組織によるAI利用制限', '日本のアナログ志向増加'] },
              { label: '大きい波', items: ['10〜15年周期', '90sネット→00sSNS→10sスマホ', 'AIは期間を短縮'] },
              { label: '小さい波', items: ['2〜4年周期', 'フォーマット・プラットフォーム', '反動も同速度で来る'] },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">{item.label}</p>
                {item.items.map((i) => (
                  <p key={i} className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-slate-400 inline-block" />
                    {i}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* 長命・短命サービス */}
        <section>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-amber-500" />
            ビジネス観点：長命 vs 短命
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureServices.map((service) => (
              <div
                key={service.type}
                className={`${service.bg} rounded-2xl p-6 border ${service.type === '長命サービス' ? 'border-emerald-200' : 'border-red-200'}`}
              >
                <div className={`flex items-center gap-2 mb-4 ${service.color}`}>
                  {service.icon}
                  <h4 className="text-lg font-bold">{service.type}</h4>
                </div>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <ArrowRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${service.color}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">2025〜2026 キーメッセージ</h3>
          <p className="text-2xl font-light leading-relaxed max-w-3xl mx-auto">
            「供給過多の時代に、<strong className="font-bold">注意</strong>と<strong className="font-bold">信頼</strong>と<strong className="font-bold">主体性</strong>をどう設計し直すか」
          </p>
          <p className="mt-4 text-blue-200 text-sm">
            ここに乗っているものは残り、外しているものは一時の流行で終わりやすい
          </p>
        </section>

        {/* フッター */}
        <footer className="text-center text-slate-400 text-sm py-4">
          <p>トレンド分析ダッシュボード 2025-2026 | Built with Next.js + Recharts + Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}

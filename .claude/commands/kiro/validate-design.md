---
description: Interactive technical design quality review and validation
allowed-tools: Bash, Read, Glob, Grep, Skill, WebSearch, WebFetch, mcp__context7__*
argument-hint: <feature-name>
---

# Technical Design Validation

<background_information>
- **Mission**: Conduct interactive quality review of technical design to ensure readiness for implementation
- **Success Criteria**:
  - Critical issues identified (maximum 3 most important concerns)
  - Balanced assessment with strengths recognized
  - Clear GO/NO-GO decision with rationale
  - Actionable feedback for improvements if needed
</background_information>

<instructions>
## Core Task
Interactive design quality review for feature **$1** based on approved requirements and design document.

## Execution Steps

1. **Load Context**:
   - Read `.kiro/specs/$1/spec.json` for language and metadata
   - Read `.kiro/specs/$1/requirements.md` for requirements
   - Read `.kiro/specs/$1/design.md` for design document
   - **Load ALL steering context**: Read entire `.kiro/steering/` directory including:
     - Default files: `structure.md`, `tech.md`, `product.md`
     - All custom steering files (regardless of mode settings)
     - This provides complete project memory and context

2. **Read Review Guidelines**:
   - Read `.kiro/settings/rules/design-review.md` for review criteria and process

3. **Execute Design Review**:
   - Follow design-review.md process: Analysis → Critical Issues → Strengths → GO/NO-GO
   - Limit to 3 most important concerns
   - Engage interactively with user
   - Use language specified in spec.json for output

4. **Codex CLI Review (External AI Review)**:

   Execute automated design review using Codex CLI for additional perspective.

   **IMPORTANT: You MUST use the Skill tool to invoke codex-review or codex-exec skills. Do NOT call codex CLI directly via Bash.**

   **Step 4.1: Check for changes to design.md**

   Run `git diff --name-only develop` and check if `.kiro/specs/$1/design.md` is included in the changes.

   **Step 4.2: Select appropriate skill based on git diff**

   - **If design.md has changes in git diff** → Invoke `/codex-review` skill with `--base develop`
   - **If design.md has no changes** → Invoke `/codex-exec` skill with review prompt

   **Step 4.3: Invoke the selected skill via Skill tool**

   Use the Skill tool (not Bash) to call the appropriate skill:

   For codex-review (when design.md has changes):
   - Skill name: `codex-review`
   - Arguments: `--base develop`

   For codex-exec (when no changes):
   - Skill name: `codex-exec`
   - Arguments: `"Review this technical design document for quality. Check: Architecture Soundness, Component Clarity, Type Safety, Integration Points, Risk Assessment. Provide findings with severity (Critical/Warning/Info)."`

   **Process Results**:
   - Add to review under "External AI Review" section
   - Note: Codex review complements but does not replace interactive review

   **If skill fails or Codex CLI unavailable**:
   - Note in report: "External AI review skipped"
   - Continue with interactive review process

5. **Multi-Perspective Analysis (複合レビュー)**:

   Codex CLI結果を受けて、複数の観点から統合的な分析を実行する。

   **Step 5.1: Codex指摘の検証**

   Codexが指摘した設計上の問題について、外部情報で裏付けを取る:
   - **Context7 MCP**: `mcp__context7__query-docs`でライブラリ公式ドキュメントを確認
   - **WebSearch**: アーキテクチャパターンの最新ベストプラクティスを調査
   - 指摘の妥当性評価

   **Step 5.2: Claude独自分析**

   Codexが見逃した可能性のある観点を補完:
   - CC-SDD仕様（requirements.md）との整合性を深掘り
   - steering/のプロジェクト規約との適合性
   - 既存コードベースのアーキテクチャパターンとの一貫性

   **Step 5.3: 統合評価**

   3つの観点を統合したレポートを作成:
   - **Codex指摘**: 外部AIの客観的レビュー
   - **調査結果**: Context7/WebSearchでの裏付け
   - **Claude分析**: プロジェクト文脈を踏まえた評価
   - 各観点で一致した問題は信頼度が高い
   - 観点間で矛盾がある場合は根拠を明記

6. **Provide Decision and Next Steps**:
   - Clear GO/NO-GO decision with rationale
   - Include Codex findings in decision rationale if available
   - Guide user on proceeding based on decision

## Important Constraints
- **Quality assurance, not perfection seeking**: Accept acceptable risk
- **Critical focus only**: Maximum 3 issues, only those significantly impacting success
- **Interactive approach**: Engage in dialogue, not one-way evaluation
- **Balanced assessment**: Recognize both strengths and weaknesses
- **Actionable feedback**: All suggestions must be implementable
</instructions>

## Tool Guidance
- **Read first**: Load all context (spec, steering, rules) before review
- **Grep if needed**: Search codebase for pattern validation or integration checks
- **Interactive**: Engage with user throughout the review process

## Output Description
Provide output in the language specified in spec.json with:

1. **Review Summary**: Brief overview (2-3 sentences) of design quality and readiness
2. **Critical Issues**: Maximum 3, following design-review.md format
3. **Design Strengths**: 1-2 positive aspects
4. **Multi-Perspective Analysis**: 統合レビュー結果
   - Codex指摘: 外部AIレビュー結果
   - 調査結果: Context7 MCP / WebSearchでの裏付け
   - Claude分析: プロジェクト文脈を踏まえた評価
5. **Final Assessment**: GO/NO-GO decision with rationale and next steps

**Format Requirements**:
- Use Markdown headings for clarity
- Follow design-review.md output format
- Keep summary concise

## Safety & Fallback

### Error Scenarios
- **Missing Design**: If design.md doesn't exist, stop with message: "Run `/kiro:spec-design $1` first to generate design document"
- **Design Not Generated**: If design phase not marked as generated in spec.json, warn but proceed with review
- **Empty Steering Directory**: Warn user that project context is missing and may affect review quality
- **Language Undefined**: Default to English (`en`) if spec.json doesn't specify language

### Next Phase: Task Generation

**If Design Passes Validation (GO Decision)**:
- Review feedback and apply changes if needed
- Run `/kiro:spec-tasks $1` to generate implementation tasks
- Or `/kiro:spec-tasks $1 -y` to auto-approve and proceed directly

**If Design Needs Revision (NO-GO Decision)**:
- Address critical issues identified
- Re-run `/kiro:spec-design $1` with improvements
- Re-validate with `/kiro:validate-design $1`

**Note**: Design validation is recommended but optional. Quality review helps catch issues early.

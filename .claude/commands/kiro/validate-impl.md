---
description: Validate implementation against requirements, design, and tasks
allowed-tools: Bash, Glob, Grep, Read, LS, Skill, WebSearch, WebFetch, mcp__context7__*
argument-hint: [feature-name] [task-numbers]
---

# Implementation Validation

<background_information>
- **Mission**: Verify that implementation aligns with approved requirements, design, and tasks
- **Success Criteria**:
  - All specified tasks marked as completed
  - Tests exist and pass for implemented functionality
  - Requirements traceability confirmed (EARS requirements covered)
  - Design structure reflected in implementation
  - No regressions in existing functionality
</background_information>

<instructions>
## Core Task
Validate implementation for feature(s) and task(s) based on approved specifications.

## Execution Steps

### 1. Detect Validation Target

**If no arguments provided** (`$1` empty):
- Parse conversation history for `/kiro:spec-impl <feature> [tasks]` commands
- Extract feature names and task numbers from each execution
- Aggregate all implemented tasks by feature
- Report detected implementations (e.g., "user-auth: 1.1, 1.2, 1.3")
- If no history found, scan `.kiro/specs/` for features with completed tasks `[x]`

**If feature provided** (`$1` present, `$2` empty):
- Use specified feature
- Detect all completed tasks `[x]` in `.kiro/specs/$1/tasks.md`

**If both feature and tasks provided** (`$1` and `$2` present):
- Validate specified feature and tasks only (e.g., `user-auth 1.1,1.2`)

### 2. Load Context

For each detected feature:
- Read `.kiro/specs/<feature>/spec.json` for metadata
- Read `.kiro/specs/<feature>/requirements.md` for requirements
- Read `.kiro/specs/<feature>/design.md` for design structure
- Read `.kiro/specs/<feature>/tasks.md` for task list
- **Load ALL steering context**: Read entire `.kiro/steering/` directory including:
  - Default files: `structure.md`, `tech.md`, `product.md`
  - All custom steering files (regardless of mode settings)

### 3. Execute Validation

For each task, verify:

#### Task Completion Check
- Checkbox is `[x]` in tasks.md
- If not completed, flag as "Task not marked complete"

#### Test Coverage Check
- Tests exist for task-related functionality
- Tests pass (no failures or errors)
- Use Bash to run test commands (e.g., `npm test`, `pytest`)
- If tests fail or don't exist, flag as "Test coverage issue"

#### Requirements Traceability
- Identify EARS requirements related to the task
- Use Grep to search implementation for evidence of requirement coverage
- If requirement not traceable to code, flag as "Requirement not implemented"

#### Design Alignment
- Check if design.md structure is reflected in implementation
- Verify key interfaces, components, and modules exist
- Use Grep/LS to confirm file structure matches design
- If misalignment found, flag as "Design deviation"

#### Regression Check
- Run full test suite (if available)
- Verify no existing tests are broken
- If regressions detected, flag as "Regression detected"

### 4. Codex CLI Review (External AI Review)

Execute automated code review using Codex CLI for additional perspective.

**IMPORTANT: You MUST use the Skill tool to invoke codex-review or codex-exec skills. Do NOT call codex CLI directly via Bash.** Using skills ensures CC-SDD spec context (design.md, tasks.md, requirements.md) is properly loaded.

**Step 4.1: Check for changes**

Run `git diff --name-only develop` (or the appropriate base branch) to check if there are file changes.

**Step 4.2: Select appropriate skill based on git diff**

- **If changes exist in git diff** → Invoke `/codex-review` skill with `--spec $FEATURE`
  - The skill loads CC-SDD context and executes codex review

- **If no changes in git diff** → Invoke `/codex-exec` skill with review prompt
  - The skill executes codex exec for analysis without diff

**Step 4.3: Invoke the selected skill via Skill tool**

Use the Skill tool (not Bash) to call the appropriate skill:

For codex-review (when changes exist):
- Skill name: `codex-review`
- Arguments: `--spec $FEATURE`

For codex-exec (when no diff):
- Skill name: `codex-exec`
- Arguments: `"Review the implementation for feature '$FEATURE'. Check: code quality, type safety, error handling, test coverage. Provide findings with severity (Critical/Warning/Info)."`

**Process Results**:
- Incorporate Codex findings into the validation report
- Add to "External Review" section
- Categorize by severity (Critical/Warning/Info)

**If skill fails or Codex CLI unavailable**:
- Note in report: "External AI review skipped"
- Continue with other validation steps

### 5. Multi-Perspective Analysis (複合レビュー)

Codex CLI結果を受けて、複数の観点から統合的な分析を実行する。

**Step 5.1: Codex指摘の検証**

Codexが指摘した問題について、外部情報で裏付けを取る:
- **Context7 MCP**: `mcp__context7__query-docs`でライブラリ公式ドキュメントを確認
- **WebSearch**: 最新のベストプラクティスや類似事例を調査
- 誤検知（false positive）の可能性を評価

**Step 5.2: Claude独自分析**

Codexが見逃した可能性のある観点を補完:
- CC-SDD仕様（design.md, requirements.md）との整合性を深掘り
- steering/のプロジェクト規約との適合性
- 既存コードベースのパターンとの一貫性（Grepで確認）

**Step 5.3: 統合評価**

3つの観点を統合したレポートを作成:
- **Codex指摘**: 外部AIの客観的レビュー
- **調査結果**: Context7/WebSearchでの裏付け
- **Claude分析**: プロジェクト文脈を踏まえた評価
- 各観点で一致した問題は信頼度が高い
- 観点間で矛盾がある場合は根拠を明記

### 6. Generate Report

Provide summary in the language specified in spec.json:
- Validation summary by feature
- Coverage report (tasks, requirements, design)
- **Codex Review findings** (if available)
- Issues and deviations with severity (Critical/Warning)
- GO/NO-GO decision

## Important Constraints
- **Conversation-aware**: Prioritize conversation history for auto-detection
- **Non-blocking warnings**: Design deviations are warnings unless critical
- **Test-first focus**: Test coverage is mandatory for GO decision
- **Traceability required**: All requirements must be traceable to implementation
</instructions>

## Tool Guidance
- **Conversation parsing**: Extract `/kiro:spec-impl` patterns from history
- **Read context**: Load all specs and steering before validation
- **Bash for tests**: Execute test commands to verify pass status
- **Grep for traceability**: Search codebase for requirement evidence
- **LS/Glob for structure**: Verify file structure matches design

## Output Description

Provide output in the language specified in spec.json with:

1. **Detected Target**: Features and tasks being validated (if auto-detected)
2. **Validation Summary**: Brief overview per feature (pass/fail counts)
3. **Multi-Perspective Analysis**: 統合レビュー結果
   - Codex指摘: 外部AIレビュー結果
   - 調査結果: Context7 MCP / WebSearchでの裏付け
   - Claude分析: プロジェクト文脈を踏まえた評価
4. **Issues**: List of validation failures with severity and location
5. **Coverage Report**: Requirements/design/task coverage percentages
6. **Decision**: GO (ready for next phase) / NO-GO (needs fixes)

**Format Requirements**:
- Use Markdown headings and tables for clarity
- Flag critical issues with ⚠️ or 🔴
- Keep summary concise (under 400 words)

## Safety & Fallback

### Error Scenarios
- **No Implementation Found**: If no `/kiro:spec-impl` in history and no `[x]` tasks, report "No implementations detected"
- **Test Command Unknown**: If test framework unclear, warn and skip test validation (manual verification required)
- **Missing Spec Files**: If spec.json/requirements.md/design.md missing, stop with error
- **Language Undefined**: Default to English (`en`) if spec.json doesn't specify language

### Next Steps Guidance

**If GO Decision**:
- Implementation validated and ready
- Proceed to deployment or next feature

**If NO-GO Decision**:
- Address critical issues listed
- Re-run `/kiro:spec-impl <feature> [tasks]` for fixes
- Re-validate with `/kiro:validate-impl [feature] [tasks]`

**Note**: Validation is recommended after implementation to ensure spec alignment and quality.

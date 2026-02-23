---
description: Simplify and refine code for clarity and maintainability
allowed-tools: Bash, Read, Write, Edit, MultiEdit, Grep, Glob, LS, Task
argument-hint: [feature-name or file-path]
---

# Code Simplifier

<background_information>
- **Mission**: Simplify code to improve readability, consistency, and maintainability
- **Success Criteria**:
  - All functionality is preserved
  - Code is more readable and organized
  - Unnecessary complexity is removed
  - Project coding standards are followed
</background_information>

<instructions>
## Core Task
Simplify and organize code for the specified feature or file.

## Execution Steps

### Step 1: Identify Target

**Interpret argument**:
- If `$1` is a feature name: target files related to `.kiro/specs/$1/` design
- If `$1` is a file path: target that specific file
- If `$1` is empty: target recently modified files

### Step 2: Load Context

**Load necessary context**:
- Entire `.kiro/steering/` (project coding standards)
- Current content of target file
- Related test files

### Step 3: Execute Code Simplification

**Start simplification process**:

Use these perspectives for simplification:

1. **Remove Unnecessary Code**
   - Unused variables, functions, imports
   - Commented-out code
   - Duplicate logic

2. **Improve Structure**
   - Split long functions
   - Reduce nesting depth
   - Use early returns

3. **Enhance Readability**
   - Appropriate naming
   - Consistent formatting
   - Simplify complex conditional expressions

4. **Follow Project Standards**
   - Unify coding style
   - Use proper type definitions
   - Apply consistent error handling patterns

### Step 4: Validate

**Verify after simplification**:
- All tests pass
- Functionality is preserved
- Lint/type checking passes

## Simplification Aspects

1. **Unnecessary Code Removal**
   - Unused variables, functions, imports
   - Commented-out code
   - Redundant logic

2. **Structure Improvement**
   - Break down long functions
   - Reduce nesting levels
   - Use early returns when appropriate

3. **Readability Enhancement**
   - Clear and descriptive naming
   - Consistent code formatting
   - Simplify complex expressions

4. **Project Standards Compliance**
   - Code style consistency
   - Proper type definitions
   - Unified error handling

</instructions>

## Output Description

Report simplification results:

1. **Target Files**: List of files processed
2. **Changes Made**: Main simplification and improvements
3. **Validation Results**: Test and lint results

**Format**: Concise (under 150 words)

## Usage Examples

```
/kiro:code-simplify dashboard-feature
/kiro:code-simplify src/components/DataTable.tsx
/kiro:code-simplify
```

think

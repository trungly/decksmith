# PR CodeRabbit Finisher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable user-level Cursor subagent that marks GitHub PRs ready, waits for CodeRabbit review, fixes worthwhile feedback, and pushes follow-up commits.

**Architecture:** Keep the implementation as a single custom subagent markdown file in `~/.cursor/agents/`. The repo changes are limited to planning and spec documentation; the operational behavior lives in the user-level agent prompt, which uses `gh` and local git commands at runtime.

**Tech Stack:** Cursor custom subagents, Markdown frontmatter, GitHub CLI, git

---

### Task 1: Finalize the implementation plan artifact

**Files:**
- Create: `docs/superpowers/plans/2026-04-16-pr-coderabbit-finisher.md`
- Modify: `docs/superpowers/specs/2026-04-16-pr-coderabbit-finisher-design.md`
- Test: none

- [ ] **Step 1: Save the plan file**

Write this file with the approved user-level scope and implementation notes.

- [ ] **Step 2: Re-read the spec to confirm alignment**

Run: `sed -n '1,220p' docs/superpowers/specs/2026-04-16-pr-coderabbit-finisher-design.md`
Expected: the spec states the agent lives at `~/.cursor/agents/pr-coderabbit-finisher.md`

- [ ] **Step 3: Commit planning docs later with the implementation commit**

Run: `git add docs/superpowers/plans/2026-04-16-pr-coderabbit-finisher.md docs/superpowers/specs/2026-04-16-pr-coderabbit-finisher-design.md`
Expected: the plan and revised spec are staged together for one documentation commit

### Task 2: Create the user-level subagent

**Files:**
- Create: `~/.cursor/agents/pr-coderabbit-finisher.md`
- Test: `~/.cursor/agents/pr-coderabbit-finisher.md`

- [ ] **Step 1: Create the agents directory**

Run: `mkdir -p ~/.cursor/agents`
Expected: `~/.cursor/agents` exists

- [ ] **Step 2: Write the subagent file**

Create the file with this frontmatter and prompt:

```markdown
---
name: pr-coderabbit-finisher
description: GitHub PR follow-up specialist. Use proactively after creating a PR on GitHub.com when you want the agent to mark the PR ready, wait for CodeRabbit review, evaluate the feedback, fix the worthwhile issues, commit, and push the follow-up changes.
---

You are a focused GitHub PR follow-up specialist.

Your job is to take an existing GitHub pull request from "created" to "review-follow-up complete" with minimal user supervision.

Operate autonomously, but do not guess. If a blocker prevents safe progress, stop and report it clearly.

## Primary workflow
1. Identify the current git branch and verify the working tree is safe to modify.
2. Locate the open PR for the current branch with `gh pr view` or `gh pr list`.
3. If no PR exists, stop and report that no PR is open for the branch.
4. If the PR is draft, run `gh pr ready`.
5. Poll GitHub until CodeRabbit has posted its review comments, or stop after a reasonable timeout.
6. Gather all CodeRabbit review comments and summarize them by type and severity.
7. Evaluate each finding against the actual code and repository conventions.
8. Fix only the comments that are correct, worthwhile, and in scope for the PR.
9. Run the smallest relevant verification for the changes made.
10. Create a new commit and push the branch.
11. Report what was fixed, what was skipped, why, and what verification ran.

## Review triage rules
- Accept findings that identify real bugs, regression risks, missing validation, meaningful maintainability issues, or focused missing tests.
- Skip findings that are incorrect, stale, purely stylistic, outside repository conventions, or would create scope creep.
- Treat CodeRabbit as advisory, not authoritative.

## Git and safety rules
- Never change git config.
- Never use destructive git commands.
- Avoid unrelated files and unrelated refactors.
- Create a new commit instead of amending unless the user explicitly asks for amend behavior.
- Stop if authentication, permissions, or branch state prevent safe progress.
- Stop if local unrelated changes make safe edits unclear.

## CodeRabbit detection guidance
- Use `gh pr view`, `gh pr checks`, `gh api`, and PR comment/review endpoints as needed.
- Look specifically for review comments or reviews authored by CodeRabbit.
- Poll incrementally rather than sleeping for long periods.
- If CodeRabbit never posts within the timeout window, stop and report that clearly.

## Output format
Return results in this structure:

1. PR Status
- PR number/title and whether it was moved out of draft

2. Findings Reviewed
- Concise list of CodeRabbit findings considered

3. Fixes Applied
- What was changed and why

4. Findings Skipped
- What was skipped and the reason

5. Verification
- Commands run and whether they passed

6. Push Result
- Commit summary and push status
```

- [ ] **Step 3: Verify the file contents**

Run: `sed -n '1,240p' ~/.cursor/agents/pr-coderabbit-finisher.md`
Expected: valid YAML frontmatter followed by the workflow and safety sections above

### Task 3: Validate and publish repo-side changes

**Files:**
- Modify: `docs/superpowers/specs/2026-04-16-pr-coderabbit-finisher-design.md`
- Create: `docs/superpowers/plans/2026-04-16-pr-coderabbit-finisher.md`
- Test: repo diff only

- [ ] **Step 1: Check git status**

Run: `git status --short`
Expected: the revised spec and new plan file are present; the user-level agent file is not part of the repo

- [ ] **Step 2: Review the repo diff**

Run: `git diff -- docs/superpowers/specs/2026-04-16-pr-coderabbit-finisher-design.md docs/superpowers/plans/2026-04-16-pr-coderabbit-finisher.md`
Expected: the spec reflects user-level scope and the new plan file is present

- [ ] **Step 3: Commit repo changes**

Run: `git add docs/superpowers/specs/2026-04-16-pr-coderabbit-finisher-design.md docs/superpowers/plans/2026-04-16-pr-coderabbit-finisher.md && git commit -m "docs: finalize CodeRabbit finisher setup"`
Expected: one new commit containing only the spec revision and the implementation plan

- [ ] **Step 4: Push the branch**

Run: `git push origin HEAD`
Expected: the commit is pushed successfully

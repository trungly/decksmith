# PR CodeRabbit Finisher Design

## Goal

Create a user-level Cursor subagent that can autonomously finish the post-PR-review loop for PRs it created, or PRs it is explicitly told to manage. The subagent should take a newly created GitHub pull request out of draft mode, wait for the installed GitHub review agent CodeRabbit to finish reviewing, evaluate the review findings, apply only the worthwhile fixes, and push a follow-up commit.

## Scope

In scope:

- A user-level custom subagent stored in `~/.cursor/agents/`
- A focused system prompt that defines the workflow, constraints, and output format
- GitHub CLI driven PR inspection and status updates
- CodeRabbit review collection and evaluation
- Code fixes, targeted verification, commit, and push for accepted findings

Out of scope:

- General PR creation logic
- Broad CI babysitting beyond the CodeRabbit review pass
- Auto-resolving every review comment without judgment
- Large refactors or product decisions triggered by review feedback

## User Story

As a developer using Cursor, I want a reusable user-level subagent that I can invoke after creating a GitHub PR so the agent can move the PR out of draft, wait for CodeRabbit, judge which review comments are worth fixing, implement those fixes, and push the result without requiring step-by-step supervision.

## Success Criteria

The solution is successful when:

1. The subagent is discoverable by Cursor as a user-level custom agent.
2. The subagent can identify the active PR for the current branch, or fail clearly if none exists.
3. The subagent marks a draft PR as ready for review.
4. The subagent waits for CodeRabbit to complete rather than acting on partial or missing feedback.
5. The subagent evaluates CodeRabbit comments using repo context instead of blindly applying every suggestion.
6. The subagent applies only relevant, low-risk, clearly justified fixes.
7. The subagent runs relevant verification when practical.
8. The subagent creates a follow-up commit and pushes it.
9. The subagent reports what it fixed, what it skipped, and any blockers.

## Proposed Location

- Subagent file: `~/.cursor/agents/pr-coderabbit-finisher.md`

## Subagent Metadata

Recommended frontmatter:

```yaml
---
name: pr-coderabbit-finisher
description: GitHub PR follow-up specialist. Use proactively after creating a PR on GitHub.com when you want the agent to mark the PR ready, wait for CodeRabbit review, evaluate the feedback, fix the worthwhile issues, commit, and push the follow-up changes.
---
```

This description is intentionally explicit so Cursor knows when delegation is appropriate.

## Workflow

The subagent should execute this sequence:

1. Confirm repository state and current branch.
2. Locate the open PR associated with the current branch using `gh`.
3. If no PR exists, stop and report the blocker.
4. If the PR is in draft mode, run `gh pr ready`.
5. Poll GitHub for CodeRabbit review completion.
6. Gather CodeRabbit review comments and group them by theme or severity.
7. Evaluate each finding against the actual code and project conventions.
8. Select only the findings that are:
   - correct
   - actionable without broader product decisions
   - low to moderate risk
   - worth fixing within the current PR scope
9. Implement the chosen fixes.
10. Run relevant tests or checks when practical for the changed area.
11. Stage the changes, create a new commit, and push to the PR branch.
12. Return a concise summary of:
   - PR handled
   - CodeRabbit findings accepted
   - findings skipped with reasons
   - verification performed
   - commit created and push result

## CodeRabbit Completion Strategy

Because CodeRabbit may take time to post and finish its review, the subagent should:

- poll the PR timeline and review comments via `gh`
- wait for evidence that CodeRabbit has posted review output
- prefer incremental polling with a reasonable timeout window
- stop and report if CodeRabbit does not appear after the timeout instead of waiting forever

The subagent should treat "CodeRabbit has posted the actionable review comments for this PR" as the completion signal. It does not need to wait for unrelated CI checks unless those checks are necessary to validate its own fixes.

## Review Evaluation Rules

The subagent should not assume CodeRabbit is always correct. It should use these rules:

Accept feedback when it:

- identifies a real bug or regression risk
- catches missing validation, error handling, or edge cases
- calls out meaningful maintainability problems in touched code
- points to missing or weak tests where a focused test adds value
- has a clear, local fix consistent with the codebase

Skip feedback when it:

- is purely stylistic noise with no meaningful value
- conflicts with existing project conventions
- is outdated because the code has already changed
- requires a broader architectural or product decision
- would introduce scope creep disproportionate to the PR
- appears incorrect after checking the code

## Safety Rules

The subagent should:

- act autonomously for routine PR follow-up steps
- avoid destructive git commands
- avoid changing git config
- create a new commit instead of amending unless explicitly instructed otherwise
- stop when authentication, permissions, or GitHub state prevents safe progress
- stop when review feedback is ambiguous or high-risk
- avoid touching unrelated files

## Verification Strategy

The subagent should choose the smallest relevant verification for the accepted fixes:

- targeted tests when available
- repository lint/typecheck/build commands when the change area warrants them
- manual reasoning only when no practical automated check exists

The subagent should report what it verified and what it could not verify.

## Error Handling

The subagent should stop and report rather than improvise when:

- no PR exists for the current branch
- `gh` authentication is missing or invalid
- the remote branch is missing or not pushable
- CodeRabbit never posts review output within the timeout
- the suggested fixes require human product judgment
- local changes unrelated to the task make safe edits unclear

## Implementation Notes

This should be implemented as a single custom subagent file with a strong system prompt rather than a script-backed workflow. That keeps the setup lightweight, reusable across repositories, and easy to tweak without adding extra runtime dependencies.

The prompt should instruct the subagent to use GitHub CLI for PR inspection and updates, analyze review feedback critically, and communicate accepted versus skipped suggestions clearly.

## Open Decisions Resolved

- Scope: user-level
- Autonomy: fully autonomous for routine review handling
- Architecture: one focused subagent, not a coordinator stack

## Implementation Plan Preview

When implementation begins, the expected steps are:

1. Add `~/.cursor/agents/pr-coderabbit-finisher.md`
2. Validate the agent prompt for clarity and trigger quality
3. Optionally test by invoking the agent against a PR workflow

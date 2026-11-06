# Local runtime and evidence

Use these examples when a local review needs a reproducible runtime or a private, persistent ledger. They illustrate reporting choices; they are not executed test evidence or requirements for a particular application.

## Select the intended environment

Read the project's instructions, dependency declarations and test commands. Prefer its existing environment over an unrelated interpreter on the machine. Record the runtime actually used, relevant dependency versions and fixture configuration.

For example, a Python project may document `.venv` while the system `python` lacks a required package. Check the existing environment before calling the application test unavailable or proposing an installation. A Node.js project may specify its version through a manifest or version file. Do not create a new environment or upgrade dependencies merely to make the review look successful; keep any necessary setup within the user's authorized scope.

## Describe how far a check reached

An illustrative local suite exits with code 0:

| Check | What happened | What the ledger can say |
| --- | --- | --- |
| T01 | Target called; the relevant assertion completed and met a sourced expectation. | No issue observed for that claim and fixture. |
| T02 | Fixture creation was attempted but blocked; the target and assertion did not run. | Inconclusive attempt; name the missing prerequisite and next check. |
| P01 | A timing value was measured, but no allowed deadline was specified. | Measured observation; the expectation remains open. Do not invent a finding or mark the behavior acceptable. |

For structured evidence, separate `attempted`, `target_reached` and `assertion_executed` rather than using one ambiguous `executed` flag. Use `null` or an explicit not-applicable value for fields that do not describe a source inspection or observation-only probe. Record the result separately: reaching an assertion does not mean it passed.

A skipped test is not a completed security check. A passing test against a code-derived hypothesis records that comparison, not independent confirmation of the product's intended behavior. Manual checks should likewise identify the expected and observed values and whether the comparison completed.

## Store private reviews deliberately

When persistent output is requested, use the project's existing authorized review location. If there is none, choose and state a suitable project-local location. A possible layout is:

```text
.local/security-reviews/<scope>/
  review.md
  checks/
    <versioned-or-preserved-procedure>
  evidence/
    <attempt-id>-<timestamp>.<format>
```

Use the repository's established exclusion mechanism for local-only material. Verify the actual result, for example:

```sh
git check-ignore -v -- .local/security-reviews/<scope>/review.md
```

Also check whether any review files are already tracked: ignore rules do not remove tracked files. An ignore entry helps avoid accidental staging; it does not provide access control, encryption or backup. State whether preservation is local-only or uses an authorized private versioned location. Do not send private findings to a public skill repository as feedback.

Keep one canonical ledger for the scope. Append attempts with distinct evidence files, retain old findings and preserve the procedure used for each run. A committed procedure can be identified by its revision; an uncommitted helper can be kept as an immutable copy with a digest. A digest alone identifies bytes but cannot recover an overwritten script.

When the runtime, rule or application changes, keep the earlier result attached to its original target. Mark the affected current scenario for recheck and add the new result. Keep repair proposals separate; close a finding only after a corrective change and an appropriate recheck are recorded.

# Security review ledger — <feature>

Review date, target revision or content digest, working-tree changes and environment: <values>.
Scope and entry point: <asset, actor, boundary>.
Expected behavior and its source: <requirement, decision or named assumption>.
Exclusions and assumptions: <where this review stops>.
Storage and preservation: <conversation or authorized file location; evidence naming and retained procedure versions>.

## Requirements and hypotheses

| ID | Expected behavior or open question | Source and authority |
| --- | --- | --- |
| <R-ID / H-ID> | <observable rule, or explicitly unresolved expectation> | <requirement, owner decision, or code-derived hypothesis> |

## Scenario matrix

For multiple scenarios, use this index; keep the full evidence in the records below.

| Scenario | Expectation reference | Current state | Latest attempt / evidence | Remaining gap |
| --- | --- | --- | --- | --- |
| <SR-ID link> | <R-ID / H-ID> | <state> | <attempt ID, method and evidence link> | <gap link or none identified within bounds> |

## Checks performed

| Scenario / attempt | Procedure, named test or manual check | Execution reached | Actual outcome and evidence | Bounds |
| --- | --- | --- | --- | --- |
| <SR-ID / A1> | <method and test name> | <attempt started; target reached; assertion/comparison completed; or not applicable> | <observed result, evidence reference> | <cases and environment covered> |

If counts help, report completed comparisons, blocked/skipped checks and observations with unresolved expectations separately. Counts do not measure security coverage.

## Known gaps and follow-up

| Scenario | Open question or unresolved finding | Why open and why it matters | Priority and next check |
| --- | --- | --- | --- |
| <SR-ID> | <precise scenario, origin> | <blocker, possible impact> | <priority, concrete procedure> |

## Scenario records

### <SR-ID> — <short title>

- **Current state** <one state from the skill>.
- **Basis and impact** <source of expectation or labeled hypothesis, affected actor or asset>.
- **Expected** <observable condition, input and expected result>.
- **History** <append attempts without overwriting earlier evidence>.
  - <A1, date, target revision and relevant environment>. <Method, command/run ID or exact manual steps, test names and inputs>. <Attempt/target/comparison status, observed result, sanitized evidence and procedure-version reference, limit>.
- **Open work** <remaining portion or finding, prerequisite, proposed check, recheck trigger>.

## Next checks

1. <highest-impact feasible next check and why>

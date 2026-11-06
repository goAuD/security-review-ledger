# Recipe read — security review ledger

**Review run** 2026-11-06 07:37 UTC. Node.js v24.22.1, Linux x64, built-in Fetch API and test runner. The unit under review is the in-process [recipe handler](read-recipe.mjs). Kitchen A's synthetic member requested both kitchens' records. [Requirement R1](requirement.md) defines the acceptable status and JSON body. Deployment, login, timing differences and a real HTTP cache were outside the run.

**Reviewed snapshot** SHA-256 of the file bytes (LF line endings). These identifiers apply even when the surrounding repository or this report changes.

| File | SHA-256 |
| --- | --- |
| [requirement.md](requirement.md) | `2987662ba6b6edb3b2cbfd4f95bd30a14fceda81ae685b97d0ce08d286089e29` |
| [read-recipe.mjs](read-recipe.mjs) | `4a71fded565828d85a44fe33f3c639444e54421c74ee8e8be9a2dbe8d5be4ce2` |
| [read-recipe.test.mjs](read-recipe.test.mjs) | `1db635c7b80913c21fe3e427f688d1cdee9213736d2b52ded4a50a8f491aeb32` |

**Run A1** From the repository root, `node --test --test-reporter=tap examples/recipe-access/read-recipe.test.mjs` exited with code 0. All three named cases executed. See the [test assertions](read-recipe.test.mjs) and the [captured TAP output](evidence/run.tap). Each attempt below refers to this revision, environment and run.

## Checks performed

| Scenario / attempt | Procedure and test | Actual outcome | Bounds |
| --- | --- | --- | --- |
| [SR-001](#sr-001) / A1 | T01, member A reads record r1 owned by A | 200 and the specified recipe fields | One allowed actor/record pair |
| [SR-002](#sr-002) / A1 | T02, member A requests B's r2 with forged query and header, then an absent ID | Both responses had status 404 and the same error JSON | Direct handler, status and parsed JSON only |
| [SR-003](#sr-003) / A1 | T03, null session requests A's real r1 | 401 and the specified error JSON | One anonymous request |

## Known gaps and follow-up

| Scenario | Open question and origin | Why still open and why it matters | Priority and next check |
| --- | --- | --- | --- |
| [SR-004](#sr-004) | Which kitchen does a real request's session authenticate? Raised by the session parameter in the handler. | The fixture injects its own session. A forged identity upstream could invalidate the handler's decision. | High. Exercise the login and routing boundary with two synthetic accounts when there is an adapter. |
| [SR-005](#sr-005) | Can one kitchen receive another kitchen's cached response? Raised by the repeated URL and deployment boundary. | The fixture runs without a shared cache. Its response headers alone cannot establish the deployed cache behavior. | Conditional on deployment with a cache. Issue two requests to the same URL through the real test cache under different sessions. |

## Scenario records

### SR-001

**no-issue-observed.** R1 grants access to the owning kitchen. Expected a 200 response for A reading r1 and just the recipe ID and title. In A1, T01 asserted the exact body `{"id":"r1","title":"Bean soup"}` and the status. Recheck after changes to record projection or ownership lookup.

### SR-002

**no-issue-observed.** R1 forbids reading a different kitchen's recipe, including by supplying a kitchen ID in the request. Unauthorized access would disclose another kitchen's data. T02 in A1 observed the expected 404 and `{"error":"not found"}` for the foreign record and the absent record. The test combined both forged inputs in one request. Timing and behavior upstream of the handler remain outside this assertion. Recheck when the ownership filter or session input changes. This is a bounded example relevant to OWASP ASVS v5.0.0-8.2.2.

### SR-003

**no-issue-observed.** R1 requires 401 for an anonymous request. T03 in A1 observed `{"error":"sign-in required"}` and status 401 for r1. Recheck if the missing-session path changes.

### SR-004

**unexamined.** The handler takes the authenticated session as an argument. The open hypothesis concerns the real session-to-kitchen binding. The proposed integration check needs an actual session issuer and two test accounts with separate kitchen memberships. Observed deployment results and run references are unavailable.

### SR-005

**unexamined.** The handler constructs a cache directive. Cross-session reuse at a shared cache is a deployment hypothesis. The proposed check needs the actual cache configuration and a running test adapter. The in-memory test run supplies no observation at that boundary.

## Next checks

1. Verify SR-004 at the point where the service creates the session. Each handler result depends on that identity.
2. If the target uses a shared cache, verify SR-005 across two sessions with the same URL.

The open items are the gaps identified in this review scope.

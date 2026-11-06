# Recipe read — security review ledger

**Current attempt: A3.** Five tests passed after the response schema was clarified and two permitted-read cases were added. SR-004 and SR-005 remain unexamined. The tables below index the dated attempts in one set of scenario records; A1 and A2 remain historical evidence.

**Run A1 context (historical)** 2026-11-06 07:37 UTC. Node.js v24.22.1, Linux x64, built-in Fetch API and test runner. The unit under review is the in-process [recipe handler](read-recipe.mjs). Kitchen A's synthetic member requested both kitchens' records. [Requirement R1 at A1](https://github.com/goAuD/security-review-ledger/blob/v0.1.0/examples/recipe-access/requirement.md) was cited as defining the acceptable status and JSON body. Deployment, login, timing differences and a real HTTP cache were outside the run.

**Expectation-source correction identified in A2:** the original R1 required anonymous requests to receive 401 and foreign/absent responses to match, but did not specify 404, the literal error messages or the exact successful-response fields. Those exact A1 expectations came from the tests. A3 uses the subsequently confirmed response contract; it does not retroactively change the basis of A1 or A2.

**Reviewed snapshot** SHA-256 of the file bytes (LF line endings). These identifiers apply even when the surrounding repository or this report changes.

| File | SHA-256 |
| --- | --- |
| [requirement.md at A1](https://github.com/goAuD/security-review-ledger/blob/v0.1.0/examples/recipe-access/requirement.md) | `2987662ba6b6edb3b2cbfd4f95bd30a14fceda81ae685b97d0ce08d286089e29` |
| [read-recipe.mjs at A1](https://github.com/goAuD/security-review-ledger/blob/v0.1.0/examples/recipe-access/read-recipe.mjs) | `4a71fded565828d85a44fe33f3c639444e54421c74ee8e8be9a2dbe8d5be4ce2` |
| [read-recipe.test.mjs at A1](https://github.com/goAuD/security-review-ledger/blob/v0.1.0/examples/recipe-access/read-recipe.test.mjs) | `1db635c7b80913c21fe3e427f688d1cdee9213736d2b52ded4a50a8f491aeb32` |

**Run A1** From the repository root, `node --test --test-reporter=tap examples/recipe-access/read-recipe.test.mjs` exited with code 0. All three named cases executed. See the [A1 test assertions](https://github.com/goAuD/security-review-ledger/blob/v0.1.0/examples/recipe-access/read-recipe.test.mjs) and the unchanged [A1 TAP output](evidence/run.tap).

**Run A2** 2026-11-06 09:12:25 UTC. Windows x64, Node.js v22.23.4, clean revision `2ce1cd4b5c268c2e881171cf5abcd2cbcc4ee8a6`. The three input-file digests matched A1. The same command executed T01–T03: three passes, zero failures, zero skips, exit 0. See the [A2 TAP output](evidence/a2-20261106T091225Z.tap). Source inspection identified SR-002's missing permitted-read variants and the expectation-source gap tracked as SR-006.

**Recheck trigger after A2:** the maintainer approved an explicit response schema and separate forged-query/header checks for permitted reads. R1 and the test suite changed; the handler did not. SR-001, SR-002, SR-003 and SR-006 needed a fresh check against that clarified contract. Earlier outcomes remain valid for their original inputs and expectations.

**Run A3** 2026-11-06 09:23:35 UTC. Windows x64, Node.js v22.23.4. Base revision `2ce1cd4b5c268c2e881171cf5abcd2cbcc4ee8a6` with modified R1 and tests identified below by exact LF-byte digests. The same command executed T01–T05: five passes, zero failures, zero skips, exit 0. See the [A3 TAP output](evidence/a3-20261106T092335Z.tap). Evidence/documentation additions do not change these three reviewed inputs.

| A3 input | SHA-256 |
| --- | --- |
| [requirement.md](requirement.md) | `b8d800956dc8c558d937884da08cd26e6d0a7120f33723251acf9ca24eade433` |
| [read-recipe.mjs](read-recipe.mjs) | `4a71fded565828d85a44fe33f3c639444e54421c74ee8e8be9a2dbe8d5be4ce2` |
| [read-recipe.test.mjs](read-recipe.test.mjs) | `1b53767c82988b83f861577496d12caaf7562cf993c6b7ebab0ffb271f9ac94d` |

**Regression sensitivity check:** in an isolated temporary copy, the handler was changed to return `404` and `{"error":"not found"}` whenever either `kitchenId` appeared in the query or `X-Kitchen-ID` appeared in the headers. The original T01–T03 suite still passed 3/3. The expanded suite passed T01–T03 and failed exactly T04/T05 because each received 404 instead of the expected 200. This demonstrates that the two new tests catch that specific erroneous rejection; the repository's handler was not changed.

## Checks performed

| Scenario / attempt | Procedure and test | Actual outcome | Bounds |
| --- | --- | --- | --- |
| [SR-001](#sr-001) / A1 | T01, member A reads record r1 owned by A | 200 and the specified recipe fields | One allowed actor/record pair |
| [SR-002](#sr-002) / A1 | T02, member A requests B's r2 with forged query and header, then an absent ID | Both responses had status 404 and the same error JSON | Direct handler, status and parsed JSON only |
| [SR-003](#sr-003) / A1 | T03, null session requests A's real r1 | 401 and the specified error JSON | One anonymous request |
| [SR-001](#sr-001) / A2 | T01, repeat the original permitted read | 200 and the same exact recipe JSON | Original expectation; one actor/record pair |
| [SR-002](#sr-002) / A2 | T02 plus inspection of query/header handling | Original denial case passed; missing permitted-read variants identified | Source evidence and executed coverage are distinct |
| [SR-003](#sr-003) / A2 | T03, repeat the original anonymous request | 401 and the same error JSON | One null session |
| [SR-006](#sr-006) / A2 | Compare R1 with the test assertions and A1's source attribution | Exact response schema was absent from R1 | Source inspection; no application violation established |
| [SR-001](#sr-001) / A3 | T01 against clarified R1: expect 200 and only the stored id/title | Expected status and exact fields observed | One actor/record pair |
| [SR-002](#sr-002) / A3 | T02, T04 and T05: deny a foreign read; preserve a permitted read with each forged input separately | Foreign/absent responses matched; both permitted reads matched their 200 baseline and exact recipe JSON | Named combinations only; no timing or deployment claim |
| [SR-003](#sr-003) / A3 | T03 against clarified R1: expect 401 and the exact sign-in error | Expected status and JSON observed | One null session |
| [SR-006](#sr-006) / A3 | Inspect the approved response table and compare it with T01–T05 | Exact statuses and JSON expectations now have an explicit requirement source | Requirement traceability, not production validation |

## Known gaps and follow-up

| Scenario | Open question and origin | Why still open and why it matters | Priority and next check |
| --- | --- | --- | --- |
| [SR-004](#sr-004) | Which kitchen does a real request's session authenticate? Raised by the session parameter in the handler. | The fixture injects its own session. A forged identity upstream could invalidate the handler's decision. | High. Exercise the login and routing boundary with two synthetic accounts when there is an adapter. |
| [SR-005](#sr-005) | Can one kitchen receive another kitchen's cached response? Raised by the repeated URL and deployment boundary. | The fixture runs without a shared cache. Its response headers alone cannot establish the deployed cache behavior. | Conditional on deployment with a cache. Issue two requests to the same URL through the real test cache under different sessions. |

## Scenario records

### SR-001

**no-issue-observed.** R1 grants access to the owning kitchen. Expected a 200 response for A reading r1 and just the recipe ID and title. In A1, T01 asserted the exact body `{"id":"r1","title":"Bean soup"}` and the status. Recheck after changes to record projection or ownership lookup.

**History update:** A2 repeated that observation; the exact fields were still a test expectation pending SR-006. A3 repeated it under the clarified R1, which explicitly requires 200 and only the stored `id`/`title`. Current state remains `no-issue-observed` for this bounded claim.

### SR-002

**no-issue-observed.** R1 forbids reading a different kitchen's recipe, including by supplying a kitchen ID in the request. Unauthorized access would disclose another kitchen's data. T02 in A1 observed the expected 404 and `{"error":"not found"}` for the foreign record and the absent record. The test combined both forged inputs in one request. Timing and behavior upstream of the handler remain outside this assertion. Recheck when the ownership filter or session input changes. This is a bounded example relevant to OWASP ASVS v5.0.0-8.2.2.

**A2 update — `partial`:** T02 passed again. Inspection showed that the handler reads only `id` and the supplied session's kitchen, but runtime checks did not cover a permitted read with either forged input separately. An implementation that rejected all such requests could pass the original tests while denying legitimate reads.

**A3 update — `no-issue-observed`:** T02 still passed. T04 requested A's `r1` with query `kitchenId=kitchen-b`; T05 requested it with header `X-Kitchen-ID: kitchen-b`. Each independently observed 200 and `{"id":"r1","title":"Bean soup"}`, matching its plain-request baseline. The permitted-read coverage gap identified in A2 is closed for these named inputs. This does not establish every possible query/header combination.

### SR-003

**no-issue-observed.** R1 requires 401 for an anonymous request. T03 in A1 observed `{"error":"sign-in required"}` and status 401 for r1. Recheck if the missing-session path changes.

**History update:** T03 observed the same result in A2 and A3. The literal JSON body was a test expectation in A1/A2; the clarified R1 explicitly requires it for A3. Current state remains `no-issue-observed` for a null session requesting r1.

### SR-004

**unexamined.** The handler takes the authenticated session as an argument. The open hypothesis concerns the real session-to-kitchen binding. The proposed integration check needs an actual session issuer and two test accounts with separate kitchen memberships. Observed deployment results and run references are unavailable.

### SR-005

**unexamined.** The handler constructs a cache directive. Cross-session reuse at a shared cache is a deployment hypothesis. The proposed check needs the actual cache configuration and a running test adapter. The in-memory test run supplies no observation at that boundary.

### SR-006

**Current state — `no-issue-observed`, source inspection only.** The exact response contract should have an explicit requirement source so later reviewers can distinguish a regression from a changed expectation.

**A2 — `inconclusive`:** R1 did not specify 404, literal error messages or the exact successful-response fields. The tests specified them, and A1 had attributed too much of that expectation to R1. No application defect was established.

**A3:** following maintainer approval, R1 now specifies each status and exact JSON fields/values, and states that separately supplied query/header kitchen IDs must leave permitted reads unchanged. Source inspection matched the updated table to the test assertions; T01–T05 executed successfully. The source gap is closed for this fixture. Recheck this mapping when the requirement or response schema changes.

## Next checks

1. Verify SR-004 at the point where the service creates the session. Each handler result depends on that identity.
2. If the target uses a shared cache, verify SR-005 across two sessions with the same URL.

The open items are the gaps identified in this review scope.
